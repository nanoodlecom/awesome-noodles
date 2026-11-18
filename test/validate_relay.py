#!/usr/bin/env python3
"""Offline mock-run validation for relay-drift using nanoodle-py's test harness.
No network, no API key, no spend."""
import sys
sys.path.insert(0, "nanoodle-py/src")
sys.path.insert(0, "nanoodle-py")
from tests.harness import MockNanoGPT, chat_response, image_response
from nanoodle import Workflow

CARD = "\n".join([
    "SETTING: a small harbour cafe terrace at sunrise",
    "STYLE: photorealistic, warm sunrise light, no text",
    "ELEMENTS:",
    "1. a red fishing boat tied at the left edge",
    "2. three white seagulls on the cafe roof ridge",
    "3. a round marble table with a blue teapot in the centre",
    "4. a striped orange-and-white awning over the cafe window",
    "5. a black cat asleep on a wooden chair at the right",
    "6. a lighthouse on the headland in the far background",
])
PROMPT = ("Photorealistic harbour cafe terrace at sunrise seen from the water: "
          "a red fishing boat at the left, three white seagulls on the roof, "
          "a round marble table with a blue teapot, an orange-and-white striped "
          "awning, a black cat asleep on a chair, a lighthouse on the headland.")
def report(inv, prompt):
    return "INVENTORY:\n" + inv + "\nRECREATION PROMPT:\n" + prompt
INV1 = "1. a red fishing boat at the left edge\n2. three white seagulls on a roof\n3. a round table with a blue teapot\n4. an orange-and-white striped awning\n5. a black cat on a chair\n6. a lighthouse in the background"
RP1 = "Photorealistic harbour cafe terrace at sunrise: red fishing boat left, three seagulls on the roof, round table with blue teapot, striped awning, black cat on a chair, lighthouse behind. Photorealistic, warm sunrise light, no text."
INV2 = "1. a red boat at the left\n2. three white seagulls on a roof\n3. a round table with a blue teapot\n4. a striped awning\n5. a black cat on a chair"
RP2 = "Photorealistic harbour cafe at sunrise: red boat left, three seagulls, round table with blue teapot, striped awning, black cat on a chair. Photorealistic, warm sunrise light, no text."
INV3 = "1. a red boat at the left\n2. two white seagulls on a roof\n3. a round table with a blue teapot\n4. a striped awning\n5. a black cat on a chair"
CHECK = "\n".join([
    "HOP 1: 6 of 6",
    "HOP 2: 5 of 6",
    "HOP 3: 4 of 6",
    "LOST AT HOP 1: none",
    "LOST AT HOP 2: 6",
    "LOST AT HOP 3: 2",
    "INVENTED: none",
    "Summary: hop 1 6 of 6, hop 2 5 of 6, hop 3 4 of 6.",
])
PNG = ("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk"
       "+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==")

mock = MockNanoGPT().start()
try:
    mock.script("POST", "/api/v1/chat/completions", [
        chat_response(CARD),
        chat_response(PROMPT),
        chat_response(report(INV1, RP1)),
        chat_response(RP1),
        chat_response(report(INV2, RP2)),
        chat_response(RP2),
        chat_response(report(INV3, RP2)),
        chat_response(CHECK),
    ])
    mock.script("POST", "/v1/images/generations", [
        image_response(b64_list=[PNG]),
        image_response(b64_list=[PNG]),
        image_response(b64_list=[PNG]),
    ])
    def decision(probs):
        return {"status": 200, "json": {"answers": {"answer": {
            "type": "choice", "choice": max(probs, key=probs.get), "probabilities": probs}},
            "usage": {"input_tokens": 40, "output_tokens": 0, "cost": 0.00001}}}
    mock.script("POST", "/api/v1/decisions", [
        decision({"survived the relay": 0.05, "drifted slowly": 0.85,
                  "collapsed mid-relay": 0.05, "mutated beyond recognition": 0.05}),
    ])

    wf = Workflow.load("aw-relay/graphs/relay-drift.noodle-graph.json",
                       base_url=mock.base_url, api_key="<redacted>")
    assert not wf.warnings, wf.warnings
    result = wf.run({})
    for nid, run in result.nodes.items():
        print(f"  node {nid:10s} status={run.status} cost={run.cost_usd}")
    print("total cost (mock):", result.cost_usd, "exact:", result.cost_exact)
    assert not result.errors, result.errors

    chats = mock.requests_to("/api/v1/chat/completions")
    assert len(chats) == 8, len(chats)
    models = [r.json["model"] for r in chats]
    assert models == ["z-ai/glm-5.3-flash", "z-ai/glm-5.3-flash",
                      "google/gemini-3.8-flash", "z-ai/glm-5.3-flash",
                      "google/gemini-3.8-flash", "z-ai/glm-5.3-flash",
                      "google/gemini-3.8-flash", "z-ai/glm-5.3-flash"], models
    # stylist received seed + card split by the SCENE CARD marker
    assert "SCENE CARD" in str(chats[1].json) and "red fishing boat" in str(chats[1].json)
    # reader 1 received gen-1 picture, never the card's element list wording
    assert PNG[:40] in str(chats[2].json)
    # relay clerk 1 received reader 1's report
    assert "RECREATION PROMPT" in str(chats[3].json) and "INVENTORY" in str(chats[3].json)
    # checker received card + all three reports split by GEN markers
    cm = str(chats[7].json)
    assert "GEN 1 READER REPORT" in cm and "GEN 2 READER REPORT" in cm and "GEN 3 READER REPORT" in cm, cm[:800]
    assert "lighthouse on the headland" in cm

    gens = mock.requests_to("/v1/images/generations")
    assert len(gens) == 3, len(gens)
    for greq in gens:
        assert greq.json["model"] == "meta/muse-image/text-to-image", greq.json
    # generation 2 was painted from reader 1's recreation prompt verbatim (the clerk's output)
    assert RP1 in str(gens[1].json), str(gens[1].json)[:600]
    # generation 3 was painted from reader 2's recreation prompt verbatim
    assert RP2 in str(gens[2].json), str(gens[2].json)[:600]

    dec = mock.requests_to("/api/v1/decisions")
    assert len(dec) == 1, len(dec)
    q = dec[0].json["questions"]["answer"]
    assert q["type"] == "choice" and list(q["criteria"]) == [
        "survived the relay", "drifted slowly",
        "collapsed mid-relay", "mutated beyond recognition"], q
    print("decide verdict text:", result.nodes["audit"].out["text"])
    assert result.nodes["audit"].out["text"] == "drifted slowly"
    assert "HOP 3: 4 of 6" in result.nodes["checker"].out["text"]
    print("MOCK RUN OK: card -> gen1 -> read -> verbatim relay -> gen2 -> read -> verbatim relay -> gen3 -> per-hop drift audit + verdict, all payloads shaped as designed")
finally:
    mock.stop()

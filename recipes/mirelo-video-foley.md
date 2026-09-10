# foley the take

Committed graph: [`graphs/mirelo-video-foley.noodle-graph.json`](../graphs/mirelo-video-foley.noodle-graph.json) · [Open in nanoodle](https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWobMRCGX2UYerBBu15v3BDUY2mg1EkDdkJKKVhdjW1hrbRolbVdszma9upH9JMUyU67JYeetBr--fTv_LPDBvmQobGSauRfd6gkciwSZTwZjwz9tqJQsWV5KmyQjzKGW-R5xnCNfHSVMTSiDLK51bQFvyTwYkXIcK5Iyxr5Dj1tPHK8r7QVEgQUWlVw3B_gRjnSFibXj8P0EnqzMt4ToQb1fDNMLweNkmQTb5P4MevD2ilPNZTCF0tlFqEVrPEWlIfe85sszYaD-h08j2o4_voJoTDqp_AQ2o_7QzTJwFgPwdRxfwiA3q1aLH3ilKQIHMAHTQ2Zsfhe90EYGRs6IieksvDwGXqzjVCJ9_Wsn8Kt9fDebWsvNIO7JL4JjqJlBhNlFgw-mrkyytNU6BUD60DlDXwiqurQH00FC8EiTKeTeI7HNykyLKy2DjluSWu7xrZl58jM8G9YzVMc8j9hXZzTyjtp3Tkrnwofo-hm1aHmHSpJ9WcBztDsBI3wM_Q6TJfkKyiWVpJGjv_JFxlWzpZVWBZsGdbqB8X-l2rWtt8YamVWnY3V4ffnzpZBGbb5ZSSVdYF0QrcMve0q8leKwDYBeRHekMhzho2idXQgzONp7SthvpxGWxdCE_IsvXrbtr8BzNd7Xk8DAAA)

`inspect` is **offline and free** (no API key). `run` is bring-your-own-key: export `NANOGPT_API_KEY` (or pass `--key` / `--env-file`) and it **spends NanoGPT balance**. Quote share URLs — `#` starts a comment in most shells. `#g=` / `#j=` / `#a=` all load via `Workflow.load` and the CLI.

Full guide: [Run workflows headlessly](https://nanoodle.com/guide/run-headless).

## Inputs

| Input | Kind | Stable key | Notes |
| --- | --- | --- | --- |
| `Product clip` | video | `n1.video` | required — pass a local file with `--input n1.video=@path` |

## Inspect (offline, no key)

```bash
npx nanoodle inspect graphs/mirelo-video-foley.noodle-graph.json
npx nanoodle inspect "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWobMRCGX2UYerBBu15v3BDUY2mg1EkDdkJKKVhdjW1hrbRolbVdszma9upH9JMUyU67JYeetBr--fTv_LPDBvmQobGSauRfd6gkciwSZTwZjwz9tqJQsWV5KmyQjzKGW-R5xnCNfHSVMTSiDLK51bQFvyTwYkXIcK5Iyxr5Dj1tPHK8r7QVEgQUWlVw3B_gRjnSFibXj8P0EnqzMt4ToQb1fDNMLweNkmQTb5P4MevD2ilPNZTCF0tlFqEVrPEWlIfe85sszYaD-h08j2o4_voJoTDqp_AQ2o_7QzTJwFgPwdRxfwiA3q1aLH3ilKQIHMAHTQ2Zsfhe90EYGRs6IieksvDwGXqzjVCJ9_Wsn8Kt9fDebWsvNIO7JL4JjqJlBhNlFgw-mrkyytNU6BUD60DlDXwiqurQH00FC8EiTKeTeI7HNykyLKy2DjluSWu7xrZl58jM8G9YzVMc8j9hXZzTyjtp3Tkrnwofo-hm1aHmHSpJ9WcBztDsBI3wM_Q6TJfkKyiWVpJGjv_JFxlWzpZVWBZsGdbqB8X-l2rWtt8YamVWnY3V4ffnzpZBGbb5ZSSVdYF0QrcMve0q8leKwDYBeRHekMhzho2idXQgzONp7SthvpxGWxdCE_IsvXrbtr8BzNd7Xk8DAAA"

nanoodle-py inspect graphs/mirelo-video-foley.noodle-graph.json
nanoodle-py inspect "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWobMRCGX2UYerBBu15v3BDUY2mg1EkDdkJKKVhdjW1hrbRolbVdszma9upH9JMUyU67JYeetBr--fTv_LPDBvmQobGSauRfd6gkciwSZTwZjwz9tqJQsWV5KmyQjzKGW-R5xnCNfHSVMTSiDLK51bQFvyTwYkXIcK5Iyxr5Dj1tPHK8r7QVEgQUWlVw3B_gRjnSFibXj8P0EnqzMt4ToQb1fDNMLweNkmQTb5P4MevD2ilPNZTCF0tlFqEVrPEWlIfe85sszYaD-h08j2o4_voJoTDqp_AQ2o_7QzTJwFgPwdRxfwiA3q1aLH3ilKQIHMAHTQ2Zsfhe90EYGRs6IieksvDwGXqzjVCJ9_Wsn8Kt9fDebWsvNIO7JL4JjqJlBhNlFgw-mrkyytNU6BUD60DlDXwiqurQH00FC8EiTKeTeI7HNykyLKy2DjluSWu7xrZl58jM8G9YzVMc8j9hXZzTyjtp3Tkrnwofo-hm1aHmHSpJ9WcBztDsBI3wM_Q6TJfkKyiWVpJGjv_JFxlWzpZVWBZsGdbqB8X-l2rWtt8YamVWnY3V4ffnzpZBGbb5ZSSVdYF0QrcMve0q8leKwDYBeRHekMhzho2idXQgzONp7SthvpxGWxdCE_IsvXrbtr8BzNd7Xk8DAAA"
# or: python -m nanoodle inspect graphs/mirelo-video-foley.noodle-graph.json
```

## Run (spends balance)

```bash
export NANOGPT_API_KEY=...          # nano-gpt.com key; required for run, not inspect

npx nanoodle run "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWobMRCGX2UYerBBu15v3BDUY2mg1EkDdkJKKVhdjW1hrbRolbVdszma9upH9JMUyU67JYeetBr--fTv_LPDBvmQobGSauRfd6gkciwSZTwZjwz9tqJQsWV5KmyQjzKGW-R5xnCNfHSVMTSiDLK51bQFvyTwYkXIcK5Iyxr5Dj1tPHK8r7QVEgQUWlVw3B_gRjnSFibXj8P0EnqzMt4ToQb1fDNMLweNkmQTb5P4MevD2ilPNZTCF0tlFqEVrPEWlIfe85sszYaD-h08j2o4_voJoTDqp_AQ2o_7QzTJwFgPwdRxfwiA3q1aLH3ilKQIHMAHTQ2Zsfhe90EYGRs6IieksvDwGXqzjVCJ9_Wsn8Kt9fDebWsvNIO7JL4JjqJlBhNlFgw-mrkyytNU6BUD60DlDXwiqurQH00FC8EiTKeTeI7HNykyLKy2DjluSWu7xrZl58jM8G9YzVMc8j9hXZzTyjtp3Tkrnwofo-hm1aHmHSpJ9WcBztDsBI3wM_Q6TJfkKyiWVpJGjv_JFxlWzpZVWBZsGdbqB8X-l2rWtt8YamVWnY3V4ffnzpZBGbb5ZSSVdYF0QrcMve0q8leKwDYBeRHekMhzho2idXQgzONp7SthvpxGWxdCE_IsvXrbtr8BzNd7Xk8DAAA" --input n1.video=@clip.mp4 --out ./out
nanoodle-py run "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWobMRCGX2UYerBBu15v3BDUY2mg1EkDdkJKKVhdjW1hrbRolbVdszma9upH9JMUyU67JYeetBr--fTv_LPDBvmQobGSauRfd6gkciwSZTwZjwz9tqJQsWV5KmyQjzKGW-R5xnCNfHSVMTSiDLK51bQFvyTwYkXIcK5Iyxr5Dj1tPHK8r7QVEgQUWlVw3B_gRjnSFibXj8P0EnqzMt4ToQb1fDNMLweNkmQTb5P4MevD2ilPNZTCF0tlFqEVrPEWlIfe85sszYaD-h08j2o4_voJoTDqp_AQ2o_7QzTJwFgPwdRxfwiA3q1aLH3ilKQIHMAHTQ2Zsfhe90EYGRs6IieksvDwGXqzjVCJ9_Wsn8Kt9fDebWsvNIO7JL4JjqJlBhNlFgw-mrkyytNU6BUD60DlDXwiqurQH00FC8EiTKeTeI7HNykyLKy2DjluSWu7xrZl58jM8G9YzVMc8j9hXZzTyjtp3Tkrnwofo-hm1aHmHSpJ9WcBztDsBI3wM_Q6TJfkKyiWVpJGjv_JFxlWzpZVWBZsGdbqB8X-l2rWtt8YamVWnY3V4ffnzpZBGbb5ZSSVdYF0QrcMve0q8leKwDYBeRHekMhzho2idXQgzONp7SthvpxGWxdCE_IsvXrbtr8BzNd7Xk8DAAA" --input n1.video=@clip.mp4 --out ./out
# or: python -m nanoodle run "https://nanoodle.com/#g=H4sIAAAAAAAAA4WSwWobMRCGX2UYerBBu15v3BDUY2mg1EkDdkJKKVhdjW1hrbRolbVdszma9upH9JMUyU67JYeetBr--fTv_LPDBvmQobGSauRfd6gkciwSZTwZjwz9tqJQsWV5KmyQjzKGW-R5xnCNfHSVMTSiDLK51bQFvyTwYkXIcK5Iyxr5Dj1tPHK8r7QVEgQUWlVw3B_gRjnSFibXj8P0EnqzMt4ToQb1fDNMLweNkmQTb5P4MevD2ilPNZTCF0tlFqEVrPEWlIfe85sszYaD-h08j2o4_voJoTDqp_AQ2o_7QzTJwFgPwdRxfwiA3q1aLH3ilKQIHMAHTQ2Zsfhe90EYGRs6IieksvDwGXqzjVCJ9_Wsn8Kt9fDebWsvNIO7JL4JjqJlBhNlFgw-mrkyytNU6BUD60DlDXwiqurQH00FC8EiTKeTeI7HNykyLKy2DjluSWu7xrZl58jM8G9YzVMc8j9hXZzTyjtp3Tkrnwofo-hm1aHmHSpJ9WcBztDsBI3wM_Q6TJfkKyiWVpJGjv_JFxlWzpZVWBZsGdbqB8X-l2rWtt8YamVWnY3V4ffnzpZBGbb5ZSSVdYF0QrcMve0q8leKwDYBeRHekMhzho2idXQgzONp7SthvpxGWxdCE_IsvXrbtr8BzNd7Xk8DAAA" --input n1.video=@clip.mp4 --out ./out
```


Install names: `npm i nanoodle` (not `nanoodle-js`) · `pip install nanoodle`. Same graph, same semantics: [nanoodle-js](https://github.com/nanoodlecom/nanoodle-js) · [nanoodle-py](https://github.com/nanoodlecom/nanoodle-py) · [nanoodle-mcp](https://github.com/nanoodlecom/nanoodle-mcp) · [run-noodle-action](https://github.com/nanoodlecom/run-noodle-action).

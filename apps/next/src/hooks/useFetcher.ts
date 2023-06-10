import useSWR, { type Key } from "swr";

const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

const useFetcher = (key: Key) => useSWR(key, fetcher);

export default useFetcher;

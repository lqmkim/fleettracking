import useSWR from "swr";
import axios from "axios";

export default function useUsvs() {
  const swr = useSWR("http://localhost:8000/usvs", async function (url) {
    const usvs = (await axios.get(url)).data;
    return usvs;
  });

  const usvs: any[] | undefined = swr.data;

  return { usvs, ...swr };
}

import useSWR from "swr";
import axios from "axios";

export default function useUsvs() {
  const swr = useSWR("/api/usvs", async function (url: string) {
    const usvs = (await axios.get(url)).data;
    return usvs;
  });

  const usvs: any[] | undefined = swr.data;

  return { usvs, ...swr };
}

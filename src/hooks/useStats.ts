import useSWR from "swr";
import axios from "axios";

export default function useStats() {
  const swr = useSWR("/api/stats", async function (url: string) {
    const result = (await axios.get(url)).data;
    return result;
  });

  const stats: any | undefined = swr.data;

  return { stats, ...swr };
}

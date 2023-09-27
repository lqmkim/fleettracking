import useSWR from "swr";
import axios from "axios";

export default function useUsv(id: string) {
  const swr = useSWR("/api/usvs/" + id, async function (url: string) {
    const { usv } = (await axios.get(url)).data;
    return usv;
  });

  const usv: any | undefined = swr.data;

  return { usv, ...swr };
}

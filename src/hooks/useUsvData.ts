import useSWR from "swr";
import axios from "axios";

export default function useUsvData(id: string) {
  const swr = useSWR("/api/usvs/" + id, async function (url: string) {
    const usvData = (await axios.get(url)).data;
    return usvData;
  });

  const usvData: any[] | undefined = swr.data;

  return { usvData, ...swr };
}

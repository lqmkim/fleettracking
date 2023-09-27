import useSWR from "swr";
import axios from "axios";

export default function useMissions() {
  const swr = useSWR("/api/missions", async function (url: string) {
    const { missions } = (await axios.get(url)).data;
    return missions;
  });

  const missions: any[] | undefined = swr.data;

  return { missions, ...swr };
}

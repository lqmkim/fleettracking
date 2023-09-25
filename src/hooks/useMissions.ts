import useSWR from "swr";
import axios from "axios";

export default function useMissions() {
  const swr = useSWR(
    "http://localhost:8000/missions?_expand=usv&_expand=user",
    async function (url) {
      const missions = (await axios.get(url)).data;
      return missions;
    }
  );

  const missions: any[] | undefined = swr.data;

  return { missions, ...swr };
}

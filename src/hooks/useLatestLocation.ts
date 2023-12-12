import useSWR from "swr";
import axios from "axios";

export default function useLatestLocation() {
  const swr = useSWR("/api/usvs/gps", async function (url: string) {
    const { LatLoc } = (await axios.get(url)).data;
    return LatLoc;
  });

  const LatLoc: any[] | undefined = swr.data;

  return { LatLoc, ...swr };
}
import useSWR from "swr";
import axios from "axios";

export default function useMaintenances() {
  const swr = useSWR("/api/maintenances", async function (url: string) {
    const { maintenances } = (await axios.get(url)).data;
    return maintenances;
  });

  const maintenances: any[] | undefined = swr.data;

  return { maintenances, ...swr };
}

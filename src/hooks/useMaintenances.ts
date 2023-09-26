import useSWR from "swr";
import axios from "axios";

export default function useMaintenances() {
  const swr = useSWR(
    "http://localhost:8000/maintenances?_expand=usv&_expand=user",
    async function (url) {
      const maintenances = (await axios.get(url)).data;
      return maintenances;
    }
  );

  const maintenances: any[] | undefined = swr.data;

  return { maintenances, ...swr };
}

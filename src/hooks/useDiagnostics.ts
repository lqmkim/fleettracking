import useSWR from "swr";
import axios from "axios";

export default function useDiagnostics() {
  const swr = useSWR(
    "http://localhost:8000/diagnostics?_expand=usv&_expand=user",
    async function (url) {
      const diagnostics = (await axios.get(url)).data;
      return diagnostics;
    }
  );

  const diagnostics: any[] | undefined = swr.data;

  return { diagnostics, ...swr };
}

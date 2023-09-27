import useSWR from "swr";
import axios from "axios";

export default function useUser() {
  const swr = useSWR("/api/auth/profile", async function (url: string) {
    const { user } = (await axios.get(url)).data;
    return user;
  });

  const user: any | undefined = swr.data;

  return { user, ...swr };
}

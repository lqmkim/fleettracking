import useSWR from "swr";
import axios from "axios";

export default function useUsers() {
  const swr = useSWR("/api/users", async function (url: string) {
    const { users } = (await axios.get(url)).data;
    return users;
  });

  const users: any[] | undefined = swr.data;

  return { users, ...swr };
}

import { useQuery } from "@tanstack/react-query";
import User from "../entities/user.ts";
import APIClient from "../services/apiClient.ts";


const apiClient = new APIClient<User>("/api/users");

const useUser = (_id: string) => 
  useQuery({
    queryKey: ["user", _id],
    queryFn: () => apiClient.getOne(_id),
    staleTime: 2400,
  });

export default useUser;

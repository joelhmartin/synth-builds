import { useQuery } from "@tanstack/react-query";
import Patch from "../entities/patch.ts";
import APIClient from "../services/apiClient.ts";


const apiClient = new APIClient<Patch>("/api/patches");

const usePatch = (_id: string) => 
  useQuery({
    queryKey: ["patches", _id],
    queryFn: () => apiClient.getOne(_id),
    staleTime: 2400,
  });

export default usePatch;

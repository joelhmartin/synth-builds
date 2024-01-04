import { useQuery } from "@tanstack/react-query";
import Patch from "../entities/patch.ts";
import APIClient from "../services/apiClient.ts";
import useSynthStore from "../store.ts";


const apiClient = new APIClient<Patch>("/api/patches");

const usePatches = () => {

  const synthQuery = useSynthStore((s) => s.synthQuery)

  return useQuery({
    queryKey: ["patches", synthQuery],
    queryFn: () => apiClient.getAll({
      params: {
        genre: synthQuery.genre,
        producer: synthQuery.producer,
        ordering: synthQuery.sortOrder,
        searchText: synthQuery.searchText,
      },
    }),
    staleTime: 2400,
  });
}

export default usePatches;

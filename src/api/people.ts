import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "./index";

export const usePopularPeople = (page = 1, language = "en") =>
    useQuery({
        queryKey: ["popularPeople", page, language],
        queryFn: async () => {
            const data = (await fetchFromApi("/person/popular", { page, language })) as {
                results: Array<{
                    id: number;
                    name: string;
                    profile_path: string | null;
                }>;
            };

            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

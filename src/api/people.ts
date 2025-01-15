import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "./index";

export const usePopularPeople = (page = 1, language = "en") =>
    useQuery({
        queryKey: ["popularPeople", page, language],
        queryFn: async () => {
            const data = await fetchFromApi("/person/popular", { page }) as {
                results: Array<{
                    known_for: Array<{ original_language: string }>
                }>
            };

            const filteredResults = data.results.filter((person) => {
                return person.known_for.some((work) => work.original_language === language);
            });

            return {
                ...data,
                results: filteredResults
            };
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
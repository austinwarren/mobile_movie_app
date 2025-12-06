// hooks/useInfiniteLatestMovies.ts
import { fetchMovies } from "@/services/api";
import { useInfiniteQuery } from "@tanstack/react-query";

// Adjust this type to match what fetchMovies actually returns
type MoviesPage = {
  results: any[];     // replace any[] with your Movie[] type if you have one
  page: number;
  totalPages: number;
};

export const useInfiniteLatestMovies = () => {
  return useInfiniteQuery<MoviesPage>({
    queryKey: ["latest-movies"],

    // ✅ Required in v5: where to start
    initialPageParam: 1,

    // React Query will pass { pageParam } to this
    queryFn: ({ pageParam }) =>
      fetchMovies({
        query: "",
        page: pageParam,
      }),

    // Decide what the *next* pageParam should be
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1; // next page
      }
      return undefined; // no more pages
    },
  });
};
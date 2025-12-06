import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";


export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies = [],
    isLoading: trendingLoading,
    isError: trendingIsError,
    error: trendingError
  } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: getTrendingMovies
    });

    
  const {
    data: movies = [],
    isLoading: moviesLoading,
    isError: moviesIsError,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies", { query: "" }], // include query in key
    queryFn: () => fetchMovies({ query: "" }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });


  const isLoading = moviesLoading || trendingLoading;
  const isError = moviesIsError || trendingIsError;

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
          ) : moviesError || trendingError ? (
              <Text>Error: {moviesError?.message || trendingError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar 
                onPress={() => router.push("/search")}
                placeHolder="Search for a movie"
              />                        
              {trendingMovies && (
                <View className="mt-10">
                  <Text className="text-lg text-white 
                  font-bold mb-3">Trending Movies</Text>
                  </View>
              )}

              
              <>
                {/* // This Flatlist is fine inside ScrollView because it's horizontal layout and ScrollView is vertical.*/}
                <FlatList 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4"  />}
                  className="mb-4 mt-3" 
                  data={trendingMovies} renderItem={({
                  item, index })=>(
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                />
                
                <Text className="text-lg text-white font-bold mt-5 mb-3"> Latest Movies </Text>

                {/* // This Flatlist is not great inside ScrollView because it's vertical layout and ScrollView is vertical.
                // It's okay for now since we're not rendering that many items but this can cause performance issues.
                // ScrollView is better with less items overall also since it's easier to implement while
                // Flatlist is better for more items since it only renders a liimited number which are visible.*/}
                <FlatList
                  data={movies}
                  renderItem={({ item }) => (
                    <MovieCard
                      {... item}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingBottom: 5,
                    marginBottom: 10
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </>

            </View>
          )}
      </ScrollView>
    </View>
  ); 
}
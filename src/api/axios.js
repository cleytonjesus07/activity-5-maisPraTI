import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://api.imdbapi.dev/",
  timeout: 1000,
});

export const getAllMovies = async () => {
  try {
    const { data } = await customAxios.get("titles?types=MOVIE");
    return {
      titles: data.titles,
      nextPageToken: data.nextPageToken,
      movieTotal: data.totalCount,
    };
  } catch (error) {
    console.error(error);
  }
};
export const getMovieById = async (id) => {
  try {
    const { data } = await customAxios.get(`/titles/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

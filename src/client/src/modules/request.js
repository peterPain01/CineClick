import axios from "axios";
const base = axios.create({
    baseURL: "http://localhost:13123/",
    withCredentials: true,
});

const request = {
    baseURL: base.defaults.baseURL,
    get: async (url, success_handler, error_handler, config) => {
        return await base
            .get(url, config)
            .then((res) =>
                success_handler ? success_handler(res) : console.log(res)
            )
            .catch((err) => {
                error_handler ? error_handler(err) : console.log(err);
                if (err?.response?.status === 401) {
                    // HACK: remove cookie by set its expiration date to the past
                    document.cookie =
                        "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    window.open("/login", "_self");
                }
            });
    },
    post: base.post,
};

// Enhance
export async function getMovies(page, per_page) {
    const data = await request.get(
        `movie/list?page=${page}&per_page=${per_page}`,
        (response) => response.data || { movies: [], total_page: 1 }
    );
    return data;
}

export async function deleteMovie(id) {
    const response = await base.get(`admin/delete-movie?id=${id}`);
    return response;
}

export async function addMovie(movie) {
    const response = await base.post('admin/upload-movie', movie);
    return response;
}

export async function updateMovie(movie){ 
    
}
export default request;

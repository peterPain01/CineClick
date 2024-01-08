import axios from "axios";
const base = axios.create(
    {
        baseURL: 'http://localhost:13123/',
        withCredentials: true,
    }
);

const request = {
    baseURL: base.defaults.baseURL,
    get: async (url, success_handler, error_handler, config) => {
        return await base.get(url, config)
            .then(res => success_handler ? success_handler(res) : console.log(res))
            .catch(err => {
                error_handler ? error_handler(err) : console.log(err);
                if (err?.response?.status === 401) {
                    // HACK: remove cookie by set its expiration date to the past
                    document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    window.open("/login", "_self");
                }
            });
    },
    post: base.post,
};

export default request

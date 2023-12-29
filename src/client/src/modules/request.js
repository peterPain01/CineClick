import axios from "axios";

const request = axios.create(
    {
        baseURL: 'http://localhost:13123/',
        withCredentials: true,
    }
)

export default request

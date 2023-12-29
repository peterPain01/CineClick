import request from "./request";

export async function logout() {
    await request.get("/auth/logout")
        .then(res => console.log(res.data))
        .catch(err => alert(err?.response?.data));
}

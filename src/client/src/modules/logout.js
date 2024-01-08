import request from "./request";

export async function logout() {
    await request.get("/auth/logout");
}

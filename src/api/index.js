import axios from "axios";
import config from "../config.json";

export async function getAdminUser() {
    let response = await axios.get(`${config.baseUrl}/auth/admin`, { withCredentials: true });
    return response.data;
}

export { getCourse, createCourse } from "./courses";
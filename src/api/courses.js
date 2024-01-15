import axios from "axios";
import config from "../config.json";

export async function getCourse() {

}

export async function createCourse(body) {
    let response = await axios.post(`${config.baseUrl}/api/courses`, body, { withCredentials: true });
    return response.data;
}
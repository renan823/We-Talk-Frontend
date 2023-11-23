const url = process.env.EXPO_PUBLIC_SERVER_URL;
import axios from "axios";

const request = async (method="GET", endpoint, body) => {
    const payload = { url: `${url}${endpoint}`, method }
    if (body) {
        payload.data = body;
    }
    
    let status;
    let data;

    await axios(payload)
    .then (response => {
        data = response.data
        status = response.status
    }).catch (error => {
        data = error.response.data
        status = error.response.status
    });

    return { data, status }
}

export default request;
import axios from "axios";

export default axios.create({
    baseURL: "https://beta.lanista.se/api/external",
    headers: {
        "Content-Type": "application/json"
    }
});
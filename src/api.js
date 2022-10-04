import axios from "axios";

const baseURL = process.env.REACT_APP_EXPRESS_API_BASE_URL

const expressApi = axios.create({
    baseURL: baseURL
});

// Want to use async/await? Add the `async` keyword to your outer function/method.
export const postSubscriber = async (email) => {
    try {
        const response = await axios.post(`${baseURL}/subscribe?email=${email}`)
        return response
    } catch (error) {
        console.error(error);
    }
}

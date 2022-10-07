import axios from 'axios'

const baseURL = process.env.REACT_APP_EXPRESS_API_BASE_URL

export const postSubscriber = async (email) => {
    try {
        const response = await axios.post(`${baseURL}/subscribe?email=${email}`)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const checkIfCustomerExists = async (email) => {
    try {
        const response = await axios.post(`${baseURL}/check-customer-exists?email=${email}`)
        return response
    } catch (error) {
        console.error(error)
    }
}

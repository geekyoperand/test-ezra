import axios from "axios"

const qs = require("qs")

const http = axios.create({
    baseURL: "https://stackoverflow.com/",
    timeout: 120000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
    },
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            encode: false,
        })
    },
})

http.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
        console.log("Error: ", expectedError, error)
        return Promise.reject(error)
    }
)

export default http

import axios from 'axios'

const TOKEN = 'cdgtt42ad3i2r375gtb0cdgtt42ad3i2r375gtbg'
export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN,
    }
})
import axios from 'axios'

// connection with the api using axios to make it easier 
export default axios.create({
    baseURL: 'http://localhost:5000'
})
import axios from 'axios';

console.log(process.env.NODE_ENV);

const defaultAxios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''
})

export default defaultAxios;
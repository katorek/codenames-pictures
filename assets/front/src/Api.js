import axios from 'axios';

const a = axios.create({
    // baseURL: "/api"
    // baseURL: (process.env.NODE_ENV !== 'production') ? "http://localhost:9000" :""
});

a.interceptors.request.use(request => {
    if (request.method.toLowerCase() === "post" ) {
        console.log('POST');
        console.log(request);
        console.log(request.data);
    } else {
        // console.log("request.data");
        // console.log(request);

    }
    return request
});

a.interceptors.response.use(response => {
    // console.log('Response:');
    // console.log(response);
    return response
});

export default a;
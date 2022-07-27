import axios from "axios";
import requestProvider from "./API";
import qs from "qs";
import { useCookies } from "react-cookie";

const requestMaker = (request, access_token) => {
    const client = axios.create();
    const refresh_request = requestProvider().refreshToken()

    const refresh = () => {
        //return axios({ ...refresh_request, headers: { Authorization: `Bearer ${access_token}` } })
        return axios({
            url: "http://localhost:8000/token",
            method: "POST",
            data: qs.stringify({
                username: "admin",
                password: "SuperSecret"
            })
        })
    }

    client.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${access_token}`;
        return config;
    });

    client.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const config = error.config;

        if (error.response && error.response.status === 401 && !config._retry) {
            config._retry = true;

            try {
                let res = await refresh();

                if (res.data.access_token) {
                    access_token = res.data.access_token;
                }

                return client(config);

            } catch (err) {
                //return Promise.reject(err)
                console.log(err);
                return;
            }
        }

        //return Promise.reject(error)
        console.log(error);
        return;
    })

    return {
        make: () => {
            return client.request(request);
        }
    }
}

export default requestMaker;
import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";
import requestProvider from "./API";

const requestMaker = (request) => {
    const client = axios.create();
    let access_token = Cookies.get("access_token");
    let refresh_token = Cookies.get("refresh_token");

    const refresh = () => {
        return axios({ ...requestProvider().refreshToken(), method: "GET", headers: { Authorization: `Bearer ${refresh_token}` } })
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
                    Cookies.set("access_token", access_token);
                }

                return client(config);

            } catch (err) {
                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    })

    return {
        make: () => {
            return client.request(request);
        }
    }
}

export default requestMaker;
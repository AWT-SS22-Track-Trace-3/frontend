const endpoints = {
    getProduct: {
        path: "/product/%SERIAL_NUMBER%",
        method: "GET"
    },
    searchProducts: {
        path: "/search",
        method: "POST"
    },
    postIncident: {
        path: "/incident",
        method: "POST"
    },
    getIncidentSummary: {
        path: "/incidents/summary/%COUNTRY%",
        method: "GET"
    },
    getIncidents: {
        path: "/incidents/%COUNTRY%",
        method: "GET"
    },
    getToken: {
        path: "/token",
        method: "POST"
    },
    refreshToken: {
        path: "/refresh",
        method: "POST"
    },
    createUser: {
        path: "/signup",
        method: "POST"
    }
}

const baseUrl = "http://localhost:8000";

const requestProvider = () => {

    function formatURL(url, replacements) {
        return url.replace(/%\w+%/g, (match) => replacements[match] || match);
    }

    function getFormattedURL(replacements, path, base = baseUrl) {
        return formatURL(base + path, replacements);
    }

    const init = (endpoint, replacements = {}, query = undefined) => {
        console.log(endpoint)
        return {
            url: getFormattedURL(replacements, endpoint.path) + (query ? `?${query}` : ""),
            method: endpoint.method,
            withCredentials: true
        }
    }

    return {
        getProduct: (serial_number) => init(endpoints.getProduct, { '%SERIAL_NUMBER%': serial_number }),
        searchProducts: (body) => ({ ...init(endpoints.searchProducts), data: body }),
        postIncident: (body) => ({ ...init(endpoints.postIncident), data: body }),
        getIncidentSummary: (country, query) => ({ ...init(endpoints.getIncidentSummary, { '%COUNTRY%': country }, query) }),
        getIncidents: (country, query) => ({ ...init(endpoints.getIncidents, { '%COUNTRY%': country }, query) }),
        getToken: (body) => ({ ...init(endpoints.getToken), data: body, withCredentials: true }),
        refreshToken: () => ({ ...init(endpoints.refreshToken), withCredentials: true }),
        createUser: (body) => ({ ...init(endpoints.createUser), data: body }),
    }
}

export default requestProvider;
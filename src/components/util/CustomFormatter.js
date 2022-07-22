import { format } from "date-fns"

export const formatAddress = (address) => {
    if (!address || !address.format)
        return;

    if (address.format == "EU") {
        return (
            <span>
                {address.street + " " + address.number},
                {" " + address.zip_code + " " + address.city},
                {" " + address.country}
            </span>
        )
    } else {
        return (
            <span>
                {address.number + " " + address.street},
                {" " + address.city + " " + address.zip_code},
                {" " + address.country}
            </span>
        )
    }
}

export const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    let date = new Date(timestamp)

    return format(date, "dd.MM.yyyy, h:mm aa")
}

export const getDateFromISOString = (timestamp) => {
    if (!timestamp) return "";

    let date = new Date(timestamp)

    return format(date, "dd.MM.yyyy")
}
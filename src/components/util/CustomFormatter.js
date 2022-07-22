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
    let date = new Date(timestamp)

    console.log(date)

    return format(date, "dd.MM.yyyy, HH:mm aa")
}
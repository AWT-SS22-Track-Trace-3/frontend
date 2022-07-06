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
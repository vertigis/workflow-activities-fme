export function objectToQueryString(data?: {}): string {
    if (!data) {
        return "";
    }

    const params: string[] = [];
    Object.keys(data).forEach((k) => {
        const value = data[k];
        if (Array.isArray(value)) {
            // FME uses duplicate parameters to represent arrays
            value.forEach((v) => {
                const valueToEncode = v === undefined || v === null ? "" : v;
                params.push(
                    `${encodeURIComponent(k)}=${encodeURIComponent(
                        valueToEncode
                    )}`
                );
            });
        } else {
            const valueToEncode =
                value === undefined || value === null ? "" : value;
            params.push(
                `${encodeURIComponent(k)}=${encodeURIComponent(valueToEncode)}`
            );
        }
    });

    return params.join("&");
}

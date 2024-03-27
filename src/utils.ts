export function objectToQueryString(
    data?: Record<string, string | number | boolean>
): string {
    if (!data) {
        return "";
    }

    const params: string[] = [];
    Object.keys(data).forEach((k) => {
        const value = data[k];
        type valueType = typeof value;
        if (Array.isArray(value)) {
            // FME uses duplicate parameters to represent arrays
            for (const v of value) {
                const valueToEncode =
                    v === undefined || v === null ? "" : (v as valueType);
                params.push(
                    `${encodeURIComponent(k)}=${encodeURIComponent(
                        valueToEncode
                    )}`
                );
            }
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

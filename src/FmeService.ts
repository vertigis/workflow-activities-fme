export interface FmeService {
    /**
     * The URL to the FME Server.
     */
    url: string;
    /**
     * The token used to authenticate requests.
     */
    token: string;
}

export interface FmeRequestOptions {
    method?: string;
    /** The request body. */
    body?: BodyInit | null;
    contentType?: string;
    /** Query string parameters to append to the URL. */
    query?: string;
}

/** The root path of the FME Flow REST API V4. */
export const FME_API_PATH = "/fmeapiv4";

/**
 * Sends an authenticated request to FME Server and returns the parsed
 * response. Non-JSON responses are returned as text.
 * @param service The FME service.
 * @param path The path relative to the FME Server URL, starting with `/`.
 */
export async function fmeRequest<T = any>(
    service: FmeService,
    path: string,
    options: FmeRequestOptions = {}
): Promise<T> {
    const { body, contentType, method, query } = options;
    let url = `${service.url}${path}`;
    if (query) {
        url += `${url.includes("?") ? "&" : "?"}${query}`;
    }

    const headers: Record<string, string> = { Accept: "application/json" };
    if (service.token) {
        headers.Authorization = `fmetoken token=${service.token}`;
    }
    // Let the browser set the content type for FormData to get the boundary.
    if (
        contentType &&
        !(typeof FormData !== "undefined" && body instanceof FormData)
    ) {
        headers["Content-Type"] = contentType;
    }

    const response = await fetch(url, {
        method: method || "GET",
        headers,
        body,
    });

    const text = await response.text();
    let result: any = text;
    if (text) {
        try {
            result = JSON.parse(text);
        } catch {
            // Not a JSON response
        }
    }

    if (!response.ok) {
        const message =
            (typeof result === "object" && result?.message) ||
            (typeof result === "string" && result) ||
            response.statusText;
        throw new Error(
            `FME request failed (${response.status}): ${String(message)}`
        );
    }

    if (!text) {
        return (
            response.status === 204 ? { delete: "true" } : { value: "true" }
        ) as T;
    }
    return result as T;
}

/**
 * Sends an authenticated request to the FME Flow REST API V4.
 * @param service The FME service.
 * @param path The path relative to the API root, such as `/jobs`.
 */
export function fmeApiRequest<T = any>(
    service: FmeService,
    path: string,
    options?: FmeRequestOptions
): Promise<T> {
    return fmeRequest<T>(service, `${FME_API_PATH}${path}`, options);
}

/**
 * Converts workflow parameters to the V4 `publishedParameters` object,
 * skipping empty values.
 */
export function toPublishedParameters(parameters?: {
    [key: string]: any;
}): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    if (parameters) {
        for (const key of Object.keys(parameters)) {
            const value = parameters[key];
            if (value !== undefined && value !== null) {
                result[key] = value;
            }
        }
    }
    return result;
}

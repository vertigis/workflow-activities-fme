import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { FmeService, fmeRequest } from "../FmeService";
import { objectToQueryString } from "../utils";

/** An interface that defines the inputs of the activity. */
export interface CreateFmeServiceInputs {
    /**
     * @displayName URL
     * @description The URL to the FME server.
     * @required
     */
    url: string;
    /**
     * @description An FME server access token.
     */
    token?: string;
    /**
     * @description The username of an FME server user.
     */
    username?: string;
    /**
     * @description The password of an FME server user. Do not hard code passwords into workflows.
     */
    password?: string;
    /**
     * @description The desired expiration time of the access generated from a username and password in minutes. Defaults to 60.
     */
    expiration?: number;
}

/** An interface that defines the outputs of the activity. */
export interface CreateFmeServiceOutputs {
    /**
     * @description The FME service that can be supplied to other FME activities.
     */
    service: FmeService;
}

/**
 * @displayName Create FME Service
 * @defaultName fmeService
 * @category FME
 * @description Creates an authenticated connection to an FME server.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class CreateFmeService implements IActivityHandler {
    async execute(
        inputs: CreateFmeServiceInputs
    ): Promise<CreateFmeServiceOutputs> {
        const { expiration, password, token, url, username } = inputs;
        if (!url) {
            throw new Error("url is required");
        }

        // Remove trailing slashes
        const normalizedUrl = url.replace(/\/*$/, "");

        if (token) {
            return { service: { url: normalizedUrl, token } };
        } else if (username && password) {
            // The token endpoint is shared by all versions of the REST API.
            const response = await fmeRequest<{
                serviceResponse?: { token?: string };
            }>({ url: normalizedUrl, token: "" }, "/fmetoken/generate.json", {
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                body: objectToQueryString({
                    user: username,
                    password,
                    expiration: (expiration || 60) * 60,
                }),
            });
            const generatedToken = response?.serviceResponse?.token;
            if (!generatedToken) {
                throw new Error("Failed to generate token");
            }
            return { service: { url: normalizedUrl, token: generatedToken } };
        } else {
            throw new Error("A token or username and password are required");
        }
    }
}

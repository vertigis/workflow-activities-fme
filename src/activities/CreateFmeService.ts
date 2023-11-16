import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import FMEServer from "../FMEServer";
import { FmeService } from "../FmeService";

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
            // Initialize with the token
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            FMEServer.init(
                normalizedUrl,
                token,
                undefined!,
                undefined!,
                undefined!,
                undefined!
            );
            /* eslint-enable @typescript-eslint/no-non-null-assertion */

            return {
                service: {
                    server: FMEServer,
                    url: normalizedUrl,
                },
            };
        } else if (username && password) {
            return new Promise<CreateFmeServiceOutputs>((resolve, reject) => {
                // Initialize with a temporary token so the URL gets set
                /* eslint-disable @typescript-eslint/no-non-null-assertion */
                FMEServer.init(
                    normalizedUrl,
                    "temporary",
                    undefined!,
                    undefined!,
                    undefined!,
                    undefined!
                );
                /* eslint-enable @typescript-eslint/no-non-null-assertion */

                // Generate a token
                FMEServer.generateToken(
                    encodeURIComponent(username),
                    encodeURIComponent(password),
                    expiration || 60,
                    "minutes",
                    (token) => {
                        if (token) {
                            // Reinitialize with the generated token
                            /* eslint-disable @typescript-eslint/no-non-null-assertion */
                            FMEServer.init(
                                normalizedUrl,
                                token,
                                undefined!,
                                undefined!,
                                undefined!,
                                undefined!
                            );
                            /* eslint-enable @typescript-eslint/no-non-null-assertion */

                            return resolve({
                                service: {
                                    server: FMEServer,
                                    url: normalizedUrl,
                                },
                            });
                        } else {
                            reject("Failed to generate token");
                        }
                    }
                );
            });
        } else {
            throw new Error("A token or username and password are required");
        }
    }
}

import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { FmeService } from "../FmeService";
import { objectToQueryString } from "../utils";

/** An interface that defines the inputs of the activity. */
export interface UseFmeServiceInputs {
    /**
     * @displayName FME Service
     * @description The FME service.
     * @required
     */
    service: FmeService;

    /**
     * @description The FME service operation.
     * @required
     */
    path:
        | "healthcheck"
        | "info"
        | "notifications/publications"
        | "notifications/publishers"
        | "notifications/subscribers"
        | "notifications/subscriptions"
        | "notifications/topics"
        | "repositories"
        | "resources/connections"
        | "schedules"
        | "schedules/categories"
        | string;
    /**
     * @description The HTTP method to use to make the request. The default is GET.
     */
    method?: "GET" | "POST" | "PUSH" | "DELETE";
    /**
     * @description The content type of the request. This is required when the method is POST or PUT.
     */
    contentType?: "application/x-www-form-urlencoded" | "application/json";
    /**
     * @description The body parameters to pass to the service operation when the method is POST or PUT.
     */
    parameters?: string | Record<string, any>;
}

/** An interface that defines the outputs of the activity. */
export interface UseFmeServiceOutputs {
    /**
     * @description The result of the service operation.
     */
    result: any;
}

/**
 * @displayName Use FME Service
 * @category FME
 * @description Utility activity to generically access any FME Server REST API operation.
 * @helpUrl https://docs.safe.com/fme/html/FME_REST/apidoc/v3/#!
 * @clientOnly
 * @unsupportedApps GMV
 */
export class UseFmeService implements IActivityHandler {
    async execute(inputs: UseFmeServiceInputs): Promise<UseFmeServiceOutputs> {
        const { contentType, method, parameters, path, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!path) {
            throw new Error("path is required");
        }

        let body: string | undefined;
        if (typeof parameters === "object") {
            if (contentType === "application/json") {
                body = JSON.stringify(parameters);
            } else if (contentType === "application/x-www-form-urlencoded") {
                body = objectToQueryString(parameters);
            }
        } else {
            body = parameters;
        }

        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        return new Promise((resolve) => {
            service.server.customRequest(
                `${service.url}/fmerest/v3/${path}`,
                method || "GET",
                (result) => {
                    return resolve({
                        result,
                    });
                },
                body!,
                contentType!
            );
        });
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
    }
}

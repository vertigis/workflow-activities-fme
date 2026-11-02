import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { FmeService, fmeApiRequest } from "../FmeService";
import { objectToQueryString } from "../utils";

/** An interface that defines the inputs of the activity. */
export interface UseFmeServiceInputs {
    /* eslint-disable @typescript-eslint/no-redundant-type-constituents */

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
        | "accounts"
        | "accounts/{id}"
        | "accounts/{id}/categories"
        | "accounts/{id}/categories/{category}"
        | "accounts/{id}/categories/{category}/permissions"
        | "accounts/{id}/categories/{category}/permissions/{permission}"
        | "accounts/{id}/email"
        | "accounts/{id}/enabled"
        | "accounts/{id}/items"
        | "accounts/{id}/items/{category}/{item}"
        | "accounts/{id}/items/{category}/{item}/permissions"
        | "accounts/{id}/items/{category}/{item}/permissions/{permission}"
        | "accounts/{id}/password"
        | "accounts/{id}/passwordchangeneeded"
        | "accounts/{id}/roles"
        | "accounts/{id}/roles/{roleID}"
        | "activeperiods"
        | "activeperiods/{id}"
        | "automations"
        | "automations/{id}"
        | "automations/{id}/enabled"
        | "automations/{id}/trigger"
        | "automations/tags"
        | "automations/tags/{tagID}"
        | "broadcast/messages"
        | "broadcast/messages/{id}"
        | "cleanup/configuration"
        | "cleanup/configuration/reset"
        | "cleanup/system"
        | "cleanup/system/{type}"
        | "cleanup/tasks"
        | "cleanup/tasks/{category}/{name}"
        | "cleanup/tasks/{category}/{name}/enabled"
        | "configuration/encryption"
        | "configuration/encryption/generatekeyfile"
        | "configuration/encryption/keyfile"
        | "configuration/encryption/mode/weak"
        | "configuration/engines"
        | "configuration/multiplewebsessions"
        | "configuration/passwordexpiration"
        | "configuration/passwordexpiration/enabled"
        | "configuration/passwordpolicy"
        | "configuration/passwordpolicy/enabled"
        | "configuration/passwordreset"
        | "configuration/passwordreset/enabled"
        | "configuration/passwordreuse"
        | "configuration/passwordreuse/enabled"
        | "configuration/proxy"
        | "configuration/systememail"
        | "configuration/systememail/test"
        | "configuration/topicmonitoring"
        | "configuration/topicmonitoring/externalWebsocketHost"
        | "configuration/topicmonitoring/externalWebsocketPort"
        | "configuration/topicmonitoring/internalWebsocketUrl"
        | "connections"
        | "connections/{connection}"
        | "datavirtualization"
        | "datavirtualization/{apiID}"
        | "datavirtualization/{apiID}/asyncprocessing"
        | "datavirtualization/{apiID}/caching"
        | "datavirtualization/{apiID}/caching/purge"
        | "datavirtualization/{apiID}/endpoints"
        | "datavirtualization/{apiID}/endpoints/{endpointID}"
        | "datavirtualization/{apiID}/endpoints/{endpointID}/asyncprocessing"
        | "datavirtualization/{apiID}/endpoints/{endpointID}/caching"
        | "datavirtualization/{apiID}/endpoints/{endpointID}/caching/purge"
        | "datavirtualization/{apiID}/endpoints/{endpointID}/jobexpiry"
        | "datavirtualization/{apiID}/endpoints/{endpointID}/security"
        | "datavirtualization/{apiID}/endpoints/responsetype"
        | "datavirtualization/{apiID}/export"
        | "datavirtualization/{apiID}/jobexpiry"
        | "datavirtualization/{apiID}/schemas"
        | "datavirtualization/{apiID}/schemas/{schemaID}"
        | "datavirtualization/{apiID}/security"
        | "datavirtualization/{apiID}/tags"
        | "datavirtualization/{apiID}/tags/{tagID}"
        | "datavirtualization/{apiID}/workspaces"
        | "datavirtualization/{apiID}/workspaces/{workspace}"
        | "datavirtualization/{apiID}/workspaces/{workspace}/download"
        | "datavirtualization/{apiID}/workspaces/download"
        | "datavirtualization/import"
        | "dependencies"
        | "deploymentparameters"
        | "deploymentparameters/{name}"
        | "enginehosts"
        | "enginehosts/{name}"
        | "enginehosts/{name}/engines"
        | "enginehosts/{name}/engines/scale"
        | "enginerules"
        | "enginerules/{id}"
        | "enginerules/{id}/enabled"
        | "enginerules/properties"
        | "enginerules/properties/{name}"
        | "engines"
        | "entraid"
        | "entraid/{id}"
        | "entraid/{id}/importrole"
        | "entraid/{id}/importuser"
        | "entraid/{id}/role"
        | "entraid/{id}/role/members"
        | "entraid/{id}/roles"
        | "entraid/{id}/synchronize"
        | "entraid/{id}/user"
        | "entraid/{id}/users"
        | "healthcheck/liveness"
        | "healthcheck/readiness"
        | "jobrules"
        | "jobrules/{id}"
        | "jobrules/{id}/enabled"
        | "jobrules/order"
        | "jobs"
        | "jobs/{id}"
        | "jobs/{id}/cancel"
        | "jobs/{id}/log"
        | "jobs/{id}/log/parsed"
        | "jobs/{id}/result"
        | "ldap/{id}/importrole"
        | "ldap/{id}/importuser"
        | "ldap/{id}/role"
        | "ldap/{id}/roles"
        | "ldap/{id}/synchronize"
        | "ldap/{id}/user"
        | "ldap/{id}/users"
        | "ldap/generic"
        | "ldap/generic/{id}"
        | "ldap/windows"
        | "ldap/windows/{id}"
        | "license"
        | "license/machinekey"
        | "license/refresh"
        | "license/refresh/status"
        | "license/request"
        | "license/request/status"
        | "license/requestfile"
        | "license/status"
        | "metrics"
        | "metrics/jobcount"
        | "metrics/jobs"
        | "migrations/backup/download"
        | "migrations/backup/resource"
        | "migrations/restore/resource"
        | "migrations/restore/upload"
        | "migrations/tasks"
        | "migrations/tasks/{id}"
        | "migrations/tasks/{id}/log"
        | "migrations/tasks/{id}/log/parsed"
        | "packages"
        | "packages/{id}"
        | "permissions/items"
        | "permissions/items/{category}/{item}"
        | "permissions/items/{category}/{item}/ownerid"
        | "permissions/metadata/categories"
        | "permissions/metadata/items"
        | "projects"
        | "projects/{id}"
        | "projects/{id}/deleteall"
        | "projects/{id}/export/download"
        | "projects/{id}/export/resource"
        | "projects/{id}/icon"
        | "projects/{id}/items"
        | "projects/{id}/items/batch/add"
        | "projects/{id}/items/batch/delete"
        | "projects/{id}/items/test"
        | "projects/imports"
        | "projects/imports/{id}"
        | "projects/imports/{id}/items"
        | "projects/imports/{id}/items/test"
        | "projects/imports/{id}/project"
        | "projects/imports/{id}/regenerate"
        | "projects/imports/{id}/run"
        | "projects/imports/resource"
        | "projects/imports/upload"
        | "projects/tasks"
        | "projects/tasks/{id}"
        | "projects/tasks/{id}/log/parsed"
        | "publications"
        | "publications/{publication}"
        | "publications/{publication}/test"
        | "publications/test"
        | "queues"
        | "queues/{name}"
        | "queues/statistics/reset"
        | "remoteengines"
        | "remoteengines/{id}"
        | "remoteengines/{id}/accounts/{account}/password"
        | "remoteengines/{id}/cache"
        | "remoteengines/{id}/engines"
        | "remoteengines/{id}/generatetoken"
        | "remoteengines/{id}/test"
        | "remoteengines/accounts/{account}/password"
        | "remoteengines/cache"
        | "remoteengines/streams/{id}/engines"
        | "remoteengines/test"
        | "repositories"
        | "repositories/{repository}"
        | "repositories/{repository}/items"
        | "repositories/{repository}/items/{item}"
        | "repositories/{repository}/items/{item}/download"
        | "repositories/{repository}/items/{item}/resources"
        | "repositories/{repository}/items/{item}/resources/{resource}"
        | "repositories/{repository}/items/{item}/resources/{resource}/download"
        | "repositories/{repository}/items/downloadzip"
        | "repositories/{repository}/items/upload"
        | "resources/connections"
        | "resources/connections/{connection}"
        | "resources/connections/{connection}/copy"
        | "resources/connections/{connection}/delete"
        | "resources/connections/{connection}/directory"
        | "resources/connections/{connection}/download"
        | "resources/connections/{connection}/downloadzip"
        | "resources/connections/{connection}/info"
        | "resources/connections/{connection}/item"
        | "resources/connections/{connection}/move"
        | "resources/connections/{connection}/rename"
        | "resources/connections/{connection}/upload"
        | "resources/test/connections"
        | "resources/test/connections/{connection}"
        | "resources/types/enabled"
        | "roles"
        | "roles/{id}"
        | "roles/{id}/accounts"
        | "roles/{id}/accounts/{accountID}"
        | "roles/{id}/categories"
        | "roles/{id}/categories/{category}"
        | "roles/{id}/categories/{category}/permissions"
        | "roles/{id}/categories/{category}/permissions/{permission}"
        | "roles/{id}/items"
        | "roles/{id}/items/{category}/{item}"
        | "roles/{id}/items/{category}/{item}/permissions"
        | "roles/{id}/items/{category}/{item}/permissions/{permission}"
        | "saml"
        | "saml/{id}"
        | "saml/{id}/enabled"
        | "saml/{id}/idpcertificate"
        | "saml/{id}/idpmetadata"
        | "saml/{id}/spcertificate"
        | "saml/{id}/spkey"
        | "schedules"
        | "schedules/{id}"
        | "schedules/{id}/enabled"
        | "schedules/{id}/statistics/reset"
        | "schedules/{id}/trigger"
        | "schedules/tags"
        | "schedules/tags/{tagID}"
        | "streams"
        | "streams/{id}"
        | "streams/{id}/enabled"
        | "streams/{id}/enginerules"
        | "streams/{id}/engines"
        | "streams/assignableengines"
        | "subscriptions"
        | "subscriptions/{subscription}"
        | "subscriptions/{subscription}/test"
        | "subscriptions/test"
        | "systemevents/configurations"
        | "systemevents/configurations/{name}"
        | "systemevents/configurations/{name}/enabled"
        | "systemevents/events"
        | "tokens"
        | "tokens/{id}"
        | "tokens/{id}/categories"
        | "tokens/{id}/categories/{category}"
        | "tokens/{id}/categories/{category}/permissions"
        | "tokens/{id}/categories/{category}/permissions/{permission}"
        | "tokens/{id}/enabled"
        | "tokens/{id}/expiration"
        | "tokens/{id}/items"
        | "tokens/{id}/items/{category}/{item}"
        | "tokens/{id}/items/{category}/{item}/permissions"
        | "tokens/{id}/items/{category}/{item}/permissions/{permission}"
        | "tokens/{id}/secondstoexpiry"
        | "topics"
        | "topics/{name}"
        | "topics/{name}/message"
        | "topics/{name}/message/subscribercontent"
        | "workspaces"
        | "workspaces/{repository}/{workspace}"
        | "workspaces/{repository}/{workspace}/download"
        | "workspaces/{repository}/{workspace}/parameters"
        | "workspaces/{repository}/{workspace}/resources"
        | "workspaces/{repository}/{workspace}/resources/{resource}"
        | "workspaces/{repository}/{workspace}/resources/{resource}/download"
        | "workspaces/{repository}/{workspace}/services"
        | "workspaces/{repository}/{workspace}/services/{service}/registered"
        | "workspaces/{repository}/{workspace}/statistics/reset"
        | "workspaces/{repository}/downloadzip"
        | "workspaces/{repository}/upload"
        | string;
    /**
     * @description The HTTP method to use to make the request. The default is GET.
     */
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    /**
     * @description The content type of the request. This is required when the method is POST or PUT.
     */
    contentType?:
        | "application/x-www-form-urlencoded"
        | "application/json"
        | "multipart/form-data";
    /**
     * @description The body parameters or object to pass to the service operation when the method is POST or PUT.
     */
    parameters?: string | Record<string, any>;
    /**
     * @description Parameters used to substitute {token} values in the path. For example, use an object like { repository: "my-repo" } to replace the {repository} token in the path "repositories/{repository}/items".
     */
    pathParameters?: Record<
        string,
        string | number | boolean | null | undefined
    >;

    /* eslint-enable @typescript-eslint/no-redundant-type-constituents */
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
 * @helpUrl https://docs.safe.com/fme/html/fmeapiv4/docs/index.html
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class UseFmeService implements IActivityHandler {
    async execute(inputs: UseFmeServiceInputs): Promise<UseFmeServiceOutputs> {
        const {
            contentType,
            method,
            parameters,
            path,
            pathParameters,
            service,
        } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!path) {
            throw new Error("path is required");
        }

        const finalPath = replacePathParameters(path, pathParameters);

        let params: string | FormData | undefined;
        if (typeof parameters === "object") {
            if (contentType === "application/json") {
                params = JSON.stringify(parameters);
            } else if (contentType === "application/x-www-form-urlencoded") {
                params = objectToQueryString(parameters);
            } else if (contentType === "multipart/form-data") {
                const formData = new FormData();
                for (const name in parameters) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    formData.append(name, parameters[name]);
                }
                params = formData;
            }
        } else {
            params = parameters;
        }

        let query: string | undefined;
        if (!method || method === "GET" || method === "DELETE") {
            // Requests without a body pass their parameters in the query string.
            query =
                typeof parameters === "string"
                    ? parameters
                    : objectToQueryString(parameters);
            params = undefined;
        }

        return fmeApiRequest(service, `/${finalPath}`, {
            method: method || "GET",
            body: params,
            contentType,
            query,
        }).then((result) => ({ result }));
    }
}

function replacePathParameters(
    path: string,
    pathParameters: UseFmeServiceInputs["pathParameters"]
) {
    if (pathParameters) {
        for (const key in pathParameters) {
            const value = pathParameters[key];
            const valueToEncode =
                value === undefined || value === null ? "" : value;
            path = path.replace(`{${key}}`, encodeURIComponent(valueToEncode));
        }
    }
    return path;
}

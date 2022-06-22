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
        | "automations"
        | "automations/workflows"
        | "automations/workflows/tags"
        | "automations/workflows/tags/{tag}"
        | "automations/workflows/{id}"
        | "automations/workflows/{id}/enabled"
        | "automations/workflows/{id}/log"
        | "automations/workflows/{id}/status"
        | "automations/workflows/{id}/trigger"
        | "cleanup/configuration"
        | "cleanup/configuration/reset"
        | "cleanup/tasks"
        | "cleanup/tasks/automationLogs"
        | "cleanup/tasks/clientsessions"
        | "cleanup/tasks/details/{category}/{name}"
        | "cleanup/tasks/details/{category}/{name}/enabled"
        | "cleanup/tasks/files"
        | "cleanup/tasks/files/"
        | "cleanup/tasks/jobs"
        | "cleanup/tasks/systemEvent"
        | "cleanup/tasks/tokens"
        | "healthcheck"
        | "info"
        | "licensing/license"
        | "licensing/license/capabilities"
        | "licensing/license/status"
        | "licensing/machinekey"
        | "licensing/refresh"
        | "licensing/refresh/status"
        | "licensing/request"
        | "licensing/request/status"
        | "licensing/requestfile"
        | "licensing/systemcode"
        | "metrics"
        | "migration/backup/download"
        | "migration/backup/resource"
        | "migration/restore/resource"
        | "migration/restore/upload"
        | "migration/tasks"
        | "migration/tasks/id/{id}"
        | "migration/tasks/id/{id}/log"
        | "notifications/publications"
        | "notifications/publications/{publication}"
        | "notifications/publications/{publication}/failuretopics"
        | "notifications/publications/{publication}/failuretopics/{topic}"
        | "notifications/publications/{publication}/properties"
        | "notifications/publications/{publication}/properties/{property}"
        | "notifications/publications/{publication}/successtopics"
        | "notifications/publications/{publication}/successtopics/{topic}"
        | "notifications/publications/{publication}/topics"
        | "notifications/publications/{publication}/topics/{topic}"
        | "notifications/publishers"
        | "notifications/publishers/{publisher}"
        | "notifications/subscribers"
        | "notifications/subscribers/{subscribers}"
        | "notifications/subscriptions"
        | "notifications/subscriptions/{subscription}"
        | "notifications/subscriptions/{subscription}/failuretopics"
        | "notifications/subscriptions/{subscription}/failuretopics/{topic}"
        | "notifications/subscriptions/{subscription}/properties"
        | "notifications/subscriptions/{subscription}/properties/{property}"
        | "notifications/subscriptions/{subscription}/successtopics"
        | "notifications/subscriptions/{subscription}/successtopics/{topic}"
        | "notifications/subscriptions/{subscription}/topics"
        | "notifications/subscriptions/{subscription}/topics/{topic}"
        | "notifications/test/publications"
        | "notifications/test/publications/{publication}"
        | "notifications/test/subscriptions"
        | "notifications/test/subscriptions/{subscription}"
        | "notifications/topics"
        | "notifications/topics/{topic}"
        | "notifications/topics/{topic}/message"
        | "notifications/topics/{topic}/message/subscribercontent"
        | "projects/import/resource"
        | "projects/import/upload"
        | "projects/itemtypes"
        | "projects/projects"
        | "projects/projects/{project}"
        | "projects/projects/{project}/deleteall"
        | "projects/projects/{project}/export/download"
        | "projects/projects/{project}/export/resource"
        | "projects/projects/{project}/icon"
        | "projects/projects/{project}/items"
        | "projects/projects/{project}/items/resourcepaths/{resource}/{path}"
        | "projects/projects/{project}/items/{type}/{item}"
        | "projects/projects/{project}/items/{type}/{scope}/{item}"
        | "projects/test/projects"
        | "repositories"
        | "repositories/{repository}"
        | "repositories/{repository}/items"
        | "repositories/{repository}/items/{item}"
        | "repositories/{repository}/items/{item}/datasets/{dtype}"
        | "repositories/{repository}/items/{item}/datasets/{dtype}/{dataset}"
        | "repositories/{repository}/items/{item}/datasets/{dtype}/{dataset}/featuretypes"
        | "repositories/{repository}/items/{item}/datasets/{dtype}/{dataset}/featuretypes/{feature}"
        | "repositories/{repository}/items/{item}/datasets/{dtype}/{dataset}/featuretypes/{feature}/attributes"
        | "repositories/{repository}/items/{item}/datasets/{dtype}/{dataset}/featuretypes/{feature}/attributes/{attribute}"
        | "repositories/{repository}/items/{item}/detailedservices"
        | "repositories/{repository}/items/{item}/metrics"
        | "repositories/{repository}/items/{item}/parameters"
        | "repositories/{repository}/items/{item}/parameters/{pubparam}"
        | "repositories/{repository}/items/{item}/resources"
        | "repositories/{repository}/items/{item}/resources/{resource}"
        | "repositories/{repository}/items/{item}/services"
        | "repositories/{repository}/items/{item}/services/{service}"
        | "resources/connections"
        | "resources/connections/{resource}"
        | "resources/connections/{resource}/copy/{path}"
        | "resources/connections/{resource}/directdownloadurl/{path}"
        | "resources/connections/{resource}/downloadzip/{directory}"
        | "resources/connections/{resource}/download/{path}"
        | "resources/connections/{resource}/filesys/{path}"
        | "resources/connections/{resource}/move/{path}"
        | "resources/connections/{resource}/directdownloadurlparameters"
        | "resources/connections/{resource}/directuploadurlparameters"
        | "resources/test/connections"
        | "resources/test/connections/{resource}"
        | "resources/types"
        | "schedules"
        | "schedules/categories"
        | "schedules/{category}"
        | "schedules/{category}/{name}"
        | "schedules/{category}/{name}/metrics"
        | "schedules/{category}/{name}/trigger"
        | "security/accounts"
        | "security/accounts"
        | "security/accounts/{account}"
        | "security/accounts/{account}/email"
        | "security/accounts/{account}/enabled"
        | "security/accounts/{account}/ldap"
        | "security/accounts/{account}/password"
        | "security/accounts/{account}/password"
        | "security/accounts/{account}/roles"
        | "security/accounts/{account}/roles/{role}"
        | "security/categories"
        | "security/categories/{category}"
        | "security/categories/{category}/resources"
        | "security/categories/{category}/resources/{resource}"
        | "security/categories/{category}/resources/{resource}/roles"
        | "security/categories/{category}/resources/{resource}/roles/{role}"
        | "security/categories/{category}/resources/{resource}/roles/{role}/permissions/{permission}"
        | "security/categories/{category}/roles"
        | "security/categories/{category}/roles/{role}"
        | "security/categories/{category}/roles/{role}/permissions/{permission}"
        | "security/ldap/servers"
        | "security/ldap/servers/{server}"
        | "security/ldap/servers/{server}/importrole"
        | "security/ldap/servers/{server}/importuser"
        | "security/ldap/servers/{server}/role"
        | "security/ldap/servers/{server}/roles"
        | "security/ldap/servers/{server}/synchronize"
        | "security/ldap/servers/{server}/user"
        | "security/ldap/servers/{server}/users"
        | "security/roles"
        | "security/roles/{role}"
        | "security/roles/{role}/accounts"
        | "security/roles/{role}/accounts/{account}"
        | "security/roles/{role}/ldap"
        | "systemevents/configurations"
        | "systemevents/configurations/{configuration}"
        | "systemevents/configurations/{configuration}/enabled"
        | "systemevents/events/completed"
        | "systemevents/schema/events"
        | "systemevents/schema/events/{configuration}"
        | "systemevents/schema/parameters"
        | "systemevents/schema/parameters/{configuration}"
        | "tokens"
        | "tokens/{user}/{name}"
        | "tokens/{user}/{name}/categories"
        | "tokens/{user}/{name}/categories/{category}"
        | "tokens/{user}/{name}/enabled"
        | "tokens/{user}/{name}/resources"
        | "tokens/{user}/{name}/resources/{category}/{resource}"
        | "transformations/engines"
        | "transformations/jobroutes/defaulttag"
        | "transformations/jobroutes/tags"
        | "transformations/jobroutes/tags/{tag}"
        | "transformations/jobroutes/tags/{tag}/engines"
        | "transformations/jobroutes/tags/{tag}/engines/{engine}"
        | "transformations/jobroutes/tags/{tag}/repositories"
        | "transformations/jobroutes/tags/{tag}/repositories/{repository}"
        | "transformations/jobs/active"
        | "transformations/jobs/active/{jobid}"
        | "transformations/jobs/completed"
        | "transformations/jobs/completed/{jobid}"
        | "transformations/jobs/id/{jobid}"
        | "transformations/jobs/id/{jobid}/log"
        | "transformations/jobs/id/{jobid}/request"
        | "transformations/jobs/id/{jobid}/result"
        | "transformations/jobs/queued"
        | "transformations/jobs/queued/{jobid}"
        | "transformations/jobs/running"
        | "transformations/jobs/running/{jobid}"
        | "transformations/submit/{repository}/{workspace}"
        | "transformations/transact/{repository}/{workspace}"
        | "transformations/transactdata/{repository}/{workspace}"
        | "user/favorites/workspace"
        | "user/favorites/workspace/{repository}/{workspace}"
        | "user/recent/automations"
        | "user/recent/projects"
        | "user/recent/workspaces"
        | "user/security/categories"
        | "user/security/resources"
        | string;
    /**
     * @description The HTTP method to use to make the request. The default is GET.
     */
    method?: "GET" | "POST" | "PUT" | "DELETE";
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
     * @description Parameters used to substitute {token} values in the path.
     */
    pathParameters?: Record<
        string,
        string | number | boolean | null | undefined
    >;
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
                    formData.append(name, parameters[name]);
                }
                params = formData;
            }
        } else {
            params = parameters;
        }

        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        return new Promise((resolve) => {
            service.server.customRequest(
                `${service.url}/fmerest/v3/${finalPath}`,
                method || "GET",
                (result) => {
                    return resolve({
                        result,
                    });
                },
                params as any, // FormData is accepted and used internally by the API.
                contentType!
            );
        });
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
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

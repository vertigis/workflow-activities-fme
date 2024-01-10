import type { IActivityHandler } from "@vertigis/workflow";
import { FmeService } from "../FmeService";
import { objectToQueryString } from "../utils";

/** An interface that defines the inputs of the activity. */
export interface RunFmeDataDownloadInputs {
    /**
     * @displayName FME Service
     * @description The FME service.
     * @required
     */
    service: FmeService;

    /**
     * @description The name of the repository containing the workspace.
     * @required
     */
    repository: string;

    /**
     * @description The name of the workspace. For example, `workspace.fmw`.
     * @required
     */
    workspace: string;

    /**
     * @description The input parameters for the job.
     */
    parameters: {
        [key: string]: any;
    };
}

/** An interface that defines the outputs of the activity. */
export interface RunFmeDataDownloadOutputs {
    /**
     * @description The result of the data download.
     */
    result: {
        serviceResponse: {
            jobID: number;
            statusInfo: {
                mode: string;
                status: string;
            };
            url: string;
        };
    };
}

/**
 * @displayName Run FME Data Download
 * @category FME
 * @description Runs an FME data download job.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class RunFmeDataDownload implements IActivityHandler {
    async execute(
        inputs: RunFmeDataDownloadInputs
    ): Promise<RunFmeDataDownloadOutputs> {
        const { repository, parameters, service, workspace } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!repository) {
            throw new Error("repository is required");
        }
        if (!workspace) {
            throw new Error("workspace is required");
        }

        return new Promise((resolve) => {
            service.server.runDataDownload(
                repository,
                workspace,
                objectToQueryString(parameters),
                (result) => {
                    return resolve({
                        result,
                    });
                }
            );
        });
    }
}

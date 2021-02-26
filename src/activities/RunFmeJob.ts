import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { FmeService } from "../FmeService";

/** An interface that defines the inputs of the activity. */
export interface RunFmeJobInputs {
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
     * @description The name of the workspace to run. For example, `workspace.fmw`.
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
export interface RunFmeJobOutputs {
    /**
     * @description The result of the job.
     */
    result: {
        id: number;
        numFeaturesOutput?: number;
        priority?: number;
        requesterHost?: string;
        requesterResultPort?: number;
        status?: string;
        statusMessage?: string;
        timeFinished?: string;
        timeRequested?: string;
        timeStarted?: string;
    };
}

/**
 * @displayName Run FME Job
 * @category FME
 * @description Runs an FME job synchronously.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class RunFmeJob implements IActivityHandler {
    async execute(inputs: RunFmeJobInputs): Promise<RunFmeJobOutputs> {
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

        // Add parameters to the request
        const publishedParameters: { name: string; value: any }[] = [];

        for (const key of Object.keys(parameters)) {
            const value = parameters[key];
            if (value) {
                publishedParameters.push({
                    name: key,
                    value: value,
                });
            }
        }

        return new Promise((resolve) => {
            service.server.submitSyncJob(
                repository,
                workspace,
                { publishedParameters } as any,
                (result) => {
                    return resolve({
                        result,
                    });
                }
            );
        });
    }
}

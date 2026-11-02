import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { FmeService, fmeApiRequest, toPublishedParameters } from "../FmeService";

/** An interface that defines the inputs of the activity. */
export interface RunFmeJobAsyncInputs {
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
export interface RunFmeJobAsyncOutputs {
    /**
     * @description The result of the job submission.
     */
    result: {
        id: number;
    };
}

/**
 * @displayName Run FME Job Async
 * @category FME
 * @description Runs an FME job asynchronously.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class RunFmeJobAsync implements IActivityHandler {
    async execute(
        inputs: RunFmeJobAsyncInputs
    ): Promise<RunFmeJobAsyncOutputs> {
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

        const result = await fmeApiRequest<RunFmeJobAsyncOutputs["result"]>(
            service,
            "/jobs",
            {
                method: "POST",
                contentType: "application/json",
                body: JSON.stringify({
                    repository,
                    workspace,
                    publishedParameters: toPublishedParameters(parameters),
                }),
            }
        );
        return { result };
    }
}

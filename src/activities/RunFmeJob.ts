import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { FmeService, fmeApiRequest, toPublishedParameters } from "../FmeService";

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
        featureOutputCount?: number;
        requesterHost?: string;
        requesterResultPort?: number;
        status?: string;
        statusMessage?: string;
        timeFinished?: string;
        timeQueued?: string;
        timeStarted?: string;
    };
}

/**
 * @displayName Run FME Job
 * @category FME
 * @description Runs an FME job synchronously.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
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

        const { id } = await fmeApiRequest<{ id: number }>(service, "/jobs", {
            method: "POST",
            contentType: "application/json",
            body: JSON.stringify({
                repository,
                workspace,
                publishedParameters: toPublishedParameters(parameters),
            }),
        });

        // Long poll until the job finishes. The server returns early (with
        // only the job ID, or an unfinished status) when the poll times out.
        for (;;) {
            const result = await fmeApiRequest<RunFmeJobOutputs["result"]>(
                service,
                `/jobs/${encodeURIComponent(id)}/result`,
                { query: "longPoll=true" }
            );
            if (
                result.status &&
                !["queued", "running"].includes(result.status)
            ) {
                return { result };
            }
        }
    }
}

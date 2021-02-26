import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { FmeService } from "../FmeService";

/** An interface that defines the inputs of the activity. */
export interface CheckFmeJobStatusInputs {
    /**
     * @displayName FME Service
     * @description The FME service.
     * @required
     */
    service: FmeService;

    /**
     * @description The ID of the FME job to check the status of.
     * @required
     */
    jobId: number;
}

/** An interface that defines the outputs of the activity. */
export interface CheckFmeJobStatusOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        description?: string;
        engineHost?: string;
        engineName?: string;
        id: number;
        repository?: string;
        request?: {
            NMDirectives?: {
                directives: [];
                successTopics: [];
                failureTopics: [];
            };
            publishedParameters?: {
                name: string;
                value: any;
            }[];
            TMDirectives?: {
                rtc?: boolean;
                ttc?: number;
                description?: string;
                tag?: string;
                priority?: number;
                ttl?: number;
            };
            workspacePath?: string;
        };
        result?: {
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
        status?: string;
        timeDelivered?: string;
        timeFinished?: string;
        timeQueued?: string;
        timeStarted?: string;
        timeSubmitted?: string;
        userName?: string;
        workspace?: string;
    };
}

/**
 * @displayName Check FME Job Status
 * @category FME
 * @description Checks the status of an FME job.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class CheckFmeJobStatus implements IActivityHandler {
    async execute(
        inputs: CheckFmeJobStatusInputs
    ): Promise<CheckFmeJobStatusOutputs> {
        const { jobId, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (jobId === undefined || jobId === null) {
            throw new Error("jobId is required");
        }

        return new Promise((resolve) => {
            service.server.customRequest(
                `${service.url}/fmerest/v3/transformations/jobs/id/${jobId}`,
                "GET",
                (result) => {
                    return resolve({
                        result,
                    });
                },
                "",
                null! // eslint-disable-line @typescript-eslint/no-non-null-assertion
            );
        });
    }
}

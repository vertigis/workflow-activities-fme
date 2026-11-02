import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { FmeService, fmeApiRequest } from "../FmeService";

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
        id: number;
        engineHost?: string;
        engineName?: string;
        repository?: string;
        workspace?: string;
        directives?: { [key: string]: string };
        failureTopics?: string[];
        successTopics?: string[];
        maxJobRuntime?: number;
        maxTimeInQueue?: number;
        queue?: string;
        queueType?: string;
        publishedParameters?: { [key: string]: any };
        deploymentParameters?: { [key: string]: string };
        featureOutputCount?: number;
        requesterHost?: string;
        requesterResultPort?: number;
        resultDatasetDownloadUrl?: string;
        status?: string;
        statusMessage?: string;
        sourceID?: string;
        sourceName?: string;
        sourceType?: string;
        timeFinished?: string;
        timeQueued?: string;
        timeStarted?: string;
        runtimeUsername?: string;
        runtimeUserID?: string;
        elapsedTime?: number;
        cpuTime?: number;
        cpuPercent?: number;
        peakMemoryUsage?: number;
        lineCount?: number;
        warningCount?: number;
        errorCount?: number;
    };
}

/**
 * @displayName Check FME Job Status
 * @category FME
 * @description Checks the status of an FME job.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
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

        const result = await fmeApiRequest<CheckFmeJobStatusOutputs["result"]>(
            service,
            `/jobs/${encodeURIComponent(jobId)}`
        );
        return { result };
    }
}

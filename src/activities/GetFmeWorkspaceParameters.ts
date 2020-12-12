import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { FmeService } from "../FmeService";

/** An interface that defines the inputs of the activity. */
export interface GetFmeWorkspaceParametersInputs {
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
}

/** An interface that defines the outputs of the activity. */
export interface GetFmeWorkspaceParametersOutputs {
    /**
     * @description The workspace parameters.
     */
    result: {
        defaultValue: any;
        description: string;
        listOptions?: {
            caption: string;
            value: string;
        }[];
        model: string;
        name: string;
        optional: boolean;
        type: string;
    }[];
}

/**
 * @displayName Get FME Workspace Parameters
 * @category FME
 * @description Gets all published parameters for a given FME workspace.
 */
export class GetFmeWorkspaceParameters implements IActivityHandler {
    async execute(
        inputs: GetFmeWorkspaceParametersInputs
    ): Promise<GetFmeWorkspaceParametersOutputs> {
        const { repository, service, workspace } = inputs;
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
            service.server.getWorkspaceParameters(
                repository,
                workspace,
                (result) => {
                    return resolve({
                        result,
                    });
                }
            );
        });
    }
}

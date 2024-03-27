import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { FmeService } from "../FmeService";

export interface GetFmeInfoInputs {
    /**
     * @displayName FME Service
     * @description The FME service.
     * @required
     */
    service: FmeService;
}

export interface GetFmeInfoOutputs {
    /**
     * @description The FME server information.
     */
    result: {
        build?: string;
        currentTime?: string;
        licenseManagement?: boolean;
        timeZone?: string;
        version?: string;
    };
}

/**
 * @displayName Get FME Info
 * @category FME
 * @description Retrieves build, version and time information about the FME server.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class GetFmeInfo implements IActivityHandler {
    async execute(inputs: GetFmeInfoInputs): Promise<GetFmeInfoOutputs> {
        const { service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }

        return new Promise((resolve) => {
            service.server.customRequest(
                `${service.url}/fmerest/v3/info`,
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

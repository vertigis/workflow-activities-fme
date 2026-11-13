import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { FmeService, fmeRequest } from "../FmeService";

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

        // REST API V4 has no equivalent of the V3 `info` endpoint.
        const result = await fmeRequest<GetFmeInfoOutputs["result"]>(
            service,
            "/fmerest/v3/info"
        );
        return { result };
    }
}

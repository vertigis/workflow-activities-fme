import type FMEServer from "./FMEServer";

export interface FmeService {
    /**
     * The URL to the FMS Server.
     */
    url: string;
    /**
     * The FME Server object.
     */
    server: typeof FMEServer;
}

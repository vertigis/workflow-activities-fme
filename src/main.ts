import * as index from "./index";

let mainResult: Promise<any> | undefined;

export async function main(): Promise<any> {
    if (mainResult) {
        return mainResult;
    }

    // If you need to do activity pack initialization logic
    // that can happen here.

    mainResult = Promise.resolve(index);
    return mainResult;
}

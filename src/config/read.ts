/**
 * @author WMXPY
 * @namespace Config
 * @description Read
 */

import { recursiveRead } from "@sudoo/io";
import { KunnConfig } from "../declare/kunn";
import { ERROR_CODE, panic } from "../panic/panic";
import { validateKunnConfig } from "./validate";

export const readConfig = async (path: string): Promise<KunnConfig> => {

    const parsed: KunnConfig = await recursiveRead(path);

    if (!validateKunnConfig(parsed)) {
        throw panic.code(ERROR_CODE.CONFIG_NOT_VALID);
    }

    return parsed;
};

/**
 * @author WMXPY
 * @namespace Kunn
 * @description Kunn
 */

import { readConfig } from "./config/read";
import { KunnConfig } from "./declare/kunn";

export class Kunn {

    public static async fromPath(path: string): Promise<Kunn> {

        const config: KunnConfig = await readConfig(path);
        return new Kunn(config);
    }

    private readonly _config: KunnConfig;

    private constructor(config: KunnConfig) {

        this._config = config;
    }

    public get config(): KunnConfig {
        return this._config;
    }
}

/**
 * @author WMXPY
 * @namespace Core
 * @description Kunn
 */

import { readConfig } from "./config/read";
import { PROTOCOL } from "./declare/declare";
import { KunnConfig } from "./declare/kunn";
import { KunnRoute } from "./declare/route";
import { match } from "./routes/match";

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

    public match<P extends PROTOCOL>(path: string, protocol: P): KunnRoute<P> {

        return match<P>(this._config, path, protocol);
    }
}

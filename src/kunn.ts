/**
 * @author WMXPY
 * @namespace Core
 * @description Kunn
 */

import { PROTOCOL } from "./declare/declare";
import { KunnConfig } from "./declare/kunn";
import { Agent } from "./routes/agent";

export class Kunn {

    public static async fromConfig(config: KunnConfig): Promise<Kunn> {

        return new Kunn(config);
    }

    private readonly _config: KunnConfig;

    private constructor(config: KunnConfig) {

        this._config = config;
    }

    public get config(): KunnConfig {

        return this._config;
    }

    public match<P extends PROTOCOL>(path: string, protocol: P): Agent<P> | null {

        for (const route of this._config.routes) {
            if (route.path === path && route.protocol === protocol) {
                return Agent.create<P>(route);
            }
        }
        return null;
    }
}

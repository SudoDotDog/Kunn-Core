/**
 * @author WMXPY
 * @namespace Core
 * @description Kunn
 */

import { validateKunnConfig } from "./config/validate";
import { PROTOCOL } from "./declare/declare";
import { KunnConfig } from "./declare/kunn";
import { KunnRoute } from "./declare/route";
import { Agent } from "./routes/agent";

export class Kunn {

    public static fromAny(config: KunnConfig): Kunn {

        return new Kunn(config);
    }

    public static fromConfig(config: KunnConfig): Kunn | null {

        const kunn: Kunn = new Kunn(config);
        if (kunn.validate()) {
            return kunn;
        }
        return null;
    }

    private readonly _config: KunnConfig;

    private constructor(config: KunnConfig) {

        this._config = config;
    }

    public get config(): KunnConfig {

        return this._config;
    }

    public validate(): boolean {

        return validateKunnConfig(this._config);
    }

    public routes(): KunnRoute[] {

        return this._config.routes;
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

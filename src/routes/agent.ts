/**
 * @author WMXPY
 * @namespace Routes
 * @description Agent
 */

import { PROTOCOL } from "../declare/declare";
import { KunnConfig } from "../declare/kunn";
import { KunnRoute } from "../declare/route";
import { KunnValidatableRequest } from "../request/declare";
import { validateRequest } from "../request/request";
import { generateResponse } from "../response/response";

export class Agent<P extends PROTOCOL> {

    public static match<P extends PROTOCOL>(config: KunnConfig, path: string, protocol: P): Agent<P> | null {

        for (const route of config.routes) {

            if (route.path === path && route.protocol === protocol) {

                return new Agent<P>(route);
            }
        }
        return null;
    }

    private readonly _route: KunnRoute<P>;

    private constructor(route: KunnRoute<P>) {

        this._route = route;
    }

    public request(request: KunnValidatableRequest<P>) {

        return validateRequest(this._route, request);
    }

    public response(seed?: any) {

        return generateResponse(this._route, seed);
    }
}

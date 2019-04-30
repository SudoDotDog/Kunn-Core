/**
 * @author WMXPY
 * @namespace Routes
 * @description Agent
 */

import { PROTOCOL } from "../declare/declare";
import { KunnRoute } from "../declare/route";
import { KunnValidatableRequest } from "../request/declare";
import { validateRequest } from "../request/request";
import { generateResponse } from "../response/response";

export class Agent<P extends PROTOCOL> {

    public static create<P extends PROTOCOL = any>(route: KunnRoute<P>): Agent<P> {

        return new Agent<P>(route);
    }

    private readonly _route: KunnRoute<P>;

    private constructor(route: KunnRoute<P>) {

        this._route = route;
    }

    public get route(): KunnRoute<P> {

        return this._route;
    }

    public request(request: KunnValidatableRequest<P>): boolean {

        return validateRequest(this._route, request);
    }

    public response(seed?: any): Record<string, any> {

        return generateResponse(this._route, seed);
    }
}

/**
 * @author WMXPY
 * @namespace Routes
 * @description Agent
 */

import { PROGRAMMING_LANGUAGE, PROTOCOL } from "../declare/declare";
import { KunnConfig } from "../declare/kunn";
import { KunnRoute } from "../declare/route";
import { generateGoLangGesture } from "../gesture/go";
import { generateTypeScriptGesture } from "../gesture/typescript";
import { ERROR_CODE, panic } from "../panic/panic";
import { KunnValidatableRequest } from "../request/declare";
import { validateRequest } from "../request/request";
import { generateResponse } from "../response/response";

export class Agent<P extends PROTOCOL = any> {

    public static create<P extends PROTOCOL = any>(route: KunnRoute<P>): Agent<P> {

        return new Agent<P>(route);
    }

    private readonly _route: KunnRoute<P>;

    private constructor(route: KunnRoute<P>) {

        this._route = route;
    }

    public request(request: KunnValidatableRequest<P>): boolean {

        return validateRequest(this._route, request);
    }

    public response(seed?: any): Record<string, any> {

        return generateResponse(this._route, seed);
    }

    public generate(language: PROGRAMMING_LANGUAGE): string {

        switch (language) {

            case PROGRAMMING_LANGUAGE.GOLANG: return generateGoLangGesture(this._route);
            case PROGRAMMING_LANGUAGE.TYPESCRIPT: return generateTypeScriptGesture(this._route);
        }

        throw panic.code(ERROR_CODE.SPECIFIED_LANGUAGE_NOT_FOUND, language);
    }
}

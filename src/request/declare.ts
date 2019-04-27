/**
 * @author WMXPY
 * @namespace Request
 * @description Declare
 */

import { PROTOCOL } from "../declare/declare";

export type KunnValidatableQueryRequest = {

    readonly query: Record<string, any>;
};

export type KunnValidatableBodyRequest = {

    readonly body: Record<string, any>;
    readonly query: Record<string, any>;
};

export type KunnValidatableRequest<P extends PROTOCOL> =
    P extends PROTOCOL.GET ? KunnValidatableQueryRequest :
    P extends PROTOCOL.OPTION ? KunnValidatableQueryRequest :
    KunnValidatableBodyRequest;

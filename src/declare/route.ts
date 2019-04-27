/**
 * @author WMXPY
 * @namespace Declare
 * @description Route
 */

import { PROTOCOL } from "./declare";
import { KunnData } from "./exchange";

export type KunnCommonRequest = {

    readonly response: Record<string, KunnData>;
};

export type KunnGetRequest = {

    readonly query: Record<string, KunnData>;
} & KunnCommonRequest;

export type KunnBodyRequest = {

    readonly body: Record<string, KunnData>;
} & KunnCommonRequest;

export type KunnRequest<P extends PROTOCOL> =
    P extends PROTOCOL.GET ? KunnGetRequest
    : KunnBodyRequest;

export type KunnRoute<P extends PROTOCOL = any> = {

    readonly path: string;
    readonly protocol: P;
    readonly request: KunnRequest<P>;
};

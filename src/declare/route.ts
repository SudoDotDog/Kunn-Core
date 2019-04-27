/**
 * @author WMXPY
 * @namespace Declare
 * @description Route
 */

import { PROTOCOL } from "./declare";
import { KunnIncomingData, KunnOncomingData } from "./exchange";

export type KunnCommonRequest = {

    readonly response: Record<string, KunnOncomingData>;
};

export type KunnGetRequest = {

    readonly query: Record<string, KunnIncomingData>;
} & KunnCommonRequest;

export type KunnPostRequest = {

    readonly body: Record<string, KunnIncomingData>;
} & KunnCommonRequest;

export type KunnRoute = {

    readonly path: string;
    readonly protocol: PROTOCOL.GET;
    readonly request: KunnGetRequest;
} | {

    readonly path: string;
    readonly protocol: PROTOCOL.POST;
    readonly request: KunnPostRequest;
};

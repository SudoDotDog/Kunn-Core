/**
 * @author WMXPY
 * @namespace Gesture
 * @description Util
 */

import { PROTOCOL } from "../declare/declare";
import { KunnRoute } from "../declare/route";
import { Line } from "./declare";

export const createSimple = (text: string, nest: number): Line => ({
    text,
    nest,
});

export const parseProtocolToString = (protocol: PROTOCOL) => {

    return `${protocol[0].toUpperCase()}${protocol.toLowerCase().substring(1)}`;
};

export const generateNamespace = (route: KunnRoute) => {

    const parsedPath: string[] = route.path
        .split('/')
        .filter(Boolean)
        .map((value: string) => value.replace(/ /g, ''));

    return `${parseProtocolToString(route.protocol)}_${parsedPath.join('_')}`;
};

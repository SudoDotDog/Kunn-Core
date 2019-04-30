/**
 * @author WMXPY
 * @namespace Gesture
 * @description Util
 */

import { PROTOCOL } from "../declare/declare";
import { KunnRoute } from "../declare/route";
import { Line } from "./declare";

export class GestureUtil {

    public static createSimple(text: string, nest: number): Line {
        return {
            text,
            nest,
        };
    }

    public static parseProtocolToString(protocol: PROTOCOL): string {

        return `${protocol[0].toUpperCase()}${protocol.toLowerCase().substring(1)}`;
    }

    public static generateNamespace(route: KunnRoute): string {

        const parsedPath: string[] = route.path
            .split('/')
            .filter(Boolean)
            .map((value: string) => value.replace(/ /g, ''));

        return `${this.parseProtocolToString(route.protocol)}_${parsedPath.join('_')}`;
    }
}

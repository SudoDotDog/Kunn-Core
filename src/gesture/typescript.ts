/**
 * @author WMXPY
 * @namespace Gesture
 * @description TypeScript
 */

import { PROTOCOL } from "../declare/declare";
import { KunnRoute } from "../declare/route";
import { GestureBuffer } from "./buffer";
import { generateNamespace } from "./util";

export const generateTypeScriptGesture = <P extends PROTOCOL = any>(route: KunnRoute<P>): string => {

    const gesture: GestureBuffer = GestureBuffer.create();

    gesture.appendHead({
        text: `export declare namespace ${generateNamespace(route)} {`,
        nest: 0,
    }).appendTail({
        text: `}`,
        nest: 0,
    });

    return gesture.combine();
};

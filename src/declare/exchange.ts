/**
 * @author WMXPY
 * @namespace Declare
 * @description Exchange
 */

import { TYPE } from "./declare";

export type KunnData = {

    readonly type: TYPE.INTEGER | TYPE.STRING | TYPE.FLOAT;
} | {
    readonly type: TYPE.ARRAY;
    readonly element: KunnData;
} | {
    readonly type: TYPE.OBJECT;
    readonly map: Record<string, KunnData>;
};

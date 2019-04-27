/**
 * @author WMXPY
 * @namespace Declare
 * @description Exchange
 */

import { TYPE } from "./declare";

export type KunnData = {

    readonly type: TYPE.INTEGER | TYPE.STRING;
} | {
    readonly type: TYPE.ARRAY;
    readonly element: KunnData;
};

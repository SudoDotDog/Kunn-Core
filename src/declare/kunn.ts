/**
 * @author WMXPY
 * @namespace Declare
 * @description Kunn
 */

import { KunnRoute } from "./route";

export type KunnConfig = {

    readonly version: number;
    readonly routes: KunnRoute[];
};

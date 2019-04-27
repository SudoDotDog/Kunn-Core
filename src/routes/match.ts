/**
 * @author WMXPY
 * @namespace Routes
 * @description Match
 */

import { PROTOCOL } from "../declare/declare";
import { KunnConfig } from "../declare/kunn";
import { KunnRoute } from "../declare/route";

export const match = <P extends PROTOCOL>(config: KunnConfig, path: string, protocol: P): KunnRoute<P> => {

    for (const route of config.routes) {

        if (route.path === path && route.protocol === protocol) {

            return route;
        }
    }
};

/**
 * @author WMXPY
 * @namespace Response
 * @description Response
 */

import { _Map } from "@sudoo/bark/map";
import * as Chance from "chance";
import { KunnData } from "../declare/exchange";
import { KunnRoute } from "../declare/route";
import { generateData } from "./generator";

export const generateResponse = (route: KunnRoute, seed?: any): Record<string, any> => {

    const chance: Chance.Chance = new Chance(seed);
    const response: Record<string, KunnData> = route.request.response;

    return _Map.keys(response).reduce((previous: Record<string, any>, key: string) => {

        const current: KunnData = response[key];

        return {
            ...previous,
            [key]: generateData(current, chance),
        };
    }, {} as Record<string, any>);
};

export const generateReject = (route: KunnRoute, seed?: any): Record<string, any> => {

    if (!route.request.reject) {
        return {};
    }

    const chance: Chance.Chance = new Chance(seed);
    const response: Record<string, KunnData> = route.request.reject;

    return _Map.keys(response).reduce((previous: Record<string, any>, key: string) => {

        const current: KunnData = response[key];

        return {
            ...previous,
            [key]: generateData(current, chance),
        };
    }, {} as Record<string, any>);
};

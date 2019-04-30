/**
 * @author WMXPY
 * @namespace Config
 * @description Validate
 */

import { _Map } from "@sudoo/bark/map";
import { PROTOCOL, TYPE } from "../declare/declare";
import { KunnData } from "../declare/exchange";
import { KunnConfig } from "../declare/kunn";
import { KunnBodyRequest, KunnRoute } from "../declare/route";

export const validateKunnData = (data: KunnData): boolean => {

    switch (data.type) {

        case TYPE.FLOAT:
        case TYPE.INTEGER:
        case TYPE.STRING: return true;
        case TYPE.ARRAY: return validateKunnData(data.element);
        case TYPE.OBJECT: {
            for (const key of _Map.keys(data.map)) {
                if (!validateKunnData(data.map[key])) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
};

export const validateKunnRecord = (record: Record<string, KunnData>): boolean => {

    for (const key of _Map.keys(record)) {
        if (!validateKunnData(record[key])) {
            return false;
        }
    }
    return true;
};

export const validateKunnRoute = (route: KunnRoute): boolean => {

    if (!route.path) {
        return false;
    }

    if (![
        PROTOCOL.DELETE,
        PROTOCOL.GET,
        PROTOCOL.OPTION,
        PROTOCOL.POST,
        PROTOCOL.PUT,
    ].includes(route.protocol)) {
        return false;
    }

    if (!route.request) {
        return false;
    }

    if (!validateKunnRecord(route.request.query)) {
        return false;
    }

    if (!validateKunnRecord(route.request.response)) {
        return false;
    }

    if (route.protocol === PROTOCOL.DELETE
        || route.protocol === PROTOCOL.POST
        || route.protocol === PROTOCOL.PUT) {
        const request: KunnBodyRequest = route.request as KunnBodyRequest;
        if (!validateKunnRecord(request.body)) {
            return false;
        }
    }

    if (route.request.reject) {
        if (!validateKunnRecord(route.request.reject)) {
            return false;
        }
    }
    return true;
};

export const validateKunnConfig = (config: KunnConfig): boolean => {

    if (!config.version) {
        return false;
    }

    for (const route of config.routes) {
        if (!validateKunnRoute(route)) {
            return false;
        }
    }
    return true;
};

/**
 * @author WMXPY
 * @namespace Request
 * @description Validate
 */

import { _Map } from "@sudoo/bark/map";
import { TYPE } from "../declare/declare";
import { KunnData } from "../declare/exchange";
import { KunnBodyRequest, KunnQueryRequest } from "../declare/route";
import { KunnValidatableBodyRequest, KunnValidatableQueryRequest } from "./declare";

export const validateValue = (data: KunnData, value: any): boolean => {

    switch (data.type) {
        case TYPE.FLOAT:
        case TYPE.INTEGER: return (typeof value === 'number');
        case TYPE.STRING: return (typeof value === 'string');
        case TYPE.ARRAY: {

            const list: any[] = value;
            if (!Array.isArray(list)) {
                return false;
            }

            for (const each of list) {
                if (!validateValue(data.element, each)) {
                    return false;
                }
            }
            return true;
        }
        case TYPE.OBJECT: return validateRecord(data.map, value);
    }

    return false;
};

export const validateRecord = (data: Record<string, KunnData>, validatable: Record<string, any>): boolean => {


    const dataKeys: string[] = _Map.keys(data);
    const validatableKeys: string[] = _Map.keys(validatable);

    for (const key of _Map.keys(data)) {

        const current: KunnData = data[key];
        const value: any = validatable[key];

        if (value === undefined) {
            return Boolean(current.optional);
        }

        if (!validateValue(current, value)) {
            return false;
        }
    }

    return true;
};

export const validateQueryRequest = (request: KunnQueryRequest, validatable: KunnValidatableQueryRequest): boolean => {

    if (!validateRecord(request.query, validatable.query)) {
        return false;
    }
    return true;
};

export const validateBodyRequest = (request: KunnBodyRequest, validatable: KunnValidatableBodyRequest): boolean => {

    if (!validateRecord(request.query, validatable.query)) {
        return false;
    }
    if (!validateRecord(request.body, validatable.body)) {
        return false;
    }
    return true;
};

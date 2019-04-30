/**
 * @author WMXPY
 * @namespace Config
 * @description Validate
 */

import { _Map } from "@sudoo/bark/map";
import { TYPE } from "../declare/declare";
import { KunnData } from "../declare/exchange";
import { KunnConfig } from "../declare/kunn";

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

export const validateKunnConfig = (config: KunnConfig): boolean => {

    return true;
};

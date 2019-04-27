/**
 * @author WMXPY
 * @namespace Response
 * @description Generator
 */

import { TYPE } from "../declare/declare";

export const generateData = (type: TYPE, chance: Chance.Chance): any => {

    switch (type) {
        case TYPE.INTEGER: return chance.natural();
        case TYPE.STRING: return chance.string();
        default: return chance.name();
    }
};

/**
 * @author WMXPY
 * @namespace Response
 * @description Generator
 */

import { _Map } from "@sudoo/bark/map";
import { TYPE } from "../declare/declare";
import { KunnData } from "../declare/exchange";

export const generateData = (data: KunnData, chance: Chance.Chance): any => {

    switch (data.type) {
        case TYPE.INTEGER: return chance.natural();

        case TYPE.STRING: return chance.string();

        case TYPE.ARRAY: return new Array(chance.natural({
            min: 5,
            max: 20,
        })).fill(undefined).map(() => generateData(data, chance));

        case TYPE.OBJECT: return _Map.keys(data.map).reduce((previous: Record<string, any>, key: string) => {
            return {
                ...previous,
                [key]: generateData(data, chance),
            };
        }, {} as Record<string, any>);

        default: return chance.name();
    }
};

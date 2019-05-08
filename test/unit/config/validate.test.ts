/**
 * @author WMXPY
 * @namespace Config
 * @description Validate
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { validateKunnData, validateKunnRecord } from "../../../src/config/validate";
import { TYPE } from "../../../src/declare/declare";
import { KunnData } from "../../../src/declare/exchange";

describe('Given [validateKunnData] function', (): void => {

    const chance: Chance.Chance = new Chance('config-validate-kunn-data');

    it('should be able to validate basic kunn data', (): void => {

        const patternInt: KunnData = {
            type: TYPE.INTEGER,
        };

        const patternFloat: KunnData = {
            type: TYPE.FLOAT,
        };

        const patternString: KunnData = {
            type: TYPE.STRING,
        };

        // tslint:disable-next-line
        expect(validateKunnData(patternInt)).to.be.true;
        // tslint:disable-next-line
        expect(validateKunnData(patternFloat)).to.be.true;
        // tslint:disable-next-line
        expect(validateKunnData(patternString)).to.be.true;
    });

    it('should be able to validate array kunn data', (): void => {

        const pattern: KunnData = {
            type: TYPE.ARRAY,
            element: {
                type: TYPE.INTEGER,
            },
        };

        const result: boolean = validateKunnData(pattern);

        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('should be able to validate object kunn data', (): void => {

        const pattern: KunnData = {
            type: TYPE.OBJECT,
            map: {
                [chance.string()]: {
                    type: TYPE.ARRAY,
                    element: {
                        type: TYPE.FLOAT,
                    },
                },
            },
        };

        const result: boolean = validateKunnData(pattern);

        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('should be able to fail object kunn data', (): void => {

        const pattern: KunnData = {
            type: TYPE.OBJECT,
            map: {
                [chance.string()]: {
                    type: TYPE.ARRAY,
                    element: {
                        type: chance.string(),
                    } as any,
                },
            },
        };

        const result: boolean = validateKunnData(pattern);

        // tslint:disable-next-line
        expect(result).to.be.false;
    });
});

describe('Given [validateKunnRecord] function', (): void => {

    const chance: Chance.Chance = new Chance('config-validate-kunn-record');

    it('should be able to validate correct record', (): void => {

        const pattern: KunnData = {
            type: TYPE.INTEGER,
        };

        const record: Record<string, KunnData> = {

            [chance.string()]: pattern,
            [chance.string()]: pattern,
        };

        const result: boolean = validateKunnRecord(record);

        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('should be able to fail error record', (): void => {

        const pattern: KunnData = {
            type: TYPE.INTEGER,
        };

        const record: Record<string, KunnData> = {

            [chance.string()]: pattern,
            [chance.string()]: {} as any,
        };

        const result: boolean = validateKunnRecord(record);

        // tslint:disable-next-line
        expect(result).to.be.false;
    });
});

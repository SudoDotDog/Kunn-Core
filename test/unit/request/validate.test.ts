/**
 * @author WMXPY
 * @namespace Request
 * @description Validate
 * @override Unit
 */

import * as Chance from "chance";
import { TYPE } from "../../../src/declare/declare";
import { KunnData } from "../../../src/declare/exchange";
import { validateValue } from "../../../src/request/validate";
import { testPatternPaths } from "../../helper/path";

describe('Given [Validate] helper method', (): void => {

    const chance: Chance.Chance = new Chance('request-validate');

    it('should be able to validate string value', (): void => {

        const pattern: KunnData = {
            type: TYPE.STRING,
        };
        const valid: any = chance.string();
        const invalid: any = chance.natural();

        testPatternPaths(pattern, valid, invalid);
    });

    it('should be able to validate integer value', (): void => {

        const pattern: KunnData = {
            type: TYPE.INTEGER,
        };
        const valid: any = chance.natural();
        const invalid: any = chance.string();

        const happy: boolean = validateValue(pattern, valid);
        const sad: boolean = validateValue(pattern, invalid);

        testPatternPaths(pattern, valid, invalid);
    });

    it('should be able to validate float value', (): void => {

        const pattern: KunnData = {
            type: TYPE.FLOAT,
        };
        const valid: any = chance.floating();
        const invalid: any = chance.string();

        const happy: boolean = validateValue(pattern, valid);
        const sad: boolean = validateValue(pattern, invalid);

        testPatternPaths(pattern, valid, invalid);
    });
});

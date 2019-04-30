/**
 * @author WMXPY
 * @namespace Config
 * @description Validate
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { validateKunnData } from "../../../src/config/validate";
import { TYPE } from "../../../src/declare/declare";
import { KunnData } from "../../../src/declare/exchange";

describe('Given [ConfigValidation] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('config-validate');

    it('should be able to validate kunn data', (): void => {

        const pattern: KunnData = {
            type: TYPE.INTEGER,
        };

        const result: boolean = validateKunnData(pattern);

        // tslint:disable-next-line
        expect(result).to.be.true;
    });
});

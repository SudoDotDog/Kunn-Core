/**
 * @author WMXPY
 * @namespace Helper
 * @description Path
 */

import { expect } from "chai";
import { KunnData } from "../../src/declare/exchange";
import { validateValue } from "../../src/request/validate";

export const testPatternPaths = (pattern: KunnData, shouldValid: any, ...shouldInvalid: any[]) => {

    const happy: boolean = validateValue(pattern, shouldValid);
    // tslint:disable-next-line
    expect(happy).to.be.true;

    for (const each of shouldInvalid) {
        const sad: boolean = validateValue(pattern, each);
        // tslint:disable-next-line
        expect(sad).to.be.false;
    }
};

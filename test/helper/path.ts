/**
 * @author WMXPY
 * @namespace Helper
 * @description Path
 */

import { expect } from "chai";
import { KunnData } from "../../src/declare/exchange";
import { validateValue } from "../../src/request/validate";

export const testPatternPaths = (pattern: KunnData, shouldValid: any, shouldInvalid: any) => {

    const happy: boolean = validateValue(pattern, shouldValid);
    const sad: boolean = validateValue(pattern, shouldInvalid);

    // tslint:disable-next-line
    expect(happy).to.be.true;
    // tslint:disable-next-line
    expect(sad).to.be.false;
};

/**
 * @author WMXPY
 * @namespace Gesture
 * @description TypeScript
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { PROTOCOL } from "../../../src";
import { parseProtocolToString } from "../../../src/gesture/util";

describe('Given [Typescript] generator method', (): void => {

    const chance: Chance.Chance = new Chance('gesture-typescript');

    it('should be able to parse protocol', (): void => {

        const protocol: PROTOCOL = PROTOCOL.OPTION;

        const parsed: string = parseProtocolToString(protocol);

        expect(parsed).to.be.equal('Option');
    });
});

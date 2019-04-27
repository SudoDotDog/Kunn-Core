/**
 * @author WMXPY
 * @namespace Read
 * @description Read
 * @override
 */

import * as __SudooIO from "@sudoo/io";
import { Mock, Sandbox } from "@sudoo/mock";
import { expect } from "chai";
import * as Chance from "chance";
import { KunnConfig } from "../../../src";
import { readConfig } from "../../../src/config/read";

describe('Given [Read] helper method', (): void => {

    const chance: Chance.Chance = new Chance('read-read');

    it('should be able to read config file', async (): Promise<void> => {

        const key: string = chance.string();
        const value: string = chance.string();

        const stack = Sandbox.create();
        const mock = Mock.create(__SudooIO, 'recursiveRead');

        mock.mock(stack.func({
            [key]: value,
        }));

        const config: KunnConfig = await readConfig(chance.string());

        mock.restore();

        expect(config).to.be.deep.equal({
            [key]: value,
        });
    });
});

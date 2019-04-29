/**
 * @author WMXPY
 * @namespace Gesture
 * @description Golang
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { KunnData, TYPE } from "../../../src";
import { Line } from "../../../src/gesture/declare";
import { generateGoLangTypeDefinition } from "../../../src/gesture/go";

describe('Given [GoLangTypeDefinition] generator method', (): void => {

    const chance: Chance.Chance = new Chance('gesture-golang-type');

    it('should be able to generate array type definition', (): void => {

        const data: KunnData = {
            type: TYPE.ARRAY,
            element: {
                type: TYPE.STRING,
            },
        };

        const result: Line[] = generateGoLangTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: '[]string',
            nest: 0,
        }]);
    });

    it('should be able to generate object type definition', (): void => {

        const key1: string = chance.string();
        const key2: string = chance.string();

        const data: KunnData = {
            type: TYPE.OBJECT,
            map: {
                [key1]: {
                    type: TYPE.STRING,
                },
                [key2]: {
                    type: TYPE.INTEGER,
                },
            },
        };

        const result: Line[] = generateGoLangTypeDefinition(data, 0);

        expect(result).to.be.deep.equal([{
            text: 'struct {',
            nest: 0,
        }, {
            text: `${key1} string`,
            nest: 1,
        }, {
            text: `${key2} int`,
            nest: 1,
        }, {
            text: '}',
            nest: 0,
        }]);
    });
});

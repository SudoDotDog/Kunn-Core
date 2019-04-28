/**
 * @author WMXPY
 * @namespace Gesture
 * @description TypeScript
 */

import { _Map } from "@sudoo/bark/map";
import { PROTOCOL, TYPE } from "../declare/declare";
import { KunnData } from "../declare/exchange";
import { KunnRoute } from "../declare/route";
import { GestureBuffer } from "./buffer";
import { Line } from "./declare";
import { generateNamespace } from "./util";

export const generateTypeScriptTypeKeyedDefinition = (name: string, data: KunnData, nest: number) => {

    const lines: Line[] = generateTypeScriptTypeDefinition(data, nest);
    if (lines[0]) {
        lines[0] = {
            text: lines[0].text,
            nest: lines[0].nest,
        };
    }
    return lines;
};

export const generateTypeScriptTypeDefinition = (data: KunnData, nest: number): Line[] => {

    switch (data.type) {
        case TYPE.FLOAT:
        case TYPE.INTEGER: return [{
            text: 'number',
            nest,
        }];
        case TYPE.STRING: return [{
            text: 'string',
            nest,
        }];

        case TYPE.ARRAY: return [
            {
                text: 'Array<',
                nest,
            },
            ...generateTypeScriptTypeDefinition(data.element, nest + 1),
            {
                text: '>',
                nest,
            },
        ];

        case TYPE.OBJECT: {
            // const objectResult = _Map.keys(data.map).reduce()

            return [{
                text: `{\n\n}`,
                nest, // TODO
            }];
        }
    }

    return [];
};

export const generateTypeScriptGesture = <P extends PROTOCOL = any>(route: KunnRoute<P>): string => {

    const gesture: GestureBuffer = GestureBuffer.create();

    gesture.appendHead({
        text: `export declare namespace ${generateNamespace(route)} {`,
        nest: 0,
    }).appendTail({
        text: `}`,
        nest: 0,
    });

    return gesture.combine();
};

/**
 * @author WMXPY
 * @namespace Gesture
 * @description TypeScript
 */

import { _Map } from "@sudoo/bark/map";
import { PROTOCOL, TYPE } from "../declare/declare";
import { KunnData } from "../declare/exchange";
import { KunnRoute, KunnBodyRequest } from "../declare/route";
import { GestureBuffer } from "./buffer";
import { Line } from "./declare";
import { generateNamespace } from "./util";
import { _Mutate } from "@sudoo/bark/mutate";

export const generateTypeScriptTypeKeyedDefinition = (name: string, data: KunnData, nest: number): Line[] => {

    const lines: Line[] = generateTypeScriptTypeDefinition(data, nest);
    if (lines[0]) {
        lines[0] = {
            text: `readonly ${name}: ${lines[0].text}`,
            nest: lines[0].nest,
        };
    }

    if (lines[lines.length - 1]) {
        lines[lines.length - 1] = {
            text: `${lines[lines.length - 1].text};`,
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
            const objectResult = _Map.keys(data.map).reduce((previous: Line[], key: string) => {

                const typeValue: Line[] = generateTypeScriptTypeKeyedDefinition(key, data.map[key], nest + 1);
                return [...previous, ...typeValue];
            }, [] as Line[]);

            return [{
                text: `{`,
                nest,
            },
            ...objectResult,
            {
                text: `}`,
                nest,
            }];
        }
    }

    return [];
};

export const generateTypeScriptSubData = (name: string, record: Record<string, KunnData>): Line[] => {



    return [{
        text: 'export type Query = {',
        nest: 1,
    },
    ..._Map.keys(record).reduce((previous: Line[], key: string) => {
        return [
            ...previous,
            ...generateTypeScriptTypeKeyedDefinition(key, record[key], 2),
        ];
    }, [] as Line[]),
    {
        text: '};',
        nest: 1,
    }];
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

    gesture.appendBody(...generateTypeScriptSubData('Query', route.request.query));

    if (route.protocol === PROTOCOL.DELETE
        || route.protocol === PROTOCOL.POST
        || route.protocol === PROTOCOL.PUT) {

        const request: KunnBodyRequest = route.request as KunnBodyRequest;
        gesture.appendBody(...generateTypeScriptSubData('Body', request.body));
    }

    gesture.appendBody(...generateTypeScriptSubData('Response', route.request.response));

    return gesture.combine();
};

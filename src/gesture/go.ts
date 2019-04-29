/**
 * @author WMXPY
 * @namespace Gesture
 * @description Go
 */

import { _Map } from "@sudoo/bark/map";
import { PROTOCOL, TYPE } from "../declare/declare";
import { KunnData } from "../declare/exchange";
import { KunnBodyRequest, KunnRoute } from "../declare/route";
import { GestureBuffer } from "./buffer";
import { Line } from "./declare";
import { createSimple, generateNamespace } from "./util";

export const generateGoLangTypeKeyedDefinition = (name: string, data: KunnData, nest: number): Line[] => {

    const lines: Line[] = generateGoLangTypeDefinition(data, nest);

    if (lines[0]) {
        lines[0] = {
            text: `${name} ${lines[0].text}`,
            nest: lines[0].nest,
        };
    }

    return lines;
};

export const generateGoLangTypeDefinition = (data: KunnData, nest: number): Line[] => {

    switch (data.type) {

        case TYPE.FLOAT: return [createSimple('float32', nest)];
        case TYPE.INTEGER: return [createSimple('int32', nest)];
        case TYPE.STRING: return [createSimple('string', nest)];

        case TYPE.ARRAY: {

            const definition: Line[] = generateGoLangTypeDefinition(data.element, nest);
            if (definition[0]) {
                definition[0] = {
                    text: `[]${definition[0].text}`,
                    nest: definition[0].nest,
                };
            }

            return definition;
        }

        case TYPE.OBJECT: {

            const objectResult = _Map.keys(data.map).reduce((previous: Line[], key: string) => {
                const typeValue: Line[] = generateGoLangTypeKeyedDefinition(key, data.map[key], nest + 1);
                return [...previous, ...typeValue];
            }, [] as Line[]);

            return [{
                text: `struct {`,
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

export const generateGoLangSubData = (name: string, record: Record<string, KunnData>): Line[] => {

    return [{
        text: `${name} struct {`,
        nest: 1,
    },
    ..._Map.keys(record).reduce((previous: Line[], key: string) => {
        return [
            ...previous,
            ...generateGoLangTypeKeyedDefinition(key, record[key], 2),
        ];
    }, [] as Line[]),
    {
        text: '}',
        nest: 1,
    }];
};

export const generateGoLangGesture = <P extends PROTOCOL = any>(route: KunnRoute<P>): string => {

    const gesture: GestureBuffer = GestureBuffer.create();

    gesture.appendHead({
        text: `type ${generateNamespace(route)} struct {`,
        nest: 0,
    }).appendTail({
        text: `}`,
        nest: 0,
    });

    gesture.appendBody(...generateGoLangSubData('Query', route.request.query));

    if (route.protocol === PROTOCOL.DELETE
        || route.protocol === PROTOCOL.POST
        || route.protocol === PROTOCOL.PUT) {

        const request: KunnBodyRequest = route.request as KunnBodyRequest;
        gesture.appendBody(...generateGoLangSubData('Body', request.body));
    }

    gesture.appendBody(...generateGoLangSubData('Response', route.request.response));

    return gesture.combine();
};

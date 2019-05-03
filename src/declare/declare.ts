/**
 * @author WMXPY
 * @namespace Declare
 * @description Declare
 */

export const toUpperCase = <T extends string = any>(stuff: T): T => {

    if (stuff.toUpperCase) {
        return stuff.toUpperCase() as any as T;
    }
    return '' as any as T;
};

export enum PROTOCOL {

    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    OPTION = 'OPTION',
}

export enum TYPE {

    STRING = 'STRING',
    INTEGER = 'INTEGER',
    FLOAT = 'FLOAT',
    ARRAY = 'ARRAY',
    OBJECT = 'OBJECT',
}

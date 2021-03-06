/**
 * @author WMXPY
 * @namespace Panic
 * @description Panic
 */

import { Panic } from "connor";

export const MODULE_NAME = 'KUNN_CORE';

export enum ERROR_CODE {

    CONFIG_NOT_VALID = 2900,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.CONFIG_NOT_VALID]: 'Configuration not valid',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);

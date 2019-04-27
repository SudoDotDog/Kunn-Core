/**
 * @author WMXPY
 * @namespace Request
 * @description Request
 */

import { PROTOCOL } from "../declare/declare";
import { KunnBodyRequest, KunnQueryRequest, KunnRoute } from "../declare/route";
import { KunnValidatableBodyRequest, KunnValidatableQueryRequest, KunnValidatableRequest } from "./declare";

export const validateQueryRequest = (request: KunnQueryRequest, validatable: KunnValidatableQueryRequest): boolean => {

    return true;
};

export const validateBodyRequest = (request: KunnBodyRequest, validatable: KunnValidatableBodyRequest): boolean => {

    return true;
};

export const validateRequest = <P extends PROTOCOL>(route: KunnRoute<P>, validatable: KunnValidatableRequest<P>): boolean => {

    switch (route.protocol) {

        case PROTOCOL.GET:
            return validateQueryRequest(
                route.request as KunnQueryRequest,
                validatable as KunnValidatableQueryRequest,
            );
        case PROTOCOL.OPTION:
            return validateQueryRequest(
                route.request as KunnQueryRequest,
                validatable as KunnValidatableQueryRequest,
            );

        case PROTOCOL.POST:
            return validateBodyRequest(
                route.request as KunnBodyRequest,
                validatable as KunnValidatableBodyRequest,
            );
        case PROTOCOL.PUT:
            return validateBodyRequest(
                route.request as KunnBodyRequest,
                validatable as KunnValidatableBodyRequest,
            );
        case PROTOCOL.DELETE:
            return validateBodyRequest(
                route.request as KunnBodyRequest,
                validatable as KunnValidatableBodyRequest,
            );
    }
};

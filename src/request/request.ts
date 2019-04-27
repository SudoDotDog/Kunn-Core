/**
 * @author WMXPY
 * @namespace Request
 * @description Request
 */

import { PROTOCOL } from "../declare/declare";
import { KunnQueryRequest, KunnRoute } from "../declare/route";
import { KunnValidatableBodyRequest, KunnValidatableQueryRequest, KunnValidatableRequest } from "./declare";

export const validateQueryRequest = (request: KunnQueryRequest, validatable: KunnValidatableQueryRequest) => {


};

export const validateBodyRequest = (request: KunnQueryRequest, validatable: KunnValidatableBodyRequest) => {


};

export const validateRequest = <P extends PROTOCOL>(route: KunnRoute<P>, validatable: KunnValidatableRequest<P>) => {

    switch (route.protocol) {

        case PROTOCOL.GET:
            return validateQueryRequest(route.request, validatable as KunnValidatableQueryRequest);
        case PROTOCOL.POST:
            return validateBodyRequest(route.request, validatable as KunnValidatableBodyRequest);
    }
};

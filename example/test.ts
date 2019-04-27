/**
 * @author WMXPY
 * @namespace Example
 * @description Test
 */

import * as Path from "path";
import { Kunn } from "../src";

const currentPath = __dirname;

(async () => {

    const kunn: Kunn = await Kunn.fromPath(Path.join(currentPath, 'config.json'));
    console.log(JSON.stringify(kunn.config, null, 2));
})();

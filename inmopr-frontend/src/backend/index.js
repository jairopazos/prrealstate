/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import {init} from './appFetch';
import * as userService from './userService';
import * as postService from './postService';


export {default as NetworkError} from "./NetworkError";

export default {init, userService, postService};

// const { address } = require('ip');

import { address } from 'ip'
const path = require('path');



const getPath = (restPath: string) => {
    return 'http://' + path.join(`localhost:${process.env.PORT}`, restPath);
}



export { getPath };
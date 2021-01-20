import * as wasm from './water_sort_puzzle_solver_bg.wasm';

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {number} colors
* @param {number} height
* @param {number} empty_tubes
* @param {Uint8Array} pattern
* @returns {boolean}
*/
export function run(colors, height, empty_tubes, pattern) {
    var ptr0 = passArray8ToWasm0(pattern, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.run(colors, height, empty_tubes, ptr0, len0);
    return ret !== 0;
}


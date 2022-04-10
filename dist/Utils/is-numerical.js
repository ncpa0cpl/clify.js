"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumerical = void 0;
const isNumerical = (char) => /^[0-9]+$/.test(char);
exports.isNumerical = isNumerical;

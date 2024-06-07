"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = void 0;
exports.secretKey = {
    jwtSecret: process.env.JWT_SECRET || "123"
};

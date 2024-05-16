"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secrets = void 0;
exports.secrets = {
    jwtSecret: process.env.JWT_SECRET || "123"
};

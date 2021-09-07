"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../../src/controllers/user.controller");
const express_1 = require("@jest-mock/express");
const index_1 = __importDefault(require("../../src/core/service/user/index"));
describe('POST - Create user', () => {
    test('Test create user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.default.createUser = jest.fn().mockReturnValue(true);
        const req = (0, express_1.getMockReq)({
            body: { email: 'some@email.com' }
        });
        const { res } = (0, express_1.getMockRes)();
        yield (0, user_controller_1.signUp)(req, res).then((r) => {
            expect(r.json).toHaveBeenCalledWith(expect.objectContaining({
                msg: 'User created successfully.',
            }));
        });
    }));
    test('Test create user fails trying to save user', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.default.createUser = jest.fn().mockReturnValue(false);
        const req = (0, express_1.getMockReq)({
            body: { email: 'some@email.com' }
        });
        const { res } = (0, express_1.getMockRes)();
        yield (0, user_controller_1.signUp)(req, res).then((r) => {
            expect(r.json).toHaveBeenCalledWith(expect.objectContaining({
                msg: 'A problem occurred trying to create the user.',
            }));
        });
    }));
    test('Test create user fails for empty email', () => __awaiter(void 0, void 0, void 0, function* () {
        index_1.default.createUser = jest.fn().mockReturnValue(true);
        const req = (0, express_1.getMockReq)({
            body: {}
        });
        const { res } = (0, express_1.getMockRes)();
        yield (0, user_controller_1.signUp)(req, res).then((r) => {
            expect(r.json).toHaveBeenCalledWith(expect.objectContaining({
                msg: 'Email not found.',
            }));
        });
    }));
});

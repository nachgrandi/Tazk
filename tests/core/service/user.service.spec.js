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
const user_service_1 = __importDefault(require("../../../src/core/service/user/user.service"));
const mongodb_datasourse_1 = __importDefault(require("../../../src/datasource/mongodb/mongodb.datasourse"));
const dataSource = new mongodb_datasourse_1.default();
const user = {
    email: 'some@mail.com',
    showNotification: false,
    timeNotification: 0
};
const createUserService = (0, user_service_1.default)(dataSource);
describe('UserService - ', () => {
    test('Test create user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        dataSource.save = jest.fn().mockReturnValue(true);
        dataSource.getByEmail = jest.fn().mockReturnValue(null);
        const result = yield createUserService(user);
        expect(result).toBe(true);
    }));
    test('Test create user fail for user exist in db', () => __awaiter(void 0, void 0, void 0, function* () {
        dataSource.getByEmail = jest.fn().mockReturnValue(user);
        const result = yield createUserService(user);
        expect(result).toBe(false);
    }));
});

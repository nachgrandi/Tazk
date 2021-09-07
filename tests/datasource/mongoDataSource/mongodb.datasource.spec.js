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
const user_model_1 = __importDefault(require("../../../src/datasource/mongodb/models/user.model"));
const mongodb_datasourse_1 = __importDefault(require("../../../src/datasource/mongodb/mongodb.datasourse"));
const dataSource = new mongodb_datasourse_1.default();
const user = {
    email: 'some@mail.com',
    showNotification: false,
    timeNotification: 0
};
describe('UserDataSource - ', () => {
    test('Test find any user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.findOne = jest.fn().mockReturnValue(user);
        const result = yield dataSource.getByEmail(user.email);
        expect(result).toBe(user);
    }));
    test('Test fail to find any user', () => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.findOne = jest.fn().mockReturnValue(null);
        const result = yield dataSource.getByEmail(user.email);
        expect(result).toBe(null);
    }));
    test('Test save user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(user_model_1.default.prototype, 'save')
            .mockImplementationOnce(() => Promise.resolve());
        const result = yield dataSource.save(user);
        expect(result).toBeTruthy;
    }));
    test('Test fail to save user', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(user_model_1.default.prototype, 'save')
            .mockImplementationOnce(() => Promise.reject());
        const result = yield dataSource.save(user);
        expect(result).toBeFalsy;
    }));
});

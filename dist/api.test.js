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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("./index")); // Adjust the path to your index file
describe('Express Routes', () => {
    afterAll(() => {
        // Close any resources (e.g., database connections) after all tests
    });
    it('should respond with login success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/user/login')
            .send({
            username: 'testuser',
            password: 'testpassword',
        });
        expect(response.status).toBe(200); // Adjust the expected status code
        // Add more assertions based on your expected behavior
    }));
    it('should add a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/user/add')
            .send({
            username: 'newuser',
            password: 'newpassword',
            boolIsTeacher: false,
            email: 'newuser@example.com',
        });
        expect(response.status).toBe(200); // Adjust the expected status code
        // Add more assertions based on your expected behavior
    }));
    // Add more test cases for other routes and functionality
});

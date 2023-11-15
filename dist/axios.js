"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axiosMock = jest.createMockFromModule('axios');
axiosMock.post.mockResolvedValueOnce = jest.fn();
axiosMock.post.mockRejectedValueOnce = jest.fn();
exports.default = axiosMock;

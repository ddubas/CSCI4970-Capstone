"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    // Use res.sendFile() to send the HTML file
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/RegisterPage.html'));
});
router.get('/login', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/Login.html'));
});
router.get('/forgotPassword', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/ForgotPasswordPage.html'));
});
module.exports = router;

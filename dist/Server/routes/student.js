"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/Student/Home', (req, res) => {
    // Use res.sendFile() to send the HTML file
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/StudentView/StudentHomePage.html'));
});
router.get('/Student/Announcements', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/StudentView/StudentAnnouncementPage.html'));
});
router.get('/Student/Assignments', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/StudentView/StudentAssignmentPage.html'));
});
router.get('/Student/Courses', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/StudentView/StudentCoursePage.html'));
});
router.get('/Student/Excercises', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/StudentView/StudentExercisePage.html'));
});
router.get('/Student/Grades', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/StudentView/StudentGradePage.html'));
});
module.exports = router;

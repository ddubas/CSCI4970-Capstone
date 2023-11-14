"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/Teacher/Uploads', (req, res) => {
    // Use res.sendFile() to send the HTML file
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/TeacherView/ExerciseUploadTeacherView.html'));
});
router.get('/Teacher/AddCourse', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/TeacherView/TeacherAddCoursePage.html'));
});
router.get('/Teacher/Announcements', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/TeacherView/TeacherAnnouncementPage.html'));
});
router.get('/Teacher/Assignments', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/TeacherView/TeacherAssignmentPage'));
});
router.get('/Teacher/Courses', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/TeacherView/TeacherCoursePage.html'));
});
router.get('/Teacher/Home', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/TeacherView/TeacherHomePage.html'));
});
router.get('/Teacher/Grades', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/TeacherView/TeacherStudentGradePage.html'));
});
router.get('/Teacher/Students', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/TeacherView/TeacherStudentPage.html'));
});
router.get('/Teacher/StudentProfile', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Client/Webpages/TeacherView/TeacherStudentProfilePage.html'));
});
module.exports = router;

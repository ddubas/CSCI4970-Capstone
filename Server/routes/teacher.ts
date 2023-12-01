import express, { Request, Response, Router } from 'express';
import path from 'path';

const router = Router();

router.get('/Teacher/Uploads', (req: Request, res: Response) => {
  res.render('RegisterPage');
});

router.get('/Teacher/AddCourse', (req: Request, res: Response) => {
  res.render('TeacherView/TeacherAddCoursePage');
});

router.get('/Teacher/Announcements', (req: Request, res: Response) => {
  res.render('TeacherView/TeacherAnnouncementPage');
});

router.get('/Teacher/Assignments', (req: Request, res: Response) => {
  res.render('TeacherView/TeacherAssignmentPage');
});

router.get('/Teacher/Courses', (req: Request, res: Response) => {
  res.render('TeacherView/TeacherCoursePage');
});

router.get('/Teacher/Home', (req: Request, res: Response) => {
  res.render('TeacherView/TeacherHomePage');
});

router.get('/Teacher/Grades', (req: Request, res: Response) => {
  res.render('TeacherView/TeacherStudentGradePage');
});

router.get('/Teacher/Students', (req: Request, res: Response) => {
  res.render('TeacherView/TeacherStudentPage');
});

router.get('/Teacher/StudentProfile', (req: Request, res: Response) => {
  res.render('TeacherView/TeacherStudentProfilePage');
});

module.exports = router;

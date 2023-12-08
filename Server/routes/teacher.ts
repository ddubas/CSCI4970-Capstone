import express, { Express, Request, Response, Router } from 'express';
import path from 'path';

const router = Router();

router.get('/Teacher/Uploads', (req: Request, res: Response) => {
    // Use res.sendFile() to send the HTML file
    res.sendFile(path.join(__dirname, '../../Client/Webpages/TeacherView/ExerciseUploadTeacherView.html'));
  });
  
  router.get('/Teacher/AddCourse', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/TeacherView/TeacherAddCoursePage.html'));
  });
  
  router.get('/Teacher/Announcements', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/TeacherView/TeacherAnnouncementPage.html'));
  });
  
  router.get('/Teacher/Assignments', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/TeacherView/TeacherAssignmentPage.html'));
  });

  router.get('/Teacher/Courses', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/TeacherView/TeacherCoursePage.html'));
  });

  router.get('/Teacher/Home', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/TeacherView/TeacherHomePage.html'));
  });

  router.get('/Teacher/Grades', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/TeacherView/TeacherStudentGradePage.html'));
  });

  router.get('/Teacher/Students', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/TeacherView/TeacherStudentPage.html'));
  });

  router.get('/Teacher/StudentProfile', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/TeacherView/TeacherStudentProfilePage.html'));
  });
  module.exports = router;
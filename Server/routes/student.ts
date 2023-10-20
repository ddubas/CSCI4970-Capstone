import express, { Express, Request, Response, Router } from 'express';
import path from 'path';

const router = Router();

router.get('/Student/Home', (req: Request, res: Response) => {
    // Use res.sendFile() to send the HTML file
    res.sendFile(path.join(__dirname, '../../Client/Webpages/StudentView/StudentHomePage.html'));
  });
  
  router.get('/Student/Announcements', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/StudentView/StudentAnnouncementPage.html'));
  });
  
  router.get('/Student/Assignments', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/StudentView/StudentAssignmentPage.html'));
  });

  router.get('/Student/Courses', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/StudentView/StudentCoursePage.html'));
  });

  router.get('/Student/Excercises', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/StudentView/StudentExercisePage.html'));
  });

  router.get('/Student/Grades', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/StudentView/StudentGradePage.html'));
  });  

  module.exports = router;
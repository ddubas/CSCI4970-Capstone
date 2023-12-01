import { Request, Response, Router } from 'express';

const router = Router();

router.get('/Student/Home', (req: Request, res: Response) => {
  res.render('StudentView/StudentHomePage');
});

router.get('/Student/Announcements', (req: Request, res: Response) => {
  res.render('StudentView/StudentAnnouncementPage');
});

router.get('/Student/Assignments', (req: Request, res: Response) => {
  res.render('StudentView/StudentAssignmentPage');
});

router.get('/Student/Exercises', (req: Request, res: Response) => {
  res.render('StudentView/StudentExercisePage');
});

router.get('/Student/Grades', (req: Request, res: Response) => {
  res.render('StudentView/StudentGradePage');
});

module.exports = router;

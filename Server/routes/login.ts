import { Request, Response, Router } from 'express';


const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('RegisterPage');
});

router.get('/login', (req: Request, res: Response) => {
  res.render('Login');
});

router.get('/forgotPassword', (req: Request, res: Response) => {
  res.render('ForgotPasswordPage')
});

module.exports = router;
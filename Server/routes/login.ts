import express, { Express, Request, Response, Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    // Use res.sendFile() to send the HTML file
    res.sendFile(path.join(__dirname, '../../Client/Webpages/Login.html'));
  });
  
  router.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/Login.html'));
  });
  
  router.get('/forgotPassword', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../Client/Webpages/ForgotPasswordPage.html'));
  });
  
  module.exports = router;
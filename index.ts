import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app: Express = express();

// Set up static file serving for the 'Client' directory
app.use(express.static(path.join(__dirname, 'Client')));

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "Client/Styles/")));

app.get('/', (req: Request, res: Response) => {
  // Use res.sendFile() to send the HTML file
  res.sendFile(path.join(__dirname, 'Client/Webpages/RegisterPage.html'));
});

app.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'Client/Webpages/Login.html'));
});

app.get('/forgotPassword', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'Client/Webpages/ForgotPasswordPage.html'));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

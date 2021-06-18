import express from 'express';
import { alowMundo } from './routes';

const app = express();

app.get('/', alowMundo);

app.listen(3333);

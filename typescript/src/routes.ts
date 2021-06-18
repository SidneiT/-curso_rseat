import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function alowMundo(req: Request, res: Response) {
  const user = createUser({
    name: 'Jhon',
    email: 'jhon@mail.com',
    password: '123f23',
    tech: ['Nodejs', 'React', { title: 'Javascript', experience: 1 }]
  });

  return res.json({ message: 'Olá Mundo' });
}

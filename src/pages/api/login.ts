import {NextApiRequest, NextApiResponse} from 'next';
import { open } from 'sqlite';
import { Database } from 'sqlite3';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { secret } from '../../../api/secret';
import cookie from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: Database});

    if(req.method === 'POST'){
        const person = await db.get('SELECT * FROM person WHERE email = ?', [req.body.email]);
        
        if(person !== undefined){
            compare(req.body.password, person.password, async function(err, result) {
                if(!err && result) {
                    const claims = {sub: person.id, myPersonEmail: person.email};
                    const jwt = sign(claims, secret, { expiresIn: '1h' });

                    res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: '/'
                    }));
                    res.json({message: 'Successfully signed'});
                } else {
                    res.json({message: 'Failed to sign'});
                }
            });
        } else {
            res.json({message: 'Invalid'});
        }
    } else {
        res.status(405).json({message: 'Invalid method'});
    }
}
import {NextApiRequest, NextApiResponse} from 'next';
import { open } from 'sqlite';
import { Database } from 'sqlite3';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { secret } from '../../../api/secret';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: Database});

    if(req.method === 'POST'){
        const person = await db.get('SELECT * FROM vehicle WHERE email = ?', [req.body.email]);

        compare(req.body.password, person.password, async function(err, result) {
            if(!err && result) {
                const claims = {sub: person.id, myPersonEmail: person.email};
                const jwt = sign(claims, secret, { expiresIn: '1h' });

                res.json({authToken: jwt});
            } else {
                res.json({message: 'ERROR'});
            }
        });
    } else {
        res.status(405).json({message: 'Invalid method'});
    }
}
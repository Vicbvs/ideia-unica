import { verify } from 'jsonwebtoken';
import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import { open } from 'sqlite';
import { Database } from 'sqlite3';
import { secret } from '../../../api/secret';

export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.auth!, secret, async function(err, decoded) {
        if(!err && decoded) {
            return await fn(req, res);
        }

        res.status(401).json({ message: 'Invalid authorization' });
    })
}

export default authenticated(async function getPeople(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: Database});
    const people = await db.all('SELECT id, name, email FROM person');

    res.json(people);
})
import {NextApiRequest, NextApiResponse} from 'next';
import { open } from 'sqlite';
import { Database } from 'sqlite3';

export default async function getPeople(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: Database});
    const people = await db.all('SELECT * FROM person');

    res.json(people);
}
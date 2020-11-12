import {NextApiRequest, NextApiResponse} from 'next';
import { open } from 'sqlite';
import { Database } from 'sqlite3';

export default async function getPersonById(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: Database});

    if(req.method === 'PUT'){
        const statement = await db.prepare(
            'UPDATE person SET name = ?, email = ? WHERE id = ?'
        );
        const result = await statement.run(
            req.body.name, 
            req.body.email, 
            req.query.id
        );
        statement.finalize();
    }

    const person = await db.get('SELECT * FROM person WHERE id = ?', [req.query.id]);

    res.json(person);
}
import {NextApiRequest, NextApiResponse} from 'next';
import { open } from 'sqlite';
import { Database } from 'sqlite3';
import { hash } from 'bcrypt'

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: Database});

    if(req.method === 'POST'){
        hash(req.body.password, 10, async function(err, hash) {
            const statement = await db.prepare(
                'INSERT INTO person (name, email, password) VALUES (? , ? , ?)'
            );
            const result = await statement.run(
                req.body.name, 
                req.body.email, 
                hash
            );
            statement.finalize();

            const person = await db.all('SELECT * FROM person');
        
            res.json(person);
        });
    } else {
        res.status(405).json({message: 'Invalid method'});
    }
}
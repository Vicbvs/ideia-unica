import {NextApiRequest, NextApiResponse} from 'next';
import { open } from 'sqlite';
import { Database } from 'sqlite3';

export default async function getAllVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: Database});
    const vehicles = await db.all('SELECT * FROM vehicle WHERE ownerId = ?', [req.query.id]);

    res.json(vehicles);
}
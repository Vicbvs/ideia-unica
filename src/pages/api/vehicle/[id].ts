import {NextApiRequest, NextApiResponse} from 'next';
import { open } from 'sqlite';
import { Database } from 'sqlite3';

export default async function getVehiclesById(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: Database});
    const vehicle = await db.all('SELECT * FROM vehicle WHERE id = ?', [req.query.id]);

    res.json(vehicle);
}
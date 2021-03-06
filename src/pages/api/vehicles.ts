import {NextApiRequest, NextApiResponse} from 'next';
import { open } from 'sqlite';
import { Database } from 'sqlite3';
import { authenticated } from './people';

export default authenticated(async function getAllVehicles(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: './mydb.sqlite', driver: Database});
    const vehicles = await db.all('SELECT * FROM vehicle');

    res.json(vehicles);
})
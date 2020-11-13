import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { myGet } from '../../api/myGet';

export default function Vehicles({vehicles} : any) {
    return <div>Hello Vehicles {JSON.stringify(vehicles)}</div>
}

Vehicles.getInitialProps = async (ctx: NextPageContext) => {
    const json = await myGet('http://localhost:3000/api/vehicles', ctx);
    return {vehicles: json};
}
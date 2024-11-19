import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';

const data = [
    {
        name: 'אגני איווור',
        percent: 0.27,
    },
    {
        name: 'שיקוע ראשוני',
        percent: 0.23,
    },
    {
        name: 'שיקוע חול',
        percent: 0.19,
    },
    {
        name: 'מגובים מכניים',
        percent: 0.12,
    },
    {
        name: 'בורד שאיבה',
        percent: 0.08,
    },
    {
        name: 'מעכלים',
        percent: 0.08,
    },
    {
        name: 'אגני הצללה',
        percent: 0.04,
    },

];

export const FacilityFaultsChart = () => {

    return <ResponsiveContainer width="100%" height="100%" minHeight={"500px"}>
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='#000' />
            <YAxis orientation='right' stroke='#000' tickMargin={50} />
            <Bar dataKey="percent" fill="#0c2337" maxBarSize={50} />
        </BarChart>
    </ResponsiveContainer>
}
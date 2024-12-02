
import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Label,
} from 'recharts';

const data = [
    {
        name: 'תקציב עבודות',
        ils: 100,
    },
    {
        name: 'סכום ששולם',
        ils: 30,
    },
    {
        name: 'חריגה',
        ils: -20,
    },
    {
        name: 'תקציב פנוי',
        ils: 10,
    },

];


export const CostsChart = () => {

    return (
        <ResponsiveContainer width={'100%'} height={'100%'} minHeight={'400px'}>

            <BarChart id='costs-chart' data={data}
                width={500}
                height={400}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#000" tickMargin={10}/>
                <YAxis orientation='right' stroke="#000" tickMargin={40}>
                    <Label value={'עלויות באלפי ש"ח'} angle={-270} position={'right'} color={'black'} />
                </YAxis>
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="ils" fill="#05350f" maxBarSize={50} />
            </BarChart>
        </ResponsiveContainer>
    );
}

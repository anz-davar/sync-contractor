import React from 'react';
import {Bar, BarChart, CartesianGrid, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

export const ContractorsChart = ({data}) => {
    if (!data) return <div>Loading contractors chart...</div>;
    if (data.length === 0) return <div>No contractors data available</div>
    const formatXAxis = (tickItem) => {
        return `${tickItem.contractor__first_name} ${tickItem.contractor__last_name})`;
    };
    return (
        <ResponsiveContainer width="100%" height="100%" minHeight="400px">
            <BarChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="contractor__username" stroke="#000" tickMargin={10}
                       tickFormatter={formatXAxis} />
                <YAxis orientation="right" stroke="#000" tickMargin={40}>
                    <Label value="ציון ממוצע" angle={-270} position="right" color="black"/>
                </YAxis>
                <Tooltip cursor={{ fill: 'none' }} />
                <Legend/>
                <Bar dataKey="overall_avg" fill="#ffbb28" maxBarSize={50}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

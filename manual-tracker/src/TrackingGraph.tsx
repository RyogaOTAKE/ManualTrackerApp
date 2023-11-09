import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ClickData } from './types.d'; // あなたの型定義に合わせてパスを調整してください。

interface TrackingGraphProps {
    clickData: ClickData[];
}

const TrackingGraph: React.FC<TrackingGraphProps> = ({ clickData }) => {
    // グラフに表示するためにデータを整形する
    const formattedData = clickData.map(d => ({
        id: d.Id,
        x: d.x,
        y: d.y,
        timestamp: d.timestamp
    }));

    const colorMap: { [id: number]: string } = {
        1: '#D32F2F', // red
        2: '#0097A7', // cyan
        3: '#C2185B', // pink
        4: '#303F9F', // indigo
        5: '#0288D1', // light blue
        6: '#7B1FA2', // purple
        7: '#512DA8', // deep purple
        8: '#1976D2', // blue
        9: '#00796B', // teal
        10: '#388E3C', // green
    };

    return (
        <ScatterChart
            width={600}
            height={400}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            }}
        >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="X Coordinate" />
            <YAxis type="number" dataKey="y" name="Y Coordinate" reversed />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            {
                Object.keys(colorMap).map(key => {
                    const id = Number(key);
                    return (
                        <Scatter
                            key={id}
                            name={`ID ${id}`}
                            data={formattedData.filter(d => d.id === id).sort((a, b) => a.timestamp - b.timestamp)}
                            fill={colorMap[id]}
                            line={{ stroke: colorMap[id], strokeWidth: 2 }}
                            shape="circle"
                        />
                    );
                })
            }
        </ScatterChart>
    );
};

export default TrackingGraph;

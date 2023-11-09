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
        1: '#f4cccc',  // pale red
        2: '#cfe2f3',  // pale blue
        3: '#d9ead3',  // pale green
        4: '#fff2cc',  // pale yellow
        5: '#d9d2e9',  // pale purple
        6: '#ead1dc',  // pale pink
        7: '#fce5cd',  // pale orange
        8: '#c9daf8',  // pale azure
        9: '#cfe7f3',  // pale cyan
        10: '#d9e2d2', // pale olive
        11: '#e6e0d4', // pale taupe
        12: '#d9d9d9', // pale grey
        13: '#e2efda', // pale mint
        14: '#d9dbd3', // pale lime
        15: '#f9cb9c', // pale coral
        16: '#ffe599', // pale gold
        17: '#b6d7a8', // pale sage
        18: '#a4c2f4', // pale cerulean
        19: '#b4a7d6', // pale mauve
        20: '#a2c4c9', // pale teal
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

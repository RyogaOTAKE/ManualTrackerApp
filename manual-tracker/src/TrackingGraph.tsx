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
        1: '#004c6d',  // dark cerulean
        2: '#a43820',  // siena
        3: '#00563f',  // deep green
        4: '#540b0e',  // dark red
        5: '#2c5f2d',  // hunter green
        6: '#8a3a3b',  // dark terra cotta
        7: '#5a1a1a',  // dark brown
        8: '#355070',  // lapis blue
        9: '#25342b',  // dark jungle green
        10: '#1c1c1c', // eerie black
        11: '#483c32', // taupe
        12: '#3c1414', // dark sienna
        13: '#363457', // independence
        14: '#3b3a30', // olive drab
        15: '#2f2504', // dark olive
        16: '#353839', // onyx
        17: '#3b444b', // arsenic
        18: '#423e37', // old burgundy
        19: '#3c2f2f', // dark liver
        20: '#2b3a67', // dark sapphire
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

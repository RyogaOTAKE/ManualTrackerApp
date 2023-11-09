import React from 'react';
import { ClickData, DataExportProps } from './types.d';

const DataExport: React.FC<DataExportProps> = ({ clickData, deleteLastData, clearAllData, videoFileName }) => {

    // CSV形式の文字列を生成する関数
    const convertToCSV = (data: ClickData[]) => {
        const csvRows = [
            ['ID', 'X', 'Y', 'Timestamp'], // ヘッダー
            ...data.map(d => [d.Id, d.x, d.y, d.timestamp]), // データ
        ];
        return csvRows.map(e => e.join(',')).join('\n');
    };

    // CSVファイルとしてダウンロードする関数
    const downloadCSV = () => {
        const csvString = convertToCSV(clickData);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${videoFileName}_trackingdata.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            style={{
                backgroundColor: '#d9d2e9',
                padding: '10px',
                margin: 'auto',
            }}>
            {clickData.length > 0 && (
                <button onClick={downloadCSV}>Export to CSV</button>
            )}
            <br />
            Showing the latest 5 data:
            <table>
                <thead>
                    <tr>
                        <th>Object ID</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {clickData.slice(-5).map((data, index) => (
                        <tr key={index}>
                            <td>{data.Id}</td>
                            <td>{data.x.toFixed(2)}</td>
                            <td>{data.y.toFixed(2)}</td>
                            <td>{data.timestamp.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {clickData.length > 0 && (
                <button onClick={deleteLastData}>Delete Last Data</button>
            )}
            {clickData.length > 0 && (
                <button onClick={clearAllData}>Clear All</button>
            )}
        </div>
    );
};

export default DataExport;

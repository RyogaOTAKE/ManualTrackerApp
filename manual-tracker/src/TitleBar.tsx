import React from 'react';

// propsの型を定義するインターフェイス
interface TitleBarProps {
    title: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title }) => {
    return (
        <div style={{ backgroundColor: '#f5f5f5', padding: '10px', textAlign: 'center' }}>
            <h1>{title}</h1>
            Drug and drop the video file. <br />
            Do the 'right click' on the object in the video. <br />
            The app will record the position of the object and the time when you clicked. <br />
            You can export the data as a CSV file by clicking the 'Export to CSV' button. <br />
            You can also use the left and right arrow keys to move the video frame by frame. <br />
        </div>
    );
};

export default TitleBar;

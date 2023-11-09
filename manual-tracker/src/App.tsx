import React, { useState } from 'react';
import TitleBar from './TitleBar';
import VideoPlayer from './VideoPlayer';
import DataExport from './DataExport';
import TrackingGraph from './TrackingGraph';
import { ClickData } from './types.d';

const App: React.FC = () => {
  const [clickData, setClickData] = useState<ClickData[]>([]);
  const [videoFileName, setVideoFileName] = useState<string>('');

  const changeVideoName = (name: string) => {
    setVideoFileName(name);
  }

  const deleteLastData = () => {
    setClickData(prevData => prevData.slice(0, -1));
  }

  const clearAllData = () => {
    setClickData([]);
  }

  const handleVideoClick = (data: ClickData) => {
    setClickData(prevData => [...prevData, data]);
  };

  return (
    <div
      style={
        {
          padding: '10px',
        }
      }>
      <TitleBar title="Manual Tracker" />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ flex: 8, paddingRight: '10px' }}> {/* 80% の幅を占める */}
          <VideoPlayer onVideoClick={handleVideoClick} changeVideoName={changeVideoName} />
        </div>
        <div style={{ flex: 2 }}> {/* 残りの 20% の幅を占める */}
          <DataExport
            clickData={clickData}
            deleteLastData={deleteLastData}
            clearAllData={clearAllData}
            videoFileName={videoFileName}
          />
          <TrackingGraph clickData={clickData} />
        </div>
      </div>
    </div>
  );
};

export default App;

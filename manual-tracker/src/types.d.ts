export interface ClickData {
    Id: number;
    x: number;
    y: number;
    timestamp: number;
}

interface VideoPlayerProps {
    onVideoClick: (data: ClickData) => void;
    changeVideoName: (name: string) => void;
}

interface DataExportProps {
    clickData: ClickData[];
    deleteLastData: () => void;
    clearAllData: () => void;
    videoFileName: string;
}
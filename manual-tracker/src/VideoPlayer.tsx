import React, { useRef, useState, useEffect } from 'react';
import { ClickData, VideoPlayerProps } from './types.d';


const VideoPlayer: React.FC<VideoPlayerProps> = ({ onVideoClick, changeVideoName }) => {
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<number>(1); // デフォルトは1
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // コンポーネントのアンマウント時にオブジェクトURLを解放する
        return () => {
            if (videoSrc) {
                URL.revokeObjectURL(videoSrc);
            }
        };
    }, [videoSrc]);

    useEffect(() => {
        // キーボードイベントの登録
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                moveFrame(event.key === 'ArrowRight' ? 'forward' : 'backward');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // フレームレートが変わるたびにイベントリスナーを更新

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLVideoElement>) => {
        // デフォルトのコンテキストメニューを表示させません
        event.preventDefault();

        // クリックされた位置のX, Y座標を計算します
        const rect = videoRef.current?.getBoundingClientRect();
        const x = event.clientX - (rect?.left ?? 0);
        const y = event.clientY - (rect?.top ?? 0);

        // 親コンポーネントのハンドラー関数を呼び出します
        onVideoClick({ Id: selectedId, x, y, timestamp: videoRef.current?.currentTime ?? 0 });

        // デバッグ用にクリックされた位置を表示します
        console.log(`(${x}, ${y})`);
        console.log('clicked right button');
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        // ファイル名を取得します。
        const file = files[0];
        changeVideoName(file.name.replace(/\.[^/.]+$/, ""));

        // ファイルの種類が動画であるかを確認します。
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('video/')) {
                const fileUrl = URL.createObjectURL(file);
                setVideoSrc(fileUrl);
            } else {
                alert('Please drop a valid video file.');
            }
        }
    };

    const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedId(parseInt(event.target.value));
    };

    const moveFrame = (direction: 'forward' | 'backward') => {
        if (videoRef.current) {
            const frameTime = 1 / 29.97;
            const currentTime = videoRef.current.currentTime;
            videoRef.current.currentTime = direction === 'forward' ? currentTime + frameTime : currentTime - frameTime;
        }
    };

    return (
        <div>
            <h3>Video</h3>
            <div style={{ position: 'relative', top: 0, left: 0, right: 0 }}>
                <label htmlFor="idSelect">ID: </label>
                <select id="idSelect" value={selectedId} onChange={handleIdChange}>
                    {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
            </div>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    width: '100%',
                    height: 0, // 高さを0に設定し、::before 疑似要素で高さを確保します
                    position: 'relative',
                    margin: 'auto',
                    backgroundColor: 'powderblue',
                    overflow: 'hidden', // 枠からはみ出した部分は隠す
                    paddingBottom: '60%',
                }}
            >
                {videoSrc ? (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        style={{
                            position: 'absolute', // 絶対位置を指定
                            top: '50%', // 上から50%の位置に配置
                            left: '50%', // 左から50%の位置に配置
                            transform: 'translate(-50%, -50%)', // 中心に配置するために位置を調整
                            width: '80%', // 親要素に対して80%の幅
                            height: 'auto', // オリジナルのアスペクト比を保つ
                        }}
                        onContextMenu={handleContextMenu}
                        controls
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <p
                        style={{ minWidth: '100%', minHeight: '100%' }}
                    >
                        Drag and drop a video file here!
                    </p>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;

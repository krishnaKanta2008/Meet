import React, { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface VideoConferenceProps {
    username: string;
}

const VideoConference: React.FC<VideoConferenceProps> = ({ username }) => {
    const appID = 77212615; // Your ZEGOCLOUD App ID
    const serverSecret = 'af36c0f86bc72679120411cf4c7f9e22'; // Your ZEGOCLOUD Server Secret

    useEffect(() => {
        const getUrlParams = (url: string) => {
            const urlStr = url.split('?')[1];
            const urlSearchParams = new URLSearchParams(urlStr);
            return Object.fromEntries(urlSearchParams.entries());
        };

        const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + '').toString();
        const userID = Math.floor(Math.random() * 10000) + '';

        console.log('Room ID:', roomID); // Debug Room ID
        console.log('User ID:', userID); // Debug User ID

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, username);

        if (!kitToken) {
            console.error('Failed to generate kitToken.');
            return;
        }
        console.log('Kit Token:', kitToken); // Debug Kit Token

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: document.querySelector('#video-container') as HTMLElement,
            sharedLinks: [
                {
                    name: 'Meeting link',
                    url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 50,
            layout: 'Auto',
            showLayoutButton: true,
        });
    }, [username]);

    return <div id="video-container" style={{ width: '100%', height: '100vh' }}></div>;
};

export default VideoConference;

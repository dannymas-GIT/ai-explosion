import React, { useState, useCallback } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';

const LiveKitVoiceAssistant: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [roomName, setRoomName] = useState('');

  const fetchToken = useCallback(async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      console.log('Attempting to connect to:', `${apiUrl}/livekit/token`);
      const response = await fetch(`${apiUrl}/livekit/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room: roomName, username: 'user-' + Date.now() }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();
      console.log('Received token data:', data);
      if (!data.token) {
        throw new Error('No token received from server');
      }
      setToken(data.token);
      setError(null);
    } catch (error) {
      console.error('Error fetching token:', error);
      setError(`Failed to fetch token. Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, [roomName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!token) {
    return (
      <div className="livekit-connect">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
        />
        <button onClick={fetchToken}>Connect to Voice Assistant</button>
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={false}
      audio={true}
      token={token}
      serverUrl={import.meta.env.VITE_LIVEKIT_SERVER_URL}
      onConnected={() => console.log("Connected to LiveKit")}
      onError={(error) => console.error("LiveKit connection error:", error)}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default LiveKitVoiceAssistant;
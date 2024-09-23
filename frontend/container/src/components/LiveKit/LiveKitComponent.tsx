import React, { useState, useCallback } from 'react';
import { LiveKitRoom, VideoConference, RoomOptions } from '@livekit/components-react';

const LiveKitComponent: React.FC = () => {
  const [token, setToken] = useState('');
  const [roomName, setRoomName] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = useCallback(async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('Attempting to connect to:', `${apiUrl}/api/livekit/token`);
      const response = await fetch(`${apiUrl}/api/livekit/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room: roomName }),
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
      setIsConnected(true);
      setError(null);
    } catch (error) {
      console.error('Error connecting to LiveKit:', error);
      setError(`Failed to connect. Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, [roomName]);

  if (!isConnected) {
    return (
      <div className="livekit-connect">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
        />
        <button onClick={handleConnect}>Connect to LiveKit</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }

  const roomOptions: RoomOptions = {
    adaptiveStream: true,
    dynacast: true,
    publishDefaults: {
      simulcast: true,
    },
  };

  return (
    <LiveKitRoom
      token={token}
      serverUrl={import.meta.env.VITE_LIVEKIT_SERVER_URL}
      options={roomOptions}
      connect={true}
      onError={(error) => {
        console.error('LiveKitRoom error:', error);
        setError(`LiveKit error: ${error.message}`);
        setIsConnected(false);
      }}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default LiveKitComponent;

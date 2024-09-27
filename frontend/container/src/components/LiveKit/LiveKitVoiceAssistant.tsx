import React, { useState } from 'react';
import './LiveKitVoiceAssistant.css';

const LiveKitVoiceAssistant: React.FC = () => {
  const [roomName, setRoomName] = useState('');

  const handleConnect = () => {
    // Implement connection logic here
    console.log('Connecting to room:', roomName);
  };

  return (
    <div className="livekit-voice-assistant">
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter room name"
        className="livekit-input"
      />
      <button onClick={handleConnect} className="livekit-button">
        Connect to Voice Assistant
      </button>
    </div>
  );
};

export default LiveKitVoiceAssistant;

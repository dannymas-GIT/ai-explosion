import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Room, RoomEvent, RemoteParticipant, RemoteTrack, RemoteTrackPublication, LocalParticipant } from 'livekit-client';

const LiveKitVoiceAssistant: React.FC = () => {
  const [token, setToken] = useState('');
  const [roomName, setRoomName] = useState('');
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleConnect = useCallback(async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('Attempting to connect to:', `${apiUrl}/api/livekit/token`);
      const response = await fetch(`${apiUrl}/api/livekit/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: roomName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
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

  useEffect(() => {
    if (isConnected && token) {
      const connectToRoom = async () => {
        const roomInstance = new Room();
        try {
          await roomInstance.connect(import.meta.env.VITE_LIVEKIT_SERVER_URL, token);
          setRoom(roomInstance);
          
          // Enable audio for the local participant
          const localParticipant = roomInstance.localParticipant;
          await localParticipant.setMicrophoneEnabled(true);
          
          console.log('Connected to room:', roomInstance.name);
        } catch (error) {
          console.error('Error connecting to LiveKit room:', error);
          setError(`Failed to connect to room: ${error instanceof Error ? error.message : String(error)}`);
        }
      };

      connectToRoom();
      return () => { room?.disconnect(); };
    }
  }, [isConnected, token]);

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.start();
    } else {
      setError('Speech recognition is not supported in this browser.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      sendTranscriptToOpenAI(transcript);
    }
  };

  const sendTranscriptToOpenAI = async (text: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.content);
      speakResponse(data.content);
    } catch (error) {
      console.error('Error sending transcript to OpenAI:', error);
      setError(`Failed to get response from OpenAI: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const speakResponse = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get all available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Filter for English female voices
    const femaleVoices = voices.filter(voice => 
      voice.lang.includes('en') && voice.name.includes('Female')
    );
    
    // Choose a voice (preferably a natural-sounding one if available)
    const chosenVoice = femaleVoices.find(voice => 
      voice.name.includes('Natural') || voice.name.includes('Premium')
    ) || femaleVoices[0] || voices[0];
    
    utterance.voice = chosenVoice;
    
    // Adjust pitch and rate for a more natural sound
    utterance.pitch = 1.1; // Slightly higher pitch (default is 1)
    utterance.rate = 0.9;  // Slightly slower rate (default is 1)
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="voice-assistant">
      {!isConnected ? (
        <div className="livekit-connect">
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
          />
          <button onClick={handleConnect}>Connect to Voice Assistant</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <>
          <h3>Voice Assistant</h3>
          <button onClick={startListening} disabled={isListening}>
            {isListening ? 'Listening...' : 'Start Listening'}
          </button>
          <button onClick={stopListening} disabled={!isListening}>
            Stop Listening
          </button>
          {isSpeaking && (
            <button onClick={stopSpeaking}>
              Stop Speaking
            </button>
          )}
          <p>Transcript: {transcript}</p>
          <p>Response: {response}</p>
        </>
      )}
    </div>
  );
};

export default LiveKitVoiceAssistant;

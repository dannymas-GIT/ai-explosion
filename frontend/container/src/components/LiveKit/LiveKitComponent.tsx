import React, { useEffect, useState } from 'react';
import { Room, RemoteParticipant, createLocalTracks } from 'livekit-client';

const LiveKitComponent: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<RemoteParticipant[]>([]);

  useEffect(() => {
    const connectToRoom = async () => {
      const url = 'YOUR_LIVEKIT_SERVER_URL';
      const token = 'YOUR_ACCESS_TOKEN';

      try {
        const room = new Room();
        await room.connect(url, token);
        setRoom(room);

        room.on('participantConnected', (participant: RemoteParticipant) => {
          setParticipants((prevParticipants) => [...prevParticipants, participant]);
        });

        room.on('participantDisconnected', (participant: RemoteParticipant) => {
          setParticipants((prevParticipants) =>
            prevParticipants.filter((p) => p.identity !== participant.identity)
          );
        });

        // Handle existing participants
        setParticipants(Array.from(room.participants.values()) as RemoteParticipant[]);
      } catch (error) {
        console.error('Failed to connect to LiveKit room', error);
      }
    };

    connectToRoom();

    return () => {
      room?.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>LiveKit Room</h1>
      <ul>
        {participants.map((participant) => (
          <li key={participant.identity}>{participant.identity}</li>
        ))}
      </ul>
    </div>
  );
};

export default LiveKitComponent;

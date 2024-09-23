import React, { useEffect, useState } from 'react';
import {
  Participant,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  VideoPresets,
  Track,
  LocalTrackPublication,
  LocalParticipant,
  createLocalTracks
} from 'livekit-client';

const LiveKitVoiceAssistant: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<RemoteParticipant[]>([]);

  useEffect(() => {
    const connectToRoom = async () => {
      const url = 'YOUR_LIVEKIT_SERVER_URL';
      const token = 'YOUR_ACCESS_TOKEN';

      try {
        console.log('Creating room instance...');
        const room = new Room({
          adaptiveStream: true,
          dynacast: true,
          videoCaptureDefaults: {
            resolution: VideoPresets.h720.resolution,
          },
        });

        console.log('Preparing connection...');
        await room.prepareConnection(url, token);
        console.log('Connecting to room...');
        await room.connect(url, token);

        setRoom(room);
        console.log('Room connected:', room);

        console.log('Enabling local camera and microphone...');
        await room.localParticipant.enableCameraAndMicrophone();

        room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
        room.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);
        room.on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakerChange);
        room.on(RoomEvent.Disconnected, handleDisconnect);
        room.on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished);
        room.on(RoomEvent.ParticipantConnected, handleParticipantConnected);
        room.on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);

        setParticipants(Array.from(room.participants.values()) as RemoteParticipant[]);
        console.log('Participants:', participants);
      } catch (error) {
        console.error('Failed to connect to LiveKit room', error);
      }
    };

    connectToRoom();

    return () => {
      room?.disconnect();
    };
  }, []);

  const handleTrackSubscribed = (
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant
  ) => {
    console.log('Track subscribed:', track, participant);
    if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
      const element = track.attach();
      document.getElementById('media-container')?.appendChild(element);
    }
  };

  const handleTrackUnsubscribed = (
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant
  ) => {
    console.log('Track unsubscribed:', track, participant);
    track.detach();
  };

  const handleLocalTrackUnpublished = (
    publication: LocalTrackPublication,
    participant: LocalParticipant
  ) => {
    console.log('Local track unpublished:', publication, participant);
    publication.track.detach();
  };

  const handleActiveSpeakerChange = (speakers: Participant[]) => {
    console.log('Active speakers changed:', speakers);
    // Show UI indicators when participant is speaking
  };

  const handleDisconnect = () => {
    console.log('Disconnected from room');
  };

  const handleParticipantConnected = (participant: RemoteParticipant) => {
    console.log('Participant connected:', participant);
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const handleParticipantDisconnected = (participant: RemoteParticipant) => {
    console.log('Participant disconnected:', participant);
    setParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.identity !== participant.identity)
    );
  };

  return (
    <div>
      <h1>LiveKit Voice Assistant</h1>
      <div id="media-container"></div>
      <ul>
        {participants.map((participant) => (
          <li key={participant.identity}>{participant.identity}</li>
        ))}
      </ul>
    </div>
  );
};

export default LiveKitVoiceAssistant;

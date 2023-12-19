import { useState, useRef } from "react";
import "../styles/audio_recorder.css";
import api from "../api";

export default function AudioRecorder() {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mimeType = "audio/webm";
  const mediaRecorder = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const getMicrophonePermission = async () => {
    if (permission === false) {
      if ("MediaRecorder" in window) {
        try {
          const streamData = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setPermission(true);
          setStream(streamData);
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert("The MediaRecorder API is not supported in your browser.");
      }
    }
  };

  const startRecording = () => {
    if (permission === false) return;
    document.getElementById("outline-1").style.animation = "pulse 1s";
    document.getElementById("outline-1").style.animationTimingFunction =
      "ease-out";
    document.getElementById("outline-1").style.animationIterationCount =
      "infinite";
    document.getElementById("outline-2").style.animation = "pulse 1s";
    document.getElementById("outline-2").style.animationTimingFunction =
      "ease-out";
    document.getElementById("outline-2").style.animationIterationCount =
      "infinite";

    if (!stream) return;
    const media = new MediaRecorder(stream, { mimeType: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const endRecording = () => {
    if (permission === false) return;
    document.getElementById("outline-1").style.animation = "";
    document.getElementById("outline-2").style.animation = "";
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const formData = new FormData();
      formData.append("audio_file", audioBlob);
      const response = await api.post("/generate_answer", formData);
      const audioURL = URL.createObjectURL(audioBlob);
      setAudio(audioURL);
      setAudioChunks([]);
    };
  };

  return (
    <div class="recorder-button">
      <audio autoPlay src={audio}></audio>
      <div
        class="object"
        onClick={getMicrophonePermission}
        onMouseDown={startRecording}
        onMouseUp={endRecording}
      >
        <div id="outline-1"></div>
        <div id="outline-2"></div>
        <div class="button"></div>
        <div class="button" id="circlein">
          <svg
            class="mic-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 1000 1000"
            enable-background="new 0 0 1000 1000"
            space="preserve"
            style={{ fill: "#1E2D70" }}
          >
            <g>
              <path d="M500,683.8c84.6,0,153.1-68.6,153.1-153.1V163.1C653.1,78.6,584.6,10,500,10c-84.6,0-153.1,68.6-153.1,153.1v367.5C346.9,615.2,415.4,683.8,500,683.8z M714.4,438.8v91.9C714.4,649,618.4,745,500,745c-118.4,0-214.4-96-214.4-214.4v-91.9h-61.3v91.9c0,141.9,107.2,258.7,245,273.9v124.2H346.9V990h306.3v-61.3H530.6V804.5c137.8-15.2,245-132.1,245-273.9v-91.9H714.4z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

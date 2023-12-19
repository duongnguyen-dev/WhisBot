// import AudioRecorder from "./components/audio_recorder";
import "./styles/App.css";
// import api from "./api";
import Navbar from "./components/navbar";
import Chat from "./components/chat";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <AudioRecorder /> */}
        <Navbar></Navbar>
        <Chat></Chat>
      </header>
    </div>
  );
}

export default App;

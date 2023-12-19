import AudioRecorder from "./components/audio_recorder";
import "./styles/App.css";
import api from "./api";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <AudioRecorder /> */}
        <Navbar></Navbar>
      </header>
    </div>
  );
}

export default App;

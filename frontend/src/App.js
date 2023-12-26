// import AudioRecorder from "./components/audio_recorder";
import "./styles/App.css";
// import api from "./api";
import Navbar from "./components/navbar";
import Chat from "./components/chat";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <AudioRecorder /> */}
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Chat></Chat>
      </header>
    </div>
  );
}

export default App;

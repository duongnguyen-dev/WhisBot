import "../lib/fonts.css";
import "../styles/chat.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { changeFeatures } from "../states/features_state";
import api from "../api";

export default function Chat() {
  const showSidebar = useSelector((state) => state.showSidebar.value);
  const featurename = useSelector((state) => state.featureName.value);
  const [featureButtonClicked, setFeatureButtonClick] = useState(false);
  const dispatch = useDispatch();
  const [send, setSend] = useState(false);
  const [bubble, setBubble] = useState("0");
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mimeType = "audio/webm";
  const mediaRecorder = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);

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
    if (!stream) return;
    const media = new MediaRecorder(stream, { mimeType: mimeType });
    document.getElementById("textarea").value = "Bot is listening ...";
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
    document.getElementById("textarea").value = "";
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      if (send === false) {
        setSend(true);
      }

      if (bubble === "0") {
        var bot_dummy = document.getElementById("bot-dummy2-0");
      } else {
        var bot_dummy = document.getElementById(
          "bot-dummy2-" + String(parseInt(bubble) - 1)
        );
      }

      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const formdata = new FormData();
      formdata.append("data", audioBlob);
      var response = null;

      const chat_screen = document.getElementById("chat-screen");
      var loading_original = document.getElementById("loading");
      var bot_original = document.getElementById("bot-bubble");

      var loading_clone = loading_original.cloneNode(true);
      loading_clone.id = "loading-" + bubble;
      loading_clone.style.display = "flex";
      chat_screen.appendChild(loading_clone);
      chat_screen.scrollTop = chat_screen.scrollHeight;

      if (featurename === "communicate") {
        response = await api.post("/voice_chat", formdata);
      } else if (featurename === "qa") {
        response = await api.post("/voice_qa", formdata);
      }

      loading_clone.style.display = "none";
      bot_dummy.innerHTML = response.data.answer;
      bot_dummy.id = "bot-dummy2-" + bubble;
      var bot_clone = bot_original.cloneNode(true);
      bot_clone.id = "bot-bubble" + "-" + bubble;
      bot_clone.style.display = "flex";
      chat_screen.appendChild(bot_clone);
      chat_screen.scrollTop = chat_screen.scrollHeight;

      setBubble(String(parseInt(bubble) + 1));
      var msg = new SpeechSynthesisUtterance(response.data.answer);
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[0];
      window.speechSynthesis.speak(msg);
      setAudioChunks([]);
    };
  };

  const onClickFeatureButton = () => {
    if (featureButtonClicked === true && featurename === null) {
      setFeatureButtonClick(false);
      document.getElementById("selecting-features").style.background =
        "rgba(238, 233, 255, 0.5)";
      document.getElementById("selecting-features").hidden = "true";
    } else if (featureButtonClicked === true && featurename !== null) {
      setFeatureButtonClick(false);
      document.getElementById("selecting-features").hidden = "true";
    } else {
      setFeatureButtonClick(true);
      document.getElementById("selecting-features").style.background =
        "#eee9ff";
      document.getElementById("selecting-features").hidden = "false";
    }
  };

  const autoIncreaseHeight = () => {
    const textarea = document.querySelector("textarea");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const sendPrompt = async () => {
    if (send === false) {
      setSend(true);
    }

    if (bubble === "0") {
      var dummy = document.getElementById("dummy2-0");
      var bot_dummy = document.getElementById("bot-dummy2-0");
    } else {
      var dummy = document.getElementById(
        "dummy2-" + String(parseInt(bubble) - 1)
      );
      var bot_dummy = document.getElementById(
        "bot-dummy2-" + String(parseInt(bubble) - 1)
      );
    }

    const chat_screen = document.getElementById("chat-screen");
    var user_original = document.getElementById("user-bubble");
    var bot_original = document.getElementById("bot-bubble");
    var loading_original = document.getElementById("loading");

    var data = null;
    const textarea = document.querySelector("textarea");
    if (featurename === "communicate") {
      data = { prompt: textarea.value };
    } else if (featurename === "voice_q&a") {
      data = { prompt: textarea.value };
    }
    textarea.value = "";

    dummy.id = "dummy2-" + bubble;
    dummy.innerHTML = data.prompt;
    var user_clone = user_original.cloneNode(true);
    user_clone.id = "user-bubble" + "-" + bubble;
    user_clone.style.display = "flex";
    chat_screen.appendChild(user_clone);

    var loading_clone = loading_original.cloneNode(true);
    loading_clone.id = "loading-" + bubble;
    loading_clone.style.display = "flex";
    chat_screen.appendChild(loading_clone);
    chat_screen.scrollTop = chat_screen.scrollHeight;

    var response = null;
    if (featurename === "communicate") {
      response = await api.post("/normal_chat", data);
    } else if (featurename === "voice_q&a") {
      response = await api.post("/qa", data);
    }

    loading_clone.style.display = "none";

    bot_dummy.innerHTML = response.data.answer;
    bot_dummy.id = "bot-dummy2-" + bubble;
    var bot_clone = bot_original.cloneNode(true);
    bot_clone.id = "bot-bubble" + "-" + bubble;
    bot_clone.style.display = "flex";
    chat_screen.appendChild(bot_clone);
    chat_screen.scrollTop = chat_screen.scrollHeight;

    setBubble(String(parseInt(bubble) + 1));
  };

  const onClickChangeFeature = (e) => {
    if (featurename === "communicate") {
      document.getElementById("p1-container").style.background = "none";
      document.getElementById("p-container-1").style.color = "#FFF";
    } else if (featurename === "voice_q&a") {
      document.getElementById("p2-container").style.background = "none";
      document.getElementById("p-container-2").style.color = "#FFF";
    } else if (featurename === "noise_removal") {
      document.getElementById("p3-container").style.background = "none";
      document.getElementById("p-container-3").style.color = "#FFF";
    } else if (featurename === "text_to_music") {
      document.getElementById("p4-container").style.background = "none";
      document.getElementById("p-container-4").style.color = "#FFF";
    }

    if (e.target.className === "communicate-with-bot") {
      dispatch(changeFeatures("communicate"));
      document.getElementById("p1-container").style.background = "#EEE9FF";
      document.getElementById("p-container-1").style.color = "#7338F2";
      setFeatureButtonClick(false);
    } else if (e.target.className === "voice-qa") {
      dispatch(changeFeatures("voice_q&a"));
      document.getElementById("p2-container").style.background = "#EEE9FF";
      document.getElementById("p-container-2").style.color = "#7338F2";
      setFeatureButtonClick(false);
    } else if (e.target.className === "audio-noise-removal") {
      dispatch(changeFeatures("noise_removal"));
      document.getElementById("p3-container").style.background = "#EEE9FF";
      document.getElementById("p-container-3").style.color = "#7338F2";
      setFeatureButtonClick(false);
    } else {
      dispatch(changeFeatures("text_to_music"));
      document.getElementById("p4-container").style.background = "#EEE9FF";
      document.getElementById("p-container-4").style.color = "#7338F2";
      setFeatureButtonClick(false);
    }
  };

  return (
    <div
      className="chat"
      id="chat"
      style={{
        width: showSidebar === true ? "1435px" : "1720px",
        left: showSidebar === true ? "325px" : "40px",
      }}
    >
      <div className="window" id="window">
        <div
          className="chat-screen"
          id="chat-screen"
          style={{ display: send === true ? "flex" : "none" }}
        >
          <div
            className="user-bubble"
            id="user-bubble"
            style={{
              display: "none",
            }}
          >
            <div className="user-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clip-path="url(#clip0_138_331)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M40 20C40 25.3625 37.8894 30.232 34.454 33.8234C30.8254 37.6163 25.7191 39.9834 20.0597 40C20.0398 40 20.0199 40 20 40C19.9801 40 19.9602 40 19.9403 40C14.2809 39.9834 9.17446 37.6163 5.54609 33.8234C2.11045 30.232 0 25.3625 0 20C0 8.95432 8.95432 0 20 0C31.0457 0 40 8.95432 40 20ZM32.1223 30C29.2403 26.5099 24.8798 24.2856 20 24.2856C15.1202 24.2856 10.7598 26.5099 7.87757 30C10.7598 33.49 15.1202 35.7143 20 35.7143C24.8798 35.7143 29.2403 33.49 32.1223 30ZM20.0003 21.4285C23.9452 21.4285 27.1432 18.2305 27.1432 14.2856C27.1432 10.3407 23.9452 7.14277 20.0003 7.14277C16.0555 7.14277 12.8575 10.3407 12.8575 14.2856C12.8575 18.2305 16.0555 21.4285 20.0003 21.4285Z"
                    fill="#D9D9D9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_138_331">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="dummy">
                <div className="dummy1">You</div>
                <div className="dummy2" id="dummy2-0"></div>
              </div>
            </div>
          </div>
          <div className="loading-0" id="loading" style={{ display: "none" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
              className="loading-0-1"
            >
              <circle cx="3" cy="3" r="3" fill="#EEE9FF" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              className="loading-0-2"
            >
              <circle cx="3.14355" cy="3" r="3" fill="#EEE9FF" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              className="loading-0-3"
            >
              <circle cx="3.28711" cy="3" r="3" fill="#EEE9FF" />
            </svg>
          </div>
          <div
            className="bot-bubble"
            id="bot-bubble"
            style={{
              display: "none",
            }}
          >
            <div
              className="bot-content"
              style={{
                display: "flex",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle cx="20" cy="20" r="20" fill="#7338F2" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.9233 13.0751C16.8131 12.9908 16.6646 12.9762 16.5402 13.0377C16.4157 13.0991 16.337 13.2258 16.337 13.3645V20.6242C16.337 20.7371 16.3893 20.8436 16.4787 20.9126L25.9587 28.2333C26.0688 28.3183 26.2176 28.3333 26.3424 28.272C26.4672 28.2108 26.5462 28.0839 26.5462 27.9449V20.6242C26.5462 20.5108 26.4934 20.4038 26.4034 20.3348L16.9233 13.0751Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.58634 13.0751C6.47618 12.9908 6.32765 12.9762 6.20322 13.0377C6.07878 13.0991 6 13.2258 6 13.3645V20.6242C6 20.7371 6.05234 20.8436 6.14172 20.9126L15.6218 28.2333C15.7318 28.3183 15.8806 28.3333 16.0054 28.272C16.1302 28.2108 16.2093 28.0839 16.2093 27.9449V20.6242C16.2093 20.5108 16.1565 20.4038 16.0664 20.3348L6.58634 13.0751Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26.5468 13.1978C26.5468 13.0885 26.6316 13 26.7362 13H33.8105C33.8884 13 33.9584 13.0498 33.9869 13.1255C34.0154 13.2012 33.9965 13.2874 33.9394 13.3427L26.8652 20.199C26.81 20.2525 26.7296 20.2668 26.6605 20.2353C26.5914 20.2039 26.5468 20.1327 26.5468 20.054V13.1978ZM26.9257 13.3956V13.5933V19.6005L33.328 13.3956H27.1152H26.9257Z"
                  fill="white"
                />
              </svg>
              <div className="bot-dummy">
                <div className="bot-dummy1">WhisBot</div>
                <div className="bot-dummy2" id="bot-dummy2-0"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="content"
          style={{ display: send === true ? "none" : "flex" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="111"
            height="61"
            viewBox="0 0 111 61"
            fill="none"
            id="logo-content"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M43.1471 0.35303C42.712 0.0197898 42.1253 -0.0376063 41.6338 0.204971C41.1422 0.447548 40.8311 0.948037 40.8311 1.49604V30.1718C40.8311 30.6178 41.0378 31.0386 41.3909 31.3113L78.8372 60.228C79.2718 60.5636 79.8596 60.6229 80.3526 60.3809C80.8455 60.1388 81.1579 59.6376 81.1579 59.0885V30.1718C81.1579 29.7238 80.9492 29.3013 80.5934 29.0288L43.1471 0.35303Z"
              fill="#A27CF2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.31606 0.35303C1.8809 0.0197898 1.29424 -0.0376063 0.802705 0.204971C0.311173 0.447548 0 0.948037 0 1.49604V30.1718C0 30.6178 0.206746 31.0386 0.559809 31.3113L38.0061 60.228C38.4408 60.5636 39.0285 60.6229 39.5215 60.3809C40.0145 60.1388 40.3268 59.6376 40.3268 59.0885V30.1718C40.3268 29.7238 40.1182 29.3013 39.7624 29.0288L2.31606 0.35303Z"
              fill="#A27CF2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M81.1599 0.837432C81.1599 0.405977 81.495 0.0562134 81.9084 0.0562134H109.852C110.16 0.0562134 110.436 0.252867 110.548 0.551883C110.661 0.850899 110.587 1.19131 110.361 1.4099L82.4177 28.4921C82.1996 28.7036 81.8821 28.76 81.6092 28.6358C81.3363 28.5116 81.1599 28.2304 81.1599 27.9197V0.837432ZM82.6569 1.61865V2.39987V26.1282L107.946 1.61865H83.4054H82.6569Z"
              fill="#A27CF2"
            />
          </svg>
          <p id="new">What can I help you today?</p>
          <div className="warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_134_4)">
                <path
                  d="M11.2715 1.49986C11.1516 1.26585 10.9694 1.06947 10.7451 0.932346C10.5208 0.795216 10.263 0.722656 10 0.722656C9.73712 0.722656 9.47929 0.795216 9.25496 0.932346C9.03063 1.06947 8.84849 1.26585 8.72862 1.49986L0.871467 17.2141C0.761882 17.4316 0.709707 17.6734 0.719899 17.9169C0.73009 18.1601 0.80231 18.3967 0.9297 18.6043C1.05709 18.8119 1.23542 18.9834 1.44776 19.1026C1.66009 19.2219 1.89937 19.2849 2.1429 19.2856H17.8571C18.1007 19.2849 18.34 19.2219 18.5523 19.1026C18.7647 18.9834 18.943 18.8119 19.0704 18.6043C19.1977 18.3967 19.27 18.1601 19.2801 17.9169C19.2904 17.6734 19.2381 17.4316 19.1286 17.2141L11.2715 1.49986Z"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 7.14288V11.7857"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 15.7143C9.80276 15.7143 9.64286 15.5544 9.64286 15.3571C9.64286 15.1599 9.80276 15 10 15"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 15.7143C10.1972 15.7143 10.3571 15.5544 10.3571 15.3571C10.3571 15.1599 10.1972 15 10 15"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_134_4">
                  <rect width="20" height="20" rx="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>
              Your conversations are processed by human reviewers to improve the
              technologies powering <br /> WhisBot. Don’t enter anything you
              wouldn’t want reviewed or used.
            </p>
          </div>
        </div>
        <div className="prompt">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            id="file-uploaded"
          >
            <path
              d="M2.42857 19.5714H18.1429C18.9319 19.5714 19.5714 18.9319 19.5714 18.1429V2.42857C19.5714 1.63959 18.9319 1 18.1429 1H2.42857C1.63959 1 1 1.63959 1 2.42857V18.1429C1 18.9319 1.63959 19.5714 2.42857 19.5714Z"
              stroke="#EEE9FF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.78571 19.5714L13.2143 9.74277C13.3426 9.63587 13.5044 9.57733 13.6714 9.57733C13.8384 9.57733 14.0002 9.63587 14.1285 9.74277L19.5714 13.6428"
              stroke="#EEE9FF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.71427 8.85713C7.89774 8.85713 8.85713 7.89774 8.85713 6.71427C8.85713 5.5308 7.89774 4.57141 6.71427 4.57141C5.5308 4.57141 4.57141 5.5308 4.57141 6.71427C4.57141 7.89774 5.5308 8.85713 6.71427 8.85713Z"
              stroke="#EEE9FF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="prompt-container" id="prompt-container">
            <div id="selecting-features" onClick={onClickFeatureButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_138_149)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.1695 1.0444C14.4247 -0.12187 16.0854 -0.129129 16.3509 1.03486L16.3629 1.08795C16.3709 1.12381 16.3786 1.15682 16.3866 1.19127C16.6759 2.42342 17.6731 3.3649 18.9213 3.58206C20.1384 3.79382 20.1384 5.54113 18.9213 5.75289C17.6664 5.9712 16.6653 6.92159 16.382 8.16343L16.3509 8.30009C16.0854 9.46409 14.4247 9.45682 14.1695 8.29056L14.1438 8.1733C13.871 6.927 12.8713 5.96963 11.6143 5.75096C10.3993 5.53957 10.3993 3.79537 11.6143 3.584C12.8669 3.36609 13.864 2.4146 14.1409 1.17468L14.1598 1.08871L14.1695 1.0444ZM1.5781 0.2433C0.807092 0.2433 0.18206 0.868331 0.18206 1.63934V7.57253C0.18206 8.34354 0.807092 8.96857 1.5781 8.96857H7.5113C8.28232 8.96857 8.90734 8.34354 8.90734 7.57253V1.63934C8.90734 0.868331 8.28232 0.2433 7.5113 0.2433H1.5781ZM0.18206 12.4887C0.18206 11.7177 0.807092 11.0926 1.5781 11.0926H7.5113C8.28232 11.0926 8.90734 11.7177 8.90734 12.4887V18.4219C8.90734 19.1929 8.28232 19.8179 7.5113 19.8179H1.5781C0.807092 19.8179 0.18206 19.1929 0.18206 18.4219V12.4887ZM11.0314 12.4887C11.0314 11.7177 11.6564 11.0926 12.4274 11.0926H18.3606C19.1317 11.0926 19.7567 11.7177 19.7567 12.4887V18.4219C19.7567 19.1929 19.1317 19.8179 18.3606 19.8179H12.4274C11.6564 19.8179 11.0314 19.1929 11.0314 18.4219V12.4887Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_138_149">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div
                id="feature-1"
                hidden={featurename === "communicate" ? false : true}
              >
                #com
              </div>
              <div
                id="feature-2"
                hidden={featurename === "voice_q&a" ? false : true}
              >
                #vqa
              </div>
              <div
                id="feature-3"
                hidden={featurename === "noise_removal" ? false : true}
              >
                #nr
              </div>
              <div
                id="feature-4"
                hidden={featurename === "text_to_music" ? false : true}
              >
                #ttm
              </div>
            </div>
            <textarea
              placeholder={
                featurename === "text_to_music" ||
                featurename === "noise_removal"
                  ? "We do not support this feature currently."
                  : "Enter a prompt here"
              }
              rows="1"
              cols="100"
              id="textarea"
              onInput={autoIncreaseHeight}
              readOnly={
                featurename === null ||
                featurename === "text_to_music" ||
                featurename === "noise_removal"
                  ? true
                  : false
              }
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
              id="audio"
              onClick={
                featurename === null ||
                featurename === "text_to_music" ||
                featurename === "noise_removal"
                  ? null
                  : getMicrophonePermission
              }
              onMouseDown={
                featurename === null ||
                featurename === "text_to_music" ||
                featurename === "noise_removal"
                  ? null
                  : startRecording
              }
              onMouseUp={
                featurename === null ||
                featurename === "text_to_music" ||
                featurename === "noise_removal"
                  ? null
                  : endRecording
              }
            >
              <path
                d="M11.7143 8.57143C11.7143 9.51863 11.338 10.427 10.6682 11.0968C9.99845 11.7666 9.09004 12.1429 8.14284 12.1429C7.19564 12.1429 6.28723 11.7666 5.61745 11.0968C4.94768 10.427 4.57141 9.51863 4.57141 8.57143V3.57143C4.57141 2.62423 4.94768 1.71581 5.61745 1.04604C6.28723 0.376274 7.19564 0 8.14284 0C9.09004 0 9.99845 0.376274 10.6682 1.04604C11.338 1.71581 11.7143 2.62423 11.7143 3.57143V8.57143Z"
                fill="#EEE9FF"
              />
              <path
                d="M15.2857 9.28571C15.2876 10.1304 15.1226 10.9672 14.8003 11.748C14.4779 12.5288 14.0044 13.2383 13.407 13.8356C12.8097 14.4328 12.1003 14.9064 11.3195 15.2287C10.5387 15.5511 9.7019 15.7161 8.85716 15.7143H7.42859C6.58384 15.7161 5.74706 15.5511 4.96626 15.2287C4.18546 14.9064 3.47603 14.4328 2.8787 13.8356C2.28137 13.2383 1.80793 12.5288 1.48553 11.748C1.16313 10.9672 0.99813 10.1304 1.00002 9.28571"
                stroke="#EEE9FF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.14282 15.7143V18.5714"
                stroke="#EEE9FF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            id="send-prompt"
            onClick={
              featurename === null ||
              featurename === "text_to_music" ||
              featurename === "noise_removal"
                ? null
                : sendPrompt
            }
          >
            <path
              d="M8.85714 11.7143L1 8.14286L19.5714 1L12.4286 19.5714L8.85714 11.7143Z"
              stroke="#EEE9FF"
              stroke-opacity="0.2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.85718 11.7143L13.1429 7.42859"
              stroke="#EEE9FF"
              stroke-opacity="0.2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          className="features-box"
          id="features-box-id"
          hidden={featureButtonClicked === true ? false : true}
        >
          <div
            className="communicate-with-bot"
            id="p1-container"
            onClick={onClickChangeFeature}
          >
            <div className="communicate-with-bot" id="p-container-1">
              Communicate
            </div>
          </div>
          <div
            className="voice-qa"
            id="p2-container"
            onClick={onClickChangeFeature}
          >
            <div className="voice-qa" id="p-container-2">
              Voice Q&A
            </div>
          </div>
          <div
            className="audio-noise-removal"
            id="p3-container"
            onClick={onClickChangeFeature}
          >
            <div className="audio-noise-removal" id="p-container-3">
              Audio Noise Removal
            </div>
          </div>
          <div
            className="text-to-music"
            id="p4-container"
            onClick={onClickChangeFeature}
          >
            <div className="text-to-music" id="p-container-4">
              Text to music
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

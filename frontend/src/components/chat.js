import "../lib/fonts.css";
import "../styles/chat.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Chat() {
  const showSidebar = useSelector((state) => state.showSidebar.value);
  const [featureButtonClicked, setFeatureButtonClick] = useState(false);
  // const featurename = useSelector((state) => state.featurename.value);

  const onClickFeatureButton = () => {
    setFeatureButtonClick(true);
    document.getElementById("selecting-features").style.background = "#eee9ff";
  };

  return (
    <div className="chat" id="chat">
      <div
        className="window"
        id="window"
        style={{
          width: showSidebar === true ? "1435px" : "1680px",
          marginLeft: showSidebar === true ? "265px" : "20px",
        }}
      >
        <div className="content">
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
          <div className="prompt-container">
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
            </div>
            <textarea
              placeholder="Enter a prompt here"
              rows="1"
              cols="100"
              id="textarea"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
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
          hidden={featureButtonClicked === true ? false : true}
        >
          <div id="communicate-with-bot">
            <div className="p-container-1">Communicate</div>
          </div>
          <div id="voice-qa">
            <div className="p-container-2">Voice Q&A</div>
          </div>
          <div id="audio-noise-removal">
            <div className="p-container-3">Audio Noise Removal</div>
          </div>
          <div id="text-to-music">
            <div className="p-container-4">Text to music</div>
          </div>
        </div>
      </div>
    </div>
  );
}

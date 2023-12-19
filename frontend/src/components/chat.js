import "../lib/fonts.css";
import "../styles/chat.css";

export default function Chat() {
  return (
    <div className="chat">
      <div className="window" id="window">
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
          <div className="webname-container">
            <p id="website-name">WhisBot</p>
          </div>
          <div className="description-container">
            <p id="description">
              <span id="span1">WhisBot</span> is a cutting-edge{" "}
              <span id="span2">“voice chatbot”</span> that uses artificial
              intelligence (AI) to provide users with a natural and engaging{" "}
              <br />
              conversational experience.{" "}
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
            <input type="text"></input>
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
      </div>
    </div>
  );
}

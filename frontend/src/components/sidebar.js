import "../lib/fonts.css";
import "../styles/sidebar.css";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const showSidebar = useSelector((state) => state.showSidebar.value);
  return (
    <div className="sidebar" hidden={showSidebar === true ? false : true}>
      <div id="create-new-chat">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
        >
          <g clip-path="url(#clip0_134_19)">
            <path
              d="M4 0.285706V7.71428"
              stroke="#7B7E81"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M0.285706 3.97711H7.71428"
              stroke="#7B7E81"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_134_19">
              <rect width="8" height="8" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p>New Chat</p>
      </div>
    </div>
  );
}

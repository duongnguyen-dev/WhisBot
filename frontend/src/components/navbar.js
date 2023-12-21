import "../styles/navbar.css";
import "../lib/fonts.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { changeState } from "../states/sidebar_states";

export default function Navbar() {
  const dispatch = useDispatch();
  const [clicked, changeClicked] = useState(false);

  const onClickShowSidebar = () => {
    if (clicked === false) {
      changeClicked(true);
      dispatch(changeState(true));
      document.getElementById("display-sidebar").style.background = "#a27cf2";
    } else {
      changeClicked(false);
      document.getElementById("display-sidebar").style.background = "none";
      dispatch(changeState(false));
    }
    console.log(clicked);
  };

  return (
    <div className="navbar" id="navbar">
      <div
        className="display-sidebar"
        id="display-sidebar"
        onClick={onClickShowSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          id="display-sidebar-icon"
        >
          <path
            d="M1 16.41H21"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1 1H21"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1 8.705H21"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="26"
          viewBox="0 0 48 26"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.3605 0.384301C18.1753 0.242496 17.9257 0.218072 17.7165 0.321297C17.5074 0.424521 17.3749 0.637495 17.3749 0.870686V13.0731C17.3749 13.2629 17.4629 13.442 17.6132 13.558L33.5478 25.863C33.7327 26.0058 33.9828 26.0311 34.1926 25.9281C34.4024 25.8251 34.5353 25.6118 34.5353 25.3781V13.0731C34.5353 12.8825 34.4465 12.7027 34.2951 12.5868L18.3605 0.384301Z"
            fill="#A27CF2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.985558 0.384285C0.800382 0.242481 0.550739 0.218057 0.341577 0.321281C0.132414 0.424506 0 0.63748 0 0.870671V13.0731C0 13.2629 0.0879769 13.442 0.238216 13.558L16.1728 25.863C16.3578 26.0058 16.6079 26.0311 16.8177 25.9281C17.0274 25.8251 17.1603 25.6118 17.1603 25.3781V13.0731C17.1603 12.8825 17.0716 12.7027 16.9202 12.5867L0.985558 0.384285Z"
            fill="#A27CF2"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M34.5361 0.590429C34.5361 0.406831 34.6787 0.257996 34.8546 0.257996H46.7454C46.8764 0.257996 46.994 0.341678 47.0419 0.468919C47.0898 0.59616 47.0581 0.741017 46.9622 0.834034L35.0714 12.3584C34.9785 12.4484 34.8434 12.4724 34.7273 12.4195C34.6112 12.3667 34.5361 12.247 34.5361 12.1148V0.590429ZM35.1731 0.922863V1.2553V11.3524L45.9344 0.922863H35.4916H35.1731Z"
            fill="#A27CF2"
          />
        </svg>
        <p className="web-name">WhisBot</p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        id="history"
      >
        <g clip-path="url(#clip0_71_71)">
          <path
            d="M10 5V10.7143L13.7143 12.5714"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.0373 12.1429C18.0699 16.2381 14.3909 19.2857 10 19.2857C4.87165 19.2857 0.714294 15.1284 0.714294 9.99999C0.714294 4.87164 4.87165 0.714279 10 0.714279C13.5825 0.714279 16.6912 2.74301 18.2397 5.71428"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M19.2857 2.85713V6.42856H15.7143"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_71_71">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        id="infor"
      >
        <g clip-path="url(#clip0_71_76)">
          <path
            d="M10 18.5746C15.1284 18.5746 19.2857 14.5706 19.2857 9.63125C19.2857 4.692 15.1284 0.687943 10 0.687943C4.87165 0.687943 0.714294 4.692 0.714294 9.63125C0.714294 14.5706 4.87165 18.5746 10 18.5746Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.85718 13.7589H12.1429"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.99998 13.7589V8.9433H8.57141"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 5.84754C9.80278 5.84754 9.64288 5.69353 9.64288 5.50357C9.64288 5.3136 9.80278 5.15959 10 5.15959"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 5.84754C10.1972 5.84754 10.3571 5.69353 10.3571 5.50357C10.3571 5.3136 10.1972 5.15959 10 5.15959"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_71_76">
            <rect width="20" height="19.2625" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        id="settings"
      >
        <g clip-path="url(#clip0_71_66)">
          <path
            d="M7.93846 3.21428L8.59114 1.62856C8.70121 1.36008 8.89487 1.12915 9.14675 0.966011C9.39864 0.802871 9.69699 0.715129 10.0027 0.714279H11.2474C11.5531 0.715129 11.8515 0.802871 12.1034 0.966011C12.3553 1.12915 12.5489 1.36008 12.659 1.62856L13.3117 3.21428L15.5277 4.41428L17.3188 4.15714C17.617 4.11904 17.9206 4.16524 18.1909 4.28988C18.4611 4.41452 18.6859 4.61197 18.8366 4.85714L19.4438 5.85714C19.5993 6.10621 19.6711 6.39382 19.6494 6.68202C19.6277 6.97022 19.5137 7.24546 19.3223 7.47142L18.2143 8.79999V11.2L19.3527 12.5286C19.5441 12.7545 19.6581 13.0298 19.6798 13.318C19.7015 13.6062 19.6297 13.8938 19.4741 14.1429L18.867 15.1429C18.7162 15.388 18.4914 15.5854 18.2213 15.7101C17.9509 15.8347 17.6474 15.881 17.3491 15.8429L15.558 15.5857L13.342 16.7857L12.6893 18.3714C12.5793 18.6399 12.3856 18.8709 12.1337 19.034C11.8819 19.1971 11.5835 19.2849 11.2777 19.2857H10.0027C9.69699 19.2849 9.39864 19.1971 9.14675 19.034C8.89487 18.8709 8.70121 18.6399 8.59114 18.3714L7.93846 16.7857L5.72239 15.5857L3.93131 15.8429C3.63309 15.881 3.32955 15.8347 3.05928 15.7101C2.78902 15.5854 2.56423 15.388 2.41346 15.1429L1.80631 14.1429C1.65073 13.8938 1.57906 13.6062 1.60074 13.318C1.62241 13.0298 1.73643 12.7545 1.92774 12.5286L3.03578 11.2V8.79999L1.89739 7.47142C1.70608 7.24546 1.59205 6.97022 1.57038 6.68202C1.5487 6.39382 1.62038 6.10621 1.77596 5.85714L2.3831 4.85714C2.53387 4.61197 2.75866 4.41452 3.02892 4.28988C3.29919 4.16524 3.60273 4.11904 3.90096 4.15714L5.69203 4.41428L7.93846 3.21428ZM7.58935 9.99999C7.58935 10.5651 7.76739 11.1175 8.10096 11.5873C8.43454 12.0572 8.90864 12.4234 9.46334 12.6397C10.0181 12.8559 10.6284 12.9125 11.2173 12.8022C11.8062 12.692 12.3471 12.4199 12.7716 12.0203C13.1962 11.6207 13.4853 11.1116 13.6024 10.5574C13.7196 10.0032 13.6595 9.42869 13.4297 8.90661C13.1999 8.38454 12.8108 7.93831 12.3116 7.62436C11.8124 7.31042 11.2255 7.14285 10.6251 7.14285C9.81995 7.14285 9.0478 7.44387 8.4785 7.97969C7.90919 8.51551 7.58935 9.24224 7.58935 9.99999Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <ellipse cx="10.625" cy="10" rx="3.54167" ry="3.33333" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_71_66">
            <rect width="21.25" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        id="menu"
      >
        <circle cx="2.22222" cy="2.22222" r="2.22222" fill="white" />
        <circle cx="9.99999" cy="2.22222" r="2.22222" fill="white" />
        <circle cx="17.7778" cy="2.22222" r="2.22222" fill="white" />
        <circle cx="2.22222" cy="9.99999" r="2.22222" fill="white" />
        <circle cx="9.99999" cy="9.99999" r="2.22222" fill="white" />
        <circle cx="17.7778" cy="9.99999" r="2.22222" fill="white" />
        <circle cx="2.22222" cy="17.7778" r="2.22222" fill="white" />
        <circle cx="9.99999" cy="17.7778" r="2.22222" fill="white" />
        <circle cx="17.7778" cy="17.7778" r="2.22222" fill="white" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        id="user-login"
      >
        <g clip-path="url(#clip0_138_757)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M40 20C40 25.3625 37.8894 30.232 34.454 33.8234C30.8254 37.6163 25.7191 39.9834 20.0597 40C20.0398 40 20.0199 40 20 40C19.9801 40 19.9602 40 19.9403 40C14.2809 39.9834 9.17446 37.6163 5.54609 33.8234C2.11045 30.232 0 25.3625 0 20C0 8.95432 8.95432 0 20 0C31.0457 0 40 8.95432 40 20ZM32.1223 30C29.2403 26.5099 24.8798 24.2856 20 24.2856C15.1202 24.2856 10.7598 26.5099 7.87757 30C10.7598 33.49 15.1202 35.7143 20 35.7143C24.8798 35.7143 29.2403 33.49 32.1223 30ZM20.0003 21.4285C23.9452 21.4285 27.1432 18.2305 27.1432 14.2856C27.1432 10.3407 23.9452 7.14277 20.0003 7.14277C16.0555 7.14277 12.8575 10.3407 12.8575 14.2856C12.8575 18.2305 16.0555 21.4285 20.0003 21.4285Z"
            fill="#D9D9D9"
          />
        </g>
        <defs>
          <clipPath id="clip0_138_757">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

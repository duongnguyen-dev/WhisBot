import "../lib/fonts.css";
import "../styles/sidebar.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";

export default function Sidebar() {
  const showSidebar = useSelector((state) => state.showSidebar.value);
  const [fileNumber, setFileNumber] = useState("0");
  const uploadFileOnClick = () => {
    document.getElementById("document-uploader-button").click();
  };

  const uploadFileOnChange = async (e) => {
    const formatdata = new FormData();
    const dataBlob = new Blob([e.target.files[0]]);
    formatdata.append("file", dataBlob, e.target.files[0].name);
    await api.post("/upload_file", formatdata, {
      params: {
        filename: e.target.files[0].name,
      },
    });

    const documentDatabase = document.getElementById("documents-library");
    const documentNumberOrg = document.getElementById("document-number");
    let documentNumberContent = null;

    if (fileNumber === "0") {
      documentNumberContent = document.getElementById(
        "document-number-content"
      );
    } else {
      documentNumberContent = document.getElementById(
        "document-number-content-" + String(parseInt(fileNumber) - 1)
      );
    }
    documentNumberContent.id = "document-number-content-" + fileNumber;
    documentNumberContent.innerHTML = e.target.files[0].name;
    var documentNumberClone = documentNumberOrg.cloneNode(true);
    documentNumberClone.id = "document-number-" + fileNumber;
    documentNumberClone.style.display = "flex";
    documentDatabase.appendChild(documentNumberClone);
    setFileNumber(`${parseInt(fileNumber) + 1}`);
  };

  return (
    <div
      className="sidebar"
      style={{ display: showSidebar === true ? "flex" : "none" }}
    >
      <div
        id="new-chat"
        onClick={async () => {
          await api.post("/restart_db");
          document.location.reload();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
        >
          <g clip-path="url(#clip0_137_102)">
            <path
              d="M4 0.285645V7.71422"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M0.285706 3.97705H7.71428"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_137_102">
              <rect width="8" height="8" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p>New chat</p>
      </div>
      <div className="document-uploader-text">Document Uploader</div>
      <div
        id="document-uploader"
        style={{ display: showSidebar === true ? "flex" : "none" }}
        onClick={uploadFileOnClick}
        onChange={uploadFileOnChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="35"
          viewBox="0 0 34 35"
          fill="none"
        >
          <path
            d="M17.2091 15.7403C17.1842 15.7086 17.1525 15.6829 17.1162 15.6653C17.08 15.6476 17.0402 15.6384 16.9999 15.6384C16.9596 15.6384 16.9198 15.6476 16.8836 15.6653C16.8473 15.6829 16.8156 15.7086 16.7907 15.7403L13.072 20.4452C13.0413 20.4844 13.0223 20.5314 13.0171 20.5808C13.0119 20.6303 13.0207 20.6802 13.0425 20.7249C13.0643 20.7695 13.0983 20.8072 13.1405 20.8335C13.1827 20.8598 13.2314 20.8737 13.2812 20.8735H15.7349V28.922C15.7349 29.0681 15.8544 29.1876 16.0005 29.1876H17.9927C18.1388 29.1876 18.2583 29.0681 18.2583 28.922V20.8769H20.7187C20.9411 20.8769 21.064 20.6212 20.9278 20.4485L17.2091 15.7403Z"
            fill="black"
          />
          <path
            d="M26.941 12.6756C25.4203 8.66465 21.5455 5.8125 17.0066 5.8125C12.4678 5.8125 8.59297 8.66133 7.07227 12.6723C4.22676 13.4193 2.125 16.0125 2.125 19.0938C2.125 22.7627 5.09668 25.7344 8.7623 25.7344H10.0938C10.2398 25.7344 10.3594 25.6148 10.3594 25.4688V23.4766C10.3594 23.3305 10.2398 23.2109 10.0938 23.2109H8.7623C7.64336 23.2109 6.59082 22.766 5.80723 21.9592C5.02695 21.1557 4.61191 20.0732 4.64844 18.951C4.67832 18.0744 4.97715 17.251 5.51836 16.557C6.07285 15.8498 6.8498 15.3352 7.71309 15.1061L8.97148 14.7773L9.43301 13.5621C9.71855 12.8051 10.117 12.0979 10.6184 11.457C11.1133 10.8219 11.6996 10.2635 12.3582 9.8002C13.7229 8.84063 15.3299 8.33262 17.0066 8.33262C18.6834 8.33262 20.2904 8.84063 21.6551 9.8002C22.3158 10.265 22.9002 10.8229 23.3949 11.457C23.8963 12.0979 24.2947 12.8084 24.5803 13.5621L25.0385 14.774L26.2936 15.1061C28.0932 15.5908 29.3516 17.2277 29.3516 19.0938C29.3516 20.1928 28.9232 21.2287 28.1463 22.0057C27.7653 22.3889 27.312 22.6928 26.8127 22.8997C26.3135 23.1066 25.7781 23.2124 25.2377 23.2109H23.9062C23.7602 23.2109 23.6406 23.3305 23.6406 23.4766V25.4688C23.6406 25.6148 23.7602 25.7344 23.9062 25.7344H25.2377C28.9033 25.7344 31.875 22.7627 31.875 19.0938C31.875 16.0158 29.7799 13.426 26.941 12.6756Z"
            fill="black"
          />
        </svg>
        <div className="document-uploader-text-1">Drag and Drop Here</div>
        <div className="document-uploader-text-2">or</div>
        <div className="document-uploader-text-3">
          <p>Select file</p>
        </div>
        <input hidden={true} id="document-uploader-button" type="file"></input>
      </div>
      <div
        id="qa-documents-database"
        hidden={showSidebar === true ? false : true}
      >
        <p className="qa-documents-database-text">Q&A Documents Database</p>
        <div id="documents-library">
          <div
            className="document-number"
            id="document-number"
            style={{ display: "none" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              className="documents-library-icon-1"
            >
              <path
                d="M14.276 4.30371L10.9135 1.15137C10.8197 1.06348 10.6932 1.01367 10.5604 1.01367H3.92285C3.64629 1.01367 3.42285 1.22314 3.42285 1.48242V13.6699C3.42285 13.9292 3.64629 14.1387 3.92285 14.1387H13.9229C14.1994 14.1387 14.4229 13.9292 14.4229 13.6699V4.63623C14.4229 4.51172 14.3697 4.3916 14.276 4.30371ZM13.2697 4.85156H10.3291V2.09473L13.2697 4.85156ZM13.2979 13.084H4.54785V2.06836H9.2666V5.23242C9.2666 5.39559 9.33574 5.55208 9.45881 5.66746C9.58188 5.78284 9.7488 5.84766 9.92285 5.84766H13.2979V13.084Z"
                fill="#D9D9D9"
                fill-opacity="0.78"
              />
            </svg>
            <p id="document-number-content"></p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              className="documents-library-icon-2"
            >
              <path
                d="M6.47965 1.40234C6.89868 1.40232 7.30183 1.56263 7.60641 1.85041C7.91099 2.13819 8.0939 2.53161 8.11762 2.94996L8.12014 3.04284H10.7702C10.8661 3.04287 10.9584 3.07931 11.0285 3.14479C11.0986 3.21027 11.1412 3.29992 11.1478 3.39561C11.1543 3.49131 11.1243 3.58591 11.0637 3.66032C11.0032 3.73473 10.9167 3.78338 10.8217 3.79646L10.7702 3.79999H10.3684L9.72228 10.3721C9.68991 10.6997 9.54213 11.0052 9.30533 11.2339C9.06853 11.4627 8.75814 11.5998 8.42957 11.6209L8.34073 11.6239H4.61857C4.28919 11.6239 3.97055 11.5067 3.71958 11.2934C3.46862 11.0801 3.30169 10.7845 3.24863 10.4594L3.23702 10.3716L2.59041 3.79999H2.18912C2.09764 3.79999 2.00925 3.76686 1.94031 3.70673C1.87136 3.6466 1.82652 3.56353 1.81408 3.4729L1.81055 3.42142C1.81055 3.32993 1.84368 3.24155 1.90381 3.1726C1.96394 3.10365 2.047 3.05881 2.13764 3.04637L2.18912 3.04284H4.83915C4.83915 2.60775 5.01199 2.19049 5.31964 1.88283C5.6273 1.57518 6.04456 1.40234 6.47965 1.40234ZM9.6077 3.79999H3.3511L3.99064 10.2974C4.0048 10.4423 4.06869 10.5779 4.17146 10.6812C4.27423 10.7844 4.40955 10.8489 4.55446 10.8637L4.61857 10.8667H8.34073C8.64359 10.8667 8.90052 10.6522 8.95907 10.361L8.96916 10.2974L9.60719 3.79999H9.6077ZM7.36299 5.1881C7.45448 5.18811 7.54286 5.22124 7.61181 5.28137C7.68075 5.3415 7.72559 5.42456 7.73804 5.51519L7.74157 5.56668V9.10005C7.74154 9.19597 7.7051 9.2883 7.63962 9.35839C7.57414 9.42848 7.48449 9.4711 7.3888 9.47763C7.2931 9.48417 7.19849 9.45414 7.12409 9.39361C7.04968 9.33308 7.00102 9.24656 6.98795 9.15154L6.98442 9.10005V5.56668C6.98442 5.46627 7.0243 5.36998 7.0953 5.29899C7.1663 5.22799 7.26259 5.1881 7.36299 5.1881ZM5.59631 5.1881C5.68779 5.18811 5.77618 5.22124 5.84512 5.28137C5.91407 5.3415 5.95891 5.42456 5.97135 5.51519L5.97488 5.56668V9.10005C5.97485 9.19597 5.93841 9.2883 5.87293 9.35839C5.80745 9.42848 5.7178 9.4711 5.62211 9.47763C5.52641 9.48417 5.43181 9.45414 5.3574 9.39361C5.28299 9.33308 5.23434 9.24656 5.22126 9.15154L5.21773 9.10005V5.56668C5.21773 5.46627 5.25762 5.36998 5.32861 5.29899C5.39961 5.22799 5.4959 5.1881 5.59631 5.1881ZM6.47965 2.1595C6.25796 2.1595 6.04438 2.24287 5.8813 2.39304C5.71823 2.54321 5.61758 2.74922 5.59933 2.97015L5.59631 3.04284H7.36299C7.36299 2.80856 7.26993 2.58388 7.10427 2.41822C6.93861 2.25256 6.71393 2.1595 6.47965 2.1595Z"
                fill="#D9D9D9"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// config/buttons.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faVideo,
  faSignOutAlt,
  faFileVideo,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const navButtons = [
  {
    label: "Home",
    path: "/Home",
    icon: <FontAwesomeIcon icon={faHome} />
  },
  {
    label: "Live Video Streams",
    path: "/liveVideo",
    icon: <FontAwesomeIcon icon={faVideo} />
  },
  {
    label: "Saved Video Streams",
    path: "/SavedVideo",
    icon: <FontAwesomeIcon icon={faFileVideo} />
  },
  {
    label: "Log Out",
    path: "/index",
    icon: <FontAwesomeIcon icon={faSignOutAlt} />
  },
  {
  
    path: "/Profile",
    icon: <FontAwesomeIcon icon={faUser} />
  }
];

export default navButtons;
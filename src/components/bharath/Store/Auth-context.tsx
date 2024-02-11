import React from "react";
import { Fragment, ReactFragment, ReactPortal, useState } from "react";
type AuthContextObj = {
  overlay: boolean;
  setOverlay: () => void;
  isLoadingValue: boolean;
  setisLoading: (e: boolean) => void;
  isValidValue: boolean;
  setIsValid: (e: boolean) => void;
  token: boolean;
  X_token: string;
  setToken: (e: string) => void;
  id: string;
  sendTime: string;
  setSendTime: (e: string) => void;

  setId: (e: string) => void;
  setMesage: (
    to: string,
    cc: string,
    bcc: string,
    subjec: string,
    text: string
  ) => void;
  SentOverlay: string;
  setSentOverlay: (e: string) => void;
  messageValue: boolean;
  setMessageValue: () => void;
  files: any;
  setFiles: (e: any) => void;
  sideButtonValue: boolean;
  setSideButton: () => void;

};
export const AuthContext = React.createContext<AuthContextObj>({
  overlay: true,
  setOverlay: () => {},
  isLoadingValue: false,
  setisLoading: (e: boolean) => {},
  isValidValue: true,
  setIsValid: (e: boolean) => {},
  token: false,
  X_token: "",
  setToken: (e: string) => {},
  id: "",
  setId: (e: string) => {},
  SentOverlay: "0",
  setSentOverlay: (e = "") => {},
  sendTime: "",
  setSendTime: (e: string) => {},
  setMesage: (
    to: string,
    cc: string,
    bcc: string,
    subjec: string,
    text: string
  ) => {},
  messageValue: false,
  setMessageValue: () => {},
  files: [],
  setFiles: (e: []) => {},
  sideButtonValue: false,
  setSideButton: () => {},

});
export const AuthContextProvider = (props: {
  children: boolean | ReactFragment | ReactPortal | null | undefined;
}) => {
  const [stateOverlay, setOverlay] = useState(false);
  const [stateIsloading, setIsLoading] = useState(false);
  const [stateIsValid, setIsValid] = useState(true);
  const [stateId, setId] = useState("");
  const [stateToken, setToken] = useState("");
  const [sendTimeValue, setSendTime] = useState("");
  const [stateSentOverlay, setSentOverlay] = useState("0");
  const [statemessage, setMessage] = useState(false);
  const [stateFiles, setFiles] = useState([]);
  const [stateSidebuttonValue, setSidebuttonValue] = useState(false);
  const getToken = !!stateToken;

  const overlayHandler = () => {
    setOverlay(!stateOverlay);
  };
  const isLoadingHandler = (e: boolean) => {
    setIsLoading(e);
  };
  const isValidHandler = (e: boolean) => {
    setIsValid(e);
  };
  const tokenHandler = (e: string) => {
    setToken(e);
  };
  const idHandler = (e: string) => {
    setId(e);
  };
  const messageHandler = () => {
    console.log("6666");
    setMessage(!statemessage);
  };
  const fileUploadHandler = (e: any) => {
    setFiles(e);
  };
  const sendTime = (e: string) => {
    setSendTime(e);
  };
  const setMessageHandler = (
    to: string,
    cc: string,
    bcc: string,
    subject: string,
    text: string
  ) => {
    if (to.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/) && subject !== "") {
      isLoadingHandler(true);
      const data = {
        textMessage: text,
        files: stateFiles,
      };
      const presentDate = new Date();
      fetch(`https://mail.aniworks.live/mapi/users/${stateId}/submit`, {
        method: "POST",
        body: JSON.stringify({
          from: {
            address: "user40@aniworks.live",
            name: "Mr superuser",
          },
          to: [
            {
              address: to,
              name: "SwisMail Support",
            },
          ],
          subject: subject,
          text: data.textMessage,
          html: "hi whats up in italic",
          sendTime:
            sendTimeValue === ""
              ? presentDate.getFullYear() +
                "-" +
                String(presentDate.getMonth() + 1).padStart(2, "0") +
                "-" +
                presentDate.getDate() +
                "T" +
                presentDate.getHours() +
                ":" +
                presentDate.getMinutes() +
                ":" +
                "00Z"
              : sendTimeValue,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": stateToken,
        },
      })
        .then((response) => {
          isLoadingHandler(false);
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then(() => {
              let errorMessage = "send failed!";
              throw new Error(errorMessage);
            });
          }
        })
        .then((response) => {
          messageHandler();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!to.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/)) {
      setSentOverlay("1");
    } else if (subject === "") {
      setSentOverlay("2");
    }
  };
  const sentOverlayHandler = (e: string) => {
    setSentOverlay(e);
  };
  const setsetSideButton = () => {
    setSidebuttonValue(!stateSidebuttonValue);
  };

  const contextValue: AuthContextObj = {
    overlay: stateOverlay,
    setOverlay: overlayHandler,
    isLoadingValue: stateIsloading,
    setisLoading: isLoadingHandler,
    isValidValue: stateIsValid,
    setIsValid: isValidHandler,
    token: getToken,
    X_token: stateToken,
    setToken: tokenHandler,
    setMesage: setMessageHandler,
    id: stateId,
    setId: setId,
    SentOverlay: stateSentOverlay,
    setSentOverlay: sentOverlayHandler,
    messageValue: statemessage,
    setMessageValue: messageHandler,
    files: stateFiles,
    setFiles: fileUploadHandler,
    sideButtonValue: stateSidebuttonValue,
    setSideButton: setsetSideButton,
    sendTime: sendTimeValue,
    setSendTime: sendTime,

  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

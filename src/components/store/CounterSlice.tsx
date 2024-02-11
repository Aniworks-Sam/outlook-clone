import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "showMail",
  initialState: {
    value: false,
    composeValue: false,
    openValue: false,
    overlayValue: false,
    isLoadingValue: false,
    userName: localStorage.getItem("userName"),
    tokenValue: localStorage.getItem("token"),
    id: localStorage.getItem("id"),
    mailBoxId: localStorage.getItem("mailId"),
    sendTimeValue: "",
    messageValue: false,
    SentOverlay: "0",
    mailValue: false,
    maildata: {},
    address: "",
    name: "",
    moveData: [],
    fetchData: [],
    showReply: false,
    showFrwd: false,
  },
  reducers: {
    showMail1: (state) => {
      state.composeValue = !state.composeValue;
      state.value = true;
      state.mailValue = false;
    },
    burgerOpen: (state) => {
      state.openValue = !state.openValue;
    },
    tokenHandler: (state: any, action) => {
      state.tokenValue = action.payload;
      localStorage.setItem("token", action.payload);
    },
    overlayOpenr: (state) => {
      state.overlayValue = !state.overlayValue;
    },
    setIsLoading: (state) => {
      state.isLoadingValue = !state.isLoadingValue;
    },
    setId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem("id", action.payload);
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userName", action.payload);
    },
    setMailBoxId: (state, action) => {
      state.mailBoxId = action.payload;
      localStorage.setItem("mailId", action.payload);
    },
    setSendTime: (state, action) => {
      state.sendTimeValue = action.payload;
      console.log(action.payload);
    },
    setMessageValue: (state) => {
      state.messageValue = !state.messageValue;
    },
    setSentOverlay: (state, action) => {
      state.SentOverlay = action.payload;
    },
    setMailValue: (state) => {
      state.mailValue = true;
      state.value = true;
      state.composeValue = false;
    },
    mailData: (state, action) => {
      state.maildata = action.payload;
    },
    address: (state, action) => {
      state.address = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
      console.log(action.payload);
    },
    setMoveData: (state, action) => {
      state.moveData = action.payload;
      console.log(action.payload);
    },
    setFetchData: (state, action) => {
      state.fetchData = action.payload;
    },
    setShowReply: (state, action) => {
      state.showReply = action.payload;
    },
    setShowFrwd: (state, action) => {
      state.showFrwd = action.payload;
    },
  },
});

export const {
  showMail1,
  setUserName,
  burgerOpen,
  overlayOpenr,
  setIsLoading,
  setId,
  setSendTime,
  tokenHandler,
  setMessageValue,
  setSentOverlay,
  setMailBoxId,
  setMailValue,
  mailData,
  address,
  setName,
  setMoveData,
  setFetchData,
  setShowReply,
  setShowFrwd,
} = counterSlice.actions;
export default counterSlice.reducer;

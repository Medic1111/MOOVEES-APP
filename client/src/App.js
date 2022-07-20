import React, { useState, useContext } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { uiCtx } from "./store/ui-ctx";
import MainPage from "./components/MainPage/MainPage";
import Credentials from "./components/Credentials/Credentials";

function App() {
  const uiCtxMgr = useContext(uiCtx);

  return (
    <div className="App">
      <Header />
      {uiCtxMgr.isLoggedIn ? <MainPage /> : <Credentials />}
      <Footer />
    </div>
  );
}

export default App;

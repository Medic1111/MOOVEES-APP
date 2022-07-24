import React, { useContext } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { uiCtx } from "./store/ui-ctx";
import MainPage from "./components/MainPage/MainPage";
import Credentials from "./components/Credentials/Credentials";
import DetailModal from "./components/DetailModal/DetailModal";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const uiCtxMgr = useContext(uiCtx);

  return (
    <div className="App">
      {uiCtxMgr.isLoading && <Spinner />}
      {uiCtxMgr.showModal && <DetailModal />}
      <Header />
      {uiCtxMgr.isLoggedIn ? <MainPage /> : <Credentials />}
      <Footer />
    </div>
  );
}

export default App;

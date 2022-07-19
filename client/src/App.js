import "./App.css";
import React, { useState } from "react";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Wrapper/Wrapper";
import WishList from "./components/WishList/WishList";
import Watched from "./components/Watched/Watched";
import DefaultBanner from "./components/DefaultBanner/DefaultBanner";

function App() {
  const [data, setData] = useState([]);
  const [watched, setWatched] = useState([]);
  const [wish, setWish] = useState([]);
  return (
    <div className="App">
      <Header />
      <Form setData={setData} />
      <Wrapper>
        {data.length === 0 ? (
          <DefaultBanner />
        ) : (
          <List data={data} setWatched={setWatched} setWish={setWish} />
        )}
        {wish.length === 0 || (
          <WishList wish={wish} setWatched={setWatched} setWish={setWish} />
        )}

        {watched.length === 0 || (
          <Watched watched={watched} setWatched={setWatched} />
        )}
      </Wrapper>
      <Footer />
    </div>
  );
}

export default App;

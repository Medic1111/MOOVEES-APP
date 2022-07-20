import { createContext, useState } from "react";

export const listsCtx = createContext({
  data: [],
  setData: () => {},
  watched: [],
  setWatched: () => {},
  wish: [],
  setWish: () => {},
});

const ListsProvider = (props) => {
  const [data, setData] = useState([]);
  const [watched, setWatched] = useState([]);
  const [wish, setWish] = useState([]);

  return (
    <listsCtx.Provider
      value={{
        data,
        setData,
        watched,
        setWatched,
        wish,
        setWish,
      }}
    >
      {props.children}
    </listsCtx.Provider>
  );
};
export default ListsProvider;

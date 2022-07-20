import { createContext, useState } from "react";

export const detailCtx = createContext({
  detailInfo: {},
  setDetailInfo: () => {},
});

const DetailProvider = (props) => {
  const [detailInfo, setDetailInfo] = useState({});

  return (
    <detailCtx.Provider
      value={{
        detailInfo,
        setDetailInfo,
      }}
    >
      {props.children}
    </detailCtx.Provider>
  );
};

export default DetailProvider;

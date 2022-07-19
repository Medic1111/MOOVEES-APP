const Stars = ({ item, index, setRate, rate }) => {
  const addRateHandler = () => {
    let howMany = index + 1;
    let filledStar = "⭐︎";
    let filledArr = [];
    for (let i = 0; i < howMany; i++) {
      filledArr.push(filledStar);
    }
    if (filledArr.length < 5) {
      let emptyStar = "☆";
      let missing = 5 - filledArr.length;
      for (let i = 0; i < missing; i++) {
        filledArr.push(emptyStar);
      }
    }
    setRate(filledArr);
  };

  return (
    <span onClick={addRateHandler} value={index}>
      {item}
    </span>
  );
};

export default Stars;

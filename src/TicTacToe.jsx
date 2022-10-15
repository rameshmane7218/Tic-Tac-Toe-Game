import React, { useState } from "react";
import styles from "./TicTacToe.module.css";
const TicTacToe = () => {
  const [data, setData] = useState(new Array(9).fill("-"));
  const [turn, setTurn] = useState(false);
  const [winner, setWinner] = useState("");
  const [disableAll, setDisableAll] = useState(false);

  const handleSelect = (el, i) => {
    if (el === "-") {
      let selected = turn ? "X" : "O";
      data[i] = selected;
      setData([...data]);
      let ans = checkWinner();
      if (ans) {
        setWinner(ans);
        setDisableAll(true);
        return;
      }
      if (!data.includes("-")) {
        setWinner("draw");
        setDisableAll(true);
        return;
      }

      setTurn(!turn);
    }
  };
  const checkWinner = () => {
    // console.log("winner");
    if (checkFor("O")) {
      return "Player 1";
    }
    if (checkFor("X")) {
      return "Player 2";
    }

    return false;
  };

  const checkFor = (value) => {
    /**
     * Horizontal check
     * @return {boolean}
     */
    if (
      (data[0] === value && data[1] === value && data[2] === value) ||
      (data[3] === value && data[4] === value && data[5] === value) ||
      (data[6] === value && data[7] === value && data[8] === value)
    ) {
      return true;
    }
    /**
     * Vertical check
     * @return {boolean}
     */
    if (
      (data[0] === value && data[3] === value && data[6] === value) ||
      (data[1] === value && data[4] === value && data[7] === value) ||
      (data[2] === value && data[5] === value && data[8] === value)
    ) {
      return true;
    }
    /**
     * Diagonal check
     * @return {boolean}
     */
    if (
      (data[0] === value && data[4] === value && data[8] === value) ||
      (data[6] === value && data[4] === value && data[2] === value)
    ) {
      return true;
    }

    return false;
  };
  const reset = () => {
    setData([...new Array(9).fill("-")]);
    setTurn(false);
    setWinner("");
    setDisableAll(false);
  };
  return (
    <div>
      <div className={styles.playersDiv}>
        <h4>Player 1: O</h4>
        <h4>Player 2: X</h4>
      </div>
      <div style={{ display: winner !== "" ? "block" : "none" }}>
        {winner !== "draw" && <h3>Winner is {winner}</h3>}
        {winner === "draw" && <h3>{winner}</h3>}
      </div>
      <div className={styles.gridTable}>
        {data &&
          data.map((el, i) => (
            <button
              key={i}
              disabled={el !== "-" || disableAll}
              style={{ cursor: el !== "-" ? "not-allowed" : "pointer" }}
              onClick={() => handleSelect(el, i)}
            >
              {el}
            </button>
          ))}
      </div>
      <button className={styles.resetBtn} onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export { TicTacToe };

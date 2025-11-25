import React from "react";
import { useState } from "react";
import Card from "../components/Card";
import { useCallback } from "react";
import "../assets/css/cardLayout.css";

function CardLayout(props) {
  //화면에 나타낼 5장
  const [cardList, setCardList] = useState([]);
  //NPC2장
  const [comList, setComList] = useState([]);
  //결과를 넣을 변수
  const [winner, setWinner] = useState("");
  //npc카드 합
  const [comResult, setComResult] = useState(0);
  //플레이어
  const [myResult, setMyResult] = useState(0);
    //플레이어
  const [startGame, setStartGame] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  //선택 불가
  const [selectedDisabled, setSelectedDisabled] = useState(false);
  //버튼 사용 가능 유무
  //disabled에 들어갈 변수의 초기값을 false로 줌으로써
  //처음 로딩 및 게임시작시 시작 버튼은 활성화
  //선택버튼은 !btnDisabled의 값을 주어 그 반대의 값인 true를 가지므로
  //disabled가 활성화된다.
  const [btnDisabled, setBtnDisabled] = useState(false);

  //카드 생성
  const makeCard = (count) => {
    //_는 앞에있는 인자 생략
    const cardSet = Array.from({ length: 20 }, (_, index) => index + 1);

    //Fisher-Yate 알고리즘
    for (let i = cardSet.length - 1; i > 0; i--) {
      //1을 더하는 이유는 소수이기 때문에 0에 곱하면 값이 안나옴
      const j = Math.floor(Math.random() * (i + 1));
      [cardSet[i], cardSet[j]] = [cardSet[j], cardSet[i]];
    }
    return cardSet.slice(0, count);
  };

  //버튼 이벤트 대응 함수
  const gameSelection = (action) => {
    if (action === "start") {
      settingGame();
    } else if (action === "compare") {
      makeResult();
    } else {
      initGame();
    }
  };

  const settingGame = useCallback(() => {
    //카드받기
    setComList(makeCard(2));
    setCardList(makeCard(5));

    setBtnDisabled(true);
    setSelectedDisabled(false);
    setStartGame(true);
    setSelectedCards([]);
    setComResult(0);
    setMyResult(0);
    setWinner("");
  },[]);
  const initGame = useCallback(() => {
    setBtnDisabled(false);
    setSelectedDisabled(false);
    setStartGame(false);
    setComList([]);
    setCardList([]);
    setSelectedCards([]);
    setComResult(0);
    setMyResult(0);
    setWinner("");
  },[]);


  const updateCardSelect = (e) => {

      const { value, checked } = e.target;

      if (checked) {
        //없어도 되는 코드이지만
        if (!selectedDisabled || selectedCards.length < 2) {
          setSelectedCards((prev) => [...prev, Number(value)]);
        }
      } else {
        setSelectedCards((prev) => prev.filter((num) => num !== Number(value)));
      }
    };

  const makeResult = () => {

    const comScore = comList.reduce((sum, num) => sum + num);
    const myScore = selectedCards.reduce((sum, num) => sum + num);

    setComResult(comScore);
    setMyResult(myScore);

    if (comScore > myScore) {
      setWinner("PC");
    } else if (comScore < myScore) {
      setWinner("Player");
    } else {
      setWinner("무승부");
    }
    //결과가 나왔으므로 다시 게임을 시작할 수 있게 시작버튼 활성화
    setBtnDisabled(false);
    setSelectedDisabled(true);
  };

  return (
    <div>
      <main className="container">
        <section className="contents">
          {startGame || <div className="tx-start">게임을 시작합니다.</div>}
          {startGame &&
            cardList?.map((number, index) => (
              <Card
                key={index}
                number={number}
                isChecked={selectedCards.includes(number)}
                isDisabled={
                  selectedDisabled ||
                  (selectedCards.length >= 2 && !selectedCards.includes(number))
                }
                selecedCard={updateCardSelect}
              />
            ))}
        </section>
        <section className="btn-box">
          <button
            type="button"
            className="btn"
            onClick={(e) => gameSelection("start")}
            disabled={btnDisabled}
          >
            시작
          </button>
          <button
            type="button"
            className="btn"
            onClick={(e) => gameSelection("compare")}
            disabled={!btnDisabled}
          >
            선택
          </button>
          <button
            type="button"
            className="btn"
            onClick={(e) => gameSelection("init")}
          >
            초기화
          </button>
        </section>
        <section className="score-box">
          <p>
            결과 : 플레이어 :{myResult}, PC : {comResult}
          </p>
          <p>승자 : {winner}</p>
        </section>
      </main>
    </div>
  );
}

export default CardLayout;

import React from "react";

/*
컴포넌트는 곧 view라고 생각하시면 됩니다.
왜냐하면 return 하는 것이 곧 html이기 때문입니다.

그래서 리액트에서는 컴포넌트=함수객체 이기 때문에
return타입이 존재하고, 그 return으로 html을 반환하기 때문에
하나의 컴포넌트는 하나의 view를 가진다고 보시면 됩니다
우리는 이 컴포넌트를 호출하여 사용하는 이유는
그가 가진 화면을 노출하고싶기 때문

리액트는 이 컴포넌트들을 이용하여 화면을 구현한다
실제 화면은 하나의 view이지만
사용자가 원하는 경로에 해당하는 컴포넌트로 교체하여
여러화면이 있는 것 처럼 보여지게 된다
이것을 SPA(single page application) 방식이라고 한다

컴포넌트가 호출되면서 전달받는 매개변수를 props라고 합니다
props는 상위컴포넌트에서 하위컴포넌트를 호출 할때
전달해야하는 데이터를 지닌 객체이다
*/
function ListGrid({listData}) {
  return (
    <>
      <section className="dw-100">
        <table className="table">
          <colgroup>
            <col style={{ width: "60%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead className="table-dark">
            <tr>
              <th>이름</th>
              <th>학년</th>
              <th>성별</th>
            </tr>
          </thead>
          <tbody>
            {
              /* html을 loop로 표현 시 loop대상은 key 속성응ㄹ 가진다.
              key속성은 loop 대상을 식별하는 값이기 때문에 중복되면 안됨
              없어도 화면은 나오지만 react 문법상에는 맞지 않으므로 
              반복하여 html을 랜더링 할 때는 key속성이 필수
              
              list에 ?를 붙이지 않아도 실행되기는 하지만
              */
              listData?.map((obj, index) => (
                <tr key={index}>
                  <td>{obj.myName}</td>
                  <td>{obj.grade}</td>
                  <td>{obj.gender}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </>
  );
}

export default ListGrid;

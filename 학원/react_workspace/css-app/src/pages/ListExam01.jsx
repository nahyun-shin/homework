import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ListExam01(props) {
  class Student {
    constructor(myName, grade, gender) {
      this.myName = myName;
      this.grade = grade;
      this.gender = gender;
    }
  }
  const list = [
    new Student("홍길동", 1, "남자"),
    new Student("이성진", 1, "남자"),
    new Student("고길동", 1, "남자"),
    new Student("김민구", 2, "남자"),
    new Student("성시엉", 2, "남자"),
    new Student("김수지", 2, "여자")
  ];

  return (
    <>
      <main className="container d-flex justify-content-center align-items-center w-50 vh-100">
        <section className="w-50">
          <table className="table">
            <colgroup>
              <col style={{ width: "60%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>이름</th>
                <th>학년</th>
                <th>성별</th>
              </tr>
            </thead>
            <tbody>
              {
                  /* html을 loop로 표현 시 loop대상은 key 속성을 가진다.
                 key속성은 loop 대상을 식별하는 값이기 때문에 중복되면 안됨
                 없어도 화면은 나오지만 react 문법상에는 맞지 않으므로 
                 반복하여 html을 랜더링 할 때는 key속성이 필수

                 list에 ?를 붙이지 않아도 실행되기는 하지만
                 */
              list?.map((obj, index) => 
                (
                  <tr key={index}>
                    <td>{obj.myName}</td>
                    <td>{obj.grade}</td>
                    <td>{obj.grade}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default ListExam01;

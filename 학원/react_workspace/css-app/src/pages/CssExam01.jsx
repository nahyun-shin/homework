import React from "react";
import'../assets/css/exam01.css';
import'bootstrap/dist/css/bootstrap.min.css'
/*
css적용1. className을 이용하는 방법
우리가 html 에서 하던대로 클래스이름, 태그, 태그이름 드을 이용해서
css를 작성한 후 적용하는 방법을 그대로 사용 가능
리액트에서는 css module 방식이라고 한다.
*/
function CssExam01(props) {
  return (
    <>
      <main className="container border border-1 vh-100 border-black">
      
      </main>
    </>
  );
}

export default CssExam01;

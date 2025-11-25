import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function FormExam02(props) {
  const [formData, setFormData] = useState({
    myName: "",
    age: "",
    gender: "",
    hobbies: [],
  });
  const [isShow, setIsShow] = useState(false);

  const inputChange = (e) => {
    if (isShow) {
      setIsShow(!isShow);
    }
    const { name, value } = e.target;
    //setFormData가 허용하는 callback함수는 setter가 지니는 객체 또는 값을 매개변수로 받는다.
    //callback함수는 반드시 setter지니는 데이터와 같은 형식의 값을 return해야한다.

    //화살표 함수에서 객체를 반환할 때 return 생략하고 쓸 경우에는 소괄호로 감싸야한다(이건 문법 규칙)
    setFormData((prev) => ({ ...prev, [name]: value }));
    //객체의 값을 가져오는 방법
    //obj.name obj['name']
  };

  const handlerHobbies = (e) => {
    if (isShow) {
      setIsShow(!isShow);
    }
    const { value, checked } = e.target;
    let updated = [...formData.hobbies];

    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter((val) => val !== value);
    }
    setFormData((prev) => ({ ...prev, hobbies: updated }));
  };

  const showDataToggle = () => {
    if (!isShow) {
      setIsShow(!isShow);
    }
  };

  return (
    <div>
      <main className="container d-flex flex-column vh-100 mt-5 ">
        <section className="w-50 mx-auto d-flex vh-75 flex-column">
          <div className="mb-4">
            <label htmlFor="myName" className="form-label">
              이름
            </label>
            <input
              type="text"
              className="form-control"
              id="myName"
              name="myName"
              onChange={inputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="form-label">
              나이
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              onChange={inputChange}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">성별 : </label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-form-check-input"
                id="man"
                name="gender"
                value="남자"
                onChange={inputChange}
                checked={formData.gender === "남자"}
              />
              <label htmlFor="man" className="form-check-label">
                남자
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-form-check-input"
                id="woman"
                name="gender"
                value="여자"
                onChange={inputChange}
                checked={formData.gender === "여자" || formData.gender === ""}
              />
              <label htmlFor="woman" className="form-check-label">
                여자
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">취미 : </label>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-form-check-input"
                id="movie"
                name="hobby"
                value="영화"
                onChange={handlerHobbies}
              />
              <label htmlFor="man" className="form-check-label">
                영화
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-form-check-input"
                id="book"
                name="hobby"
                value="독서"
                onChange={handlerHobbies}
              />
              <label htmlFor="woman" className="form-check-label">
                독서
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-form-check-input"
                id="music"
                name="hobby"
                value="음악감상"
                onChange={handlerHobbies}
              />
              <label htmlFor="woman" className="form-check-label">
                음악감상
              </label>
            </div>
            <div className="mb-4 text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={showDataToggle}
              >
                출력하기
              </button>
            </div>
            <div className="bg-light ">
              {isShow && (
                <>
                  <p>이름 {formData.myName} </p>
                  <p>나이 {formData.age}</p>
                  <p>성별 {formData.gender || "여자"} </p>
                  <p>취미 {formData.hobbies.join(", ")}</p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FormExam02;

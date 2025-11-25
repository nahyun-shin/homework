import React, { useState } from 'react';

function FunctionExam(props) {

    const [user, setUser]=useState({});

    const updateInfo =(e)=>{
        const{name, value}=e.target;
        user[name]=value; //user.key=value <-값을 알고 있을때 key값이 없더라도 생성할수있음, user[key]=value;
        //객체의 갱신은 주소의 변경 즉 새로운 객체를 대입해야한다.
        //하지만 내용은 유지해야하기 때문에 새로운 객체에 기존 객체의 내용을 넣음
        setUser({...user});//box안에 포장된 박스를 넣지 않고 풀러서 넣는 거라고 생각하면 됨

    }

    const outPutPrint=()=>{
        console.log(user);
    }

    return (
        <div>
            <label htmlFor="myName">이름</label>
            <input type="text" id='myName' name='myName' onChange={updateInfo}/><br/>
            <label htmlFor="age">나이</label>
            <input type="text"id='age' name='age' onChange={updateInfo}/><br/>
            <label htmlFor="gender">성별</label>
            <input type="text" id='gender' name='gender' onChange={updateInfo}/><br/>
            <button type='button' onClick={outPutPrint}>출력</button>
        </div>
    );
}

export default FunctionExam;
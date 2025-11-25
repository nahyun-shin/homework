import React, { useState } from 'react';
import DataTable from '../components/DataTable';

function PropsExam(props) {

    const[list, setList]=useState([
        {id : 1, name : '김민수', age : 30, gender : '남자'},
        {id : 2, name : '김수영', age : 25, gender : '여자'},
        {id : 3, name : '이진아', age : 21, gender : '여자'},
        {id : 4, name : '최현', age : 35, gender : '남자'}
    ])
    return (
        <div>
            <header>
                <h2>Props 예제</h2>
            </header>
            <section>
                <DataTable dataList={list} setList={setList}/>
            </section>
        </div>
    );
}

export default PropsExam;
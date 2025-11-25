import React from 'react';
import'bootstrap/dist/css/bootstrap.min.css'

function DataTable({dataList}) {
    return (
        <>
            <table className='table'>
                <thead>
                    <tr className='table-dark'>
                        <th>번호</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>성별</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataList?.map((st)=>
                            <tr>
                               {/**중괄호를 쓰는 이유는 return값이 jsx문법이기 때문에 jsx는 자바스크립트 */} 
                                <td>{st.id}</td>
                                <td>{st.name}</td>
                                <td>{st.age}</td>
                                <td>{st.gender}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default DataTable;
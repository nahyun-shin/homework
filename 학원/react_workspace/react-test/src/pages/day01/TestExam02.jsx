import React, { useState } from 'react';

function TestExam02(props) {

    const [list, setList]=useState([
        {id:1, contents :'안녕'},
        {id:2, contents :'반가워'},
        {id:3, contents :'테스트야'}
    ])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(obj=>(
                        <tr key={Object.id} data-testid='row-item'>
                            <td data-testid={`id-${Object.id}`}>
                                {obj.id}
                            </td>
                            <td data-testid={`contents-${Object.id}`}>
                                {obj.contents}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TestExam02;
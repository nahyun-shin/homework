import React, { useState } from 'react';

function SelectExam(props) {
    const [selected, setSelected]=useState('');
    return (
        <div>
            <p>선택된 과일 : {selected}</p>
            <div>
                <label htmlFor='fruits'>과일 선택 : </label>
                <select
                value={selected}
                onChange={(e)=>setSelected(e.target.value)}
                id='fruits'
                name="fruits"
                >
                    <option value="">=====선택=====</option>
                    <option value="사과">사과</option>
                    <option value="바나나">바나나</option>
                    <option value="귤">귤</option>
                    <option value="수박">수박</option>

                </select>
            </div>
        </div>
    );
}

export default SelectExam;
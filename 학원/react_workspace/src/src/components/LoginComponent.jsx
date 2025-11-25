import React from 'react';
import { useState } from 'react';

function LoginComponent({ users, login }) {

    const [selectedName, setSelectedName] = useState('');

    return (
        <div className='text-center mb-5 login_box'>
            <select className='form-select w-50' onChange={e => setSelectedName(e.target.value)}>
                <option value="">로그인 아이디를 선택해주세요.</option>
                {users?.map(user => <option key={user.name} value={user.name}>{user.name}</option>)}
            </select>
            <button type="button" className="btn btn-dark ms-2" onClick={() => login(selectedName)}>로그인</button>
        </div>
    );
}

export default LoginComponent;
import React from 'react';
import { useUser } from './UserContext';

function UserProfile() {
  const { user } = useUser();

  if (!user) {
    return <div>로그인하지 않았습니다.</div>;
  }

  return (
    <div>
      <h2>안녕하세요, {user.name}님!</h2>
      <p>아이디: {user.id}</p>
    </div>
  );
}

export default UserProfile;
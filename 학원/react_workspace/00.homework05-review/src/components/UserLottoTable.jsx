import React from "react";
import "../assets/css/userTable.css";
import Ball from "./Ball";

function UserLottoTable({ userLotto }) {
  return (
    <>
      <div className="user-table">
        {userLotto.map((users, index) => (
          <div key={index} className="user-box">
            <div className="item1">
                {users.rank.length>0 && `${users.rank}`}
            </div>
            {users.lotto?.map((lotto, index) => (
              <div key={index} className="item2">
                <Ball  number={lotto.number} match={lotto.match} />
              </div>
            ))}
            <div className="item3">
              {users.bonusNum > 0 && (
                <Ball number={users.bonusNum} match={true}/>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserLottoTable;

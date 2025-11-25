import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function ListComponent({ bookList, bookInput, currentUser, updateList, setCurrentUser }) {

    const [checkedList, setCheckedList] = useState([]);

    const borrowBook = () => {
        // 로그인이 안됐을 경우 대여 불가능하게 얼럿 띄움
        if (!currentUser.name) {
            alert('로그인 후 이용해주세요');
            return false;
        }
        // 업데이트 전 전체 책 리스트에서 체크된 리스트만 가져오기
        const borrow = bookList.filter(book => book.borrower == currentUser.name || checkedList.includes(book.id));
        updateList('borrow', checkedList); // 전체 책 리스트 업데이트
        setCurrentUser(prev => ({ ...prev, bookList: [...borrow] })); // 업데이트 전 책 리스트 + 체크한 책 합쳐서 전달
    };

    // 체크한 인풋 배열에 저장
    const checkList = (e) => {
        const id = Number(e.target.id);
        if (e.target.checked) {
            setCheckedList(prev => [...prev, id])
        } else {
            setCheckedList(prev => prev.filter(list => list !== id));
        }
    }



    // 리스트가 추가,삭제,대여 될 때 선택한 input 초기화
    useEffect(() => {
        setCheckedList([]);
    }, [bookList])

    return (
        <div className='pt-3'>
            <h2>도서 목록</h2>
            <div>
                <input type="text" ref={bookInput} />
                <button type="button" className='btn btn-primary ms-1' onClick={() => updateList('add')}>추가</button>
                <button type="button" className='btn btn-success mx-1' onClick={borrowBook}>대여</button>
                <button type="button" className='btn btn-danger' onClick={() => updateList('delete', checkedList)}>삭제</button>
            </div>
            <ul className='bg-light mt-3'>
                {bookList?.map((book) => (
                    <li className='p-2' key={`book_${book.id}`}>
                        <input type="checkbox"
                            id={`${book.id}`}
                            checked={checkedList.includes(book.id)}
                            onChange={checkList}
                            disabled={book.borrower !== '' ? true : false}
                        />
                        <label htmlFor={`${book.id}`}>{book.name}</label>
                    </li>
                ))}

            </ul>
        </div>
    );
}

export default ListComponent;
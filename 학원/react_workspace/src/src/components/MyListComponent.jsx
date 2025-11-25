import React, { useEffect } from 'react';
import { useState } from 'react';

function MyLibraryComponent({ myList, returnBook }) {

    const [checkedList, setCheckedList] = useState([]);

    // 체크한 인풋 배열에 저장
    const checkList = (e) => {
        const value = Number(e.target.value);
        if (e.target.checked) {
            setCheckedList(prev => [...prev, value])
        } else {
            setCheckedList(prev => prev.filter(list => list !== value));
        }
    }

    // 내 대여 리스트가 업데이트되면 대여리스트 체크 초기화
    useEffect(() => {
        setCheckedList([]);
    }, [myList])

    // console.log(checkedList);

    return (
        <div>
            <h2>대여한 도서 목록</h2>
            <div className="text-end">
                <button type="button" className='btn btn-outline-primary' onClick={() => returnBook(checkedList)}>반납</button>
            </div>
            {(myList && myList.length == 0) && <div className='text-center py-4'>대여한 도서가 없습니다.</div>}
            <ul className='bg-light my-4'>
                {myList?.map(book => (
                    <li className='p-2' key={`key_borrow${book.id}`}>
                        {/* 전체 도서 목록의 id와 겹쳐 다르게 지음... 대신 반납할 때 전체 도서 목록의 책과 반납할 책을 비교하기 위해 value값에 기존 id 넣어줌 */}
                        <input type="checkbox" id={`borrow_${book.id}`} value={book.id} onChange={checkList} />
                        <label htmlFor={`borrow_${book.id}`}>{book.name}</label>
                    </li>
                ))}

            </ul>
        </div>
    );
}

export default MyLibraryComponent;
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/common.css";
import LoginComponent from './loginComponent';
import MyLibraryComponent from './MyListComponent';
import ListComponent from './ListComponent';
import { useState, useRef, useReducer } from 'react';
import { useEffect } from 'react';

class Person {
    constructor(name, bookList) {
        this.name = name;
        this.bookList = bookList;
    }
};

class Book {
    constructor(name, id) {
        this.name = name;
        this.borrower = '';
        this.id = id;
    }
}

function LibraryCont(props) {
    // 전체 계정...
    // 로그인 계정 당 대여한 도서 목록[] 필요
    // 전체 도서 목록[] 필요


    // 로그인한 유저 정보 저장
    const [currentUser, setCurrentUser] = useState({ name: '', bookList: [] });

    // 책의 고유 아이디를 생성
    const bookId = useRef(0);

    // 추가할 책 제목 저장
    const bookInput = useRef(null);

    const listReducer = (state, action) => {
        switch (action.type) {
            case 'add':
                return [...state, action.payload];
            case 'delete':
                return state.filter(book => !action.payload.includes(book.id));
            case 'borrow':
                return state.map(book => {
                    if (action.payload.includes(book.id)) {
                        book.borrower = currentUser.name;
                    }
                    return book;
                });
            case 'return':
                return state.map(book => {
                    if (action.payload.includes(book.id)) {
                        book.borrower = '';
                    }
                    return book;
                });
            default:
                return state;
        }
    }
    // 도서 목록 저장 배열
    const [bookList, listDispatch] = useReducer(listReducer, []);

    // 전체 도서 목록 dispatch함수
    const updateList = (action, checkedArr) => {
        if (action === 'add') {
            const name = bookInput.current.value;
            const newBook = new Book(name, bookId.current++);
            listDispatch({ type: 'add', payload: newBook });
        } else {
            listDispatch({ type: action, payload: checkedArr });

        }
    }



    // 로그인 -> 전체 유저 리스트에서 유저 정보 가져오기 -> 
    // 전체 유저 정보 저장, 수정
    const [users, setUsers] = useState([]);

    // 첫 렌더링 때만 유저 정보 세팅
    useEffect(() => {
        setUsers([new Person('김철수', []), new Person('이명희', []), new Person('박보은', [])]);
    }, [])

    // 로그인 시 실행되는 함수
    // 현재 유저 정보 업데이트
    const login = (currentName) => {
        const loginUser = users.find(user => user.name == currentName);
        setCurrentUser(prev => ({ ...prev, ...loginUser }));
    };


    // 책 반납 시 실행되는 함수
    const returnBook = (checkedArr) => {
        // 현재 유저 정보의 대여 책 리스트 업데이트
        setCurrentUser((prev) => {
            const updateList = prev.bookList.filter(book => !checkedArr.includes(book.id))
            return { ...prev, bookList: updateList }
        });
        // 반납 시 전체 책 목록 상태 변경
        updateList('return', checkedArr);
    };

    // 현재 로그인한 유저 정보가 변경될 때 실행
    useEffect(() => {
        // 현재 로그인한 유저 정보의 대여 리스트를 전체 유저 정보에 반영
        setUsers(prev => prev.map((user) => {
            if (user.name == currentUser.name) {
                user.bookList = [...currentUser.bookList];
            }
            return user
        }));
    }, [currentUser])



    return (
        <div className='container'>
            <LoginComponent users={users} setCurrentUser={setCurrentUser} login={login} />

            {currentUser.name ? <h3 className='text-center mt-4 mb-5 pb-3'>{currentUser.name}님의 서재입니다.</h3> : <h3 className='text-center my-4'>로그인 후 이용해주세요.</h3>}

            <MyLibraryComponent myList={currentUser.bookList} returnBook={returnBook} />
            <ListComponent
                bookList={bookList}
                bookInput={bookInput}
                updateList={updateList}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />
        </div>
    );
}

export default LibraryCont;
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Book, BorrowBook } from '../data';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/bookLaykout.css';
import Login from '../components/Login';
import Mybook from '../components/Mybook';
import BookList from '../components/BookList';



 const bookReducer =(state, action)=>{
    switch(action.type){
        case 'newBook':
        return[...state, action.payload]
        case 'deleteBook':
            return state.filter(book=>!action.payload.includes(book.id))
        case 'rental':
            return action.payload;
        default:
            return state
    }
 }


function BookLayout(props) {

    const bookId = useRef(1);
    const[users, setUsers]=useState([]);
    const[selected, setSelected]=useState('');
    const [logUser,setLogUser]=useState('');
    const [rentalBooks, setRentalBooks]=useState([]);
    const[bookList, bookDispatch]=useReducer(bookReducer,
        [
            new Book(bookId.current++, '연금술사', false),
            new Book(bookId.current++, '주술회전', false),
            new Book(bookId.current++, '자바의 정석', false),
            new Book(bookId.current++, '진격거', false),
            new Book(bookId.current++, '맛있는 디져트', false),
    ])

    //셀렉트박스 처리용
    useEffect(()=>{
        const users=['김철수','김영희'];
        setUsers(users);
        setSelected(users[0]);
    },[])

    const loginUser = useCallback(()=>{
        const user = users.find(name=>name ===selected);
        setLogUser(user)
    },[users, selected])


    const addNewBook = (bookName)=>{
        if(bookList.find(book=> book.name===bookName)){
            alert('해당책은 이미 가지고 있습니다.')
            return false;
        }
        bookDispatch(
            
            {type : 'newBook',payload :new Book(bookId.current++,bookName,false)}
        )
    }

    const deleteBooks=(checkList)=>{
        bookDispatch(
            {type : 'deleteBook',payload : checkList}
        )
    }
    //대여
    const rentalBookEvt=useCallback((checkList)=>{
        console.log('선택된 ID:', checkList);
    console.log('현재 bookList:', bookList);
        const borrowBooks=
        bookList.filter(book=>checkList.includes(book.id))
        .map(book=> 
            {console.log('book:', book);
            return new BorrowBook(book.id, book.name, logUser,false);})
        console.log('대여할 BorrowBook:', borrowBooks);

        setRentalBooks((prev)=>[...prev, ...borrowBooks])
    },[bookList, logUser]);


    
    //대여와 반납 둘다 이루어짐
    useEffect(()=>{
        const rentalBookIds=rentalBooks.map(rentalBook => rentalBook.bookId)
        const updatedBookList=
        bookList.map(book=>
            (rentalBookIds.includes(book.id)
            ?{...book,isAbsent :true}
            :{...book, isAbsent : false})
        )

        bookDispatch({type:'rental', payload:updatedBookList});
    },[rentalBooks])

    //반납
    const returnBookEvt=useCallback((returnCheckList)=>{
        const remindBooks=
        rentalBooks.filter(book=>!returnCheckList.includes(book.bookId));

        setRentalBooks(remindBooks);
    },[rentalBooks])

    return (
        <div className='container'>
            <main className='contents'>
                <section className='text-center mb-4'>
                    <h2>도서 관리 프로그램</h2>
                </section>
                <section>
                    <Login
                    users={users}
                    logUser={logUser}
                    selected={selected}
                    setSelected={setSelected}
                    loginUser={loginUser}
                    />
                    <Mybook 
                    rentalBookList={rentalBooks}
                    logUser={logUser}
                    returnBookEvt={returnBookEvt}
                    />
                    <BookList
                    bookList={bookList}
                    logUser={logUser}
                    addNewBook={addNewBook}
                    deleteBooks={deleteBooks}
                    rentalBookEvt={rentalBookEvt}
                    />
                </section>
            </main>
            
        </div>
    );
}

export default BookLayout;
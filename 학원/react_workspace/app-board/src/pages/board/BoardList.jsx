import React from 'react';
import'../../assets/css/boardList.css'
import { useState } from 'react';
import { Link, Links, useNavigate } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import PagenationBox from '../../components/PagenationBox';
function BoardList(props) {


    const[currentPage, setCuttentPage]=useState(1);
    const[totalRows, setTotalRows]=useState(0);
    const[boardList, setBoardList]=useState([]);
    //페이지 이동을 위한 네비게이트
    const navigate = useNavigate();

    //처음 무조건 실행
    //조건 부 실행 가능
    useEffect(()=>{
        //동기 처리
        async function getBoardList() {
            const page = currentPage-1;
            const respones = await axios(`/api/board/list?currentPage=${page}`);
            console.log(respones.data)
            setBoardList(respones.data.data);
            setTotalRows(respones.data.total);
        }
        getBoardList();
    },[currentPage]);

    const nextPage = (page)=>{
        console.log(page)
        setCuttentPage(page)
    }

    return (
        <div>
            <section className='board'>
                <header className='text-center'>
                    <h3>게시글 리스트</h3>
                </header>
                <section className='board-table'>
                    <table className='table'>
                        <colgroup>
                        <col style={{width:'10%'}} />
                        <col style={{width:'50%'}} />
                        <col style={{width:'10%'}} />
                        <col style={{width:'30%'}} />
                        </colgroup>
                        <thead>
                            <tr className='table-dark text-center'>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>최종수정일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boardList.length === 0?
                            (
                                <tr>
                                    <td colSpan={4} className='text-center'>데이터가 없습니다...</td>
                                </tr>
                            ):
                            (
                                boardList.map(board=>(
                                    <tr key={board.boId}>
                                        <td>{board.boId}</td>
                                        <td><Link to={`/board/${board.boId}`}>
                                        {board.title}</Link></td>
                                        <td>{board.writer}</td>
                                        <td>{board.lastModified}</td>
                                    </tr>
                                ))
                            )
                            }
                        </tbody>
                    </table>
                </section>
                <section className='page'>
                    <PagenationBox
                    currentPage={currentPage}
                    totalRows={totalRows}
                    nextPage={nextPage}
                    />
                </section>
            </section>
        </div>
    );
}

export default BoardList;
import React, { useEffect, useState } from 'react';
import '../../assets/css/BoardDetail.css'
import axios from 'axios';
import { data, useNavigate, useParams } from 'react-router';
import useBoardStore from '../../store/UseBoardStore';

function BoardDetail(props) {

    //app에있는 rautor의 이름과 동일해야함
    const{id}=useParams();
    // const [detail,setDetail]=useState([]);
    const {detail, fetchDetail, inputDetail,setBoId}=useBoardStore();
    //페이지이동
    const navigate =useNavigate();

    //처음만 실행
    // useEffect(()=>{
    //     async function getBoard() {
            
    //         const respones = await axios(`/api/board/${id}`);
    //         setDetail(respones.data.data)
            
    //     }
    //     getBoard()
    // },[]);

    useEffect(()=>{
        setBoId(id);
        fetchDetail(id);
    },[id, fetchDetail]);

    // const inputHandler=(e)=>{
    //     //객체로 분해할당
    //     const{name, value}=e.target;
    //     setDetail((prev)=>({...prev, [name]:value}))
    // }
    const inputHandler=(e)=>{
        //객체로 분해할당
        const{name, value}=e.target;
        inputDetail(name, value)
    }

    const validate =()=>{
        if(!detail.title.trim().length === 0){
            alert('제목을 입력해주세요')
            return false;
        }
        if(!detail.contents.trim().length === 0){
            alert('내용을 입력해주세요')
            return false;
        }
        return true;
    }

    //폼데이터 전송
    const handleSubmit=async(e)=>{
        //하나의 이벤트가 끝나기 전까지 새로운 이벤트 발생 막음
        //클릭두번시 중복처리되는 과정을 막는것
        e.preventDefault();

        const header = {
            headers:{'Content-Type':'application/json'}
        }

        if(validate()){
            const res=await axios.put(`/api/board/${id}`,detail,header);
            console.log(res.data);
            let msg = res.data.resultMsg === 'OK' ? '수정완료':'수정실패';
            alert(msg);
            //페이지 이동
            navigate('/board');
        }
    }

    return (
        <>
            <section className='detail'>
                <div className='dtail-frm'>
                    <header className='mt-3 text-center'>
                        <h3>게시글 상세</h3>
                    </header>
                    <main className='detail-contents'>
                        <form action="" onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="title">제목 : </label>
                                <input type="text"
                                id='title'
                                name='title'
                                className='form-control'
                                value={detail.title}
                                onChange={inputHandler} />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="contents">내용 : </label>
                                <textarea
                                className='form-control'
                                id='contents'
                                name='contents'
                                value={detail.contents} 
                                onChange={inputHandler}
                                ></textarea>
                            </div>
                            <div className='text-center'>
                                <button type='submit' className='btn btn-primary mx-2' >수정</button>
                                <button type='button' className='btn btn-secondary'>취소</button>
                            </div>
                        </form>
                    </main>
                </div>
            </section>
        </>
    );
}

export default BoardDetail;
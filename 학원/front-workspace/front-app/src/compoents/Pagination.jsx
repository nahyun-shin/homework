import React, {useMemo } from 'react'; //useMemo는 값의 재계산을 방지해서 성능 최적화할 때 사용


/*
    page : 현재 페이지 번호(0부터 시작)
    totalRows : 전체 데이터 수
    movePage : 페이지 변경 시 호출할 함수
    pagePerRows : 페이지당 표시할 데이터 수 (기본값 10)
    blockPerCount : 한번에 보여줄 페이지 번호의 개수 (기본값 10)
*/ 
function Pagination({page, totalRows, movePage, pagePerRows=10, blockPerCount=10}) {

    //페이지 계산 로직
    const calculatePageData = useMemo(()=>{ //페이지네이션 계산을 캐싱. page, totalRows등 관련 값이 바뀔 댸만 다시 계산
         if (!totalRows || totalRows <= 0 || !pagePerRows || pagePerRows <= 0) { //전체 데이터 수가 없거나, 페이지당 표시할 데이터 수 가 없으면
            return { totalPage: 0, nowBlock: 0, totalBlock: 0 };                   //0으로 리턴
        }

        const totalPage = Math.ceil(totalRows / pagePerRows); //전체 페이지 수  = 전체 데이터 수 / 페이지당 데이터 수(올림)
        const nowBlock =  Math.floor(page / blockPerCount); //현재 페이지가 속한 블록 번호 계산 (0부터 시작)
        const totalBlock =  Math.ceil(totalPage / blockPerCount); //전체 블록 수 계산
        
        return {totalPage, nowBlock, totalBlock};           //계산한거 리턴

    },[totalRows, pagePerRows, page, blockPerCount]);       //네가지의 값 중 하나라도 바뀌면 다시 계산


    //페이지 렌더링 함수
    const renderPage = () =>{
       
        const {totalPage, nowBlock, totalBlock}  = calculatePageData; //계산된 값들을 가져와서 렌더링 준비
        if(totalPage === 0) { //표시할 페이지가 없으면 아무것도 렌더링 하지 않음
            return null;
        }

        const pageHTML = []; //페이지 번호들을 담을 배열 선언


        let isDisabled =  page === 0; //첫페이지면 비활성화
        
        //처음으로 가기
        pageHTML.push(
            <li key="first" className={`page-item ${isDisabled ? 'disabled': ''}`}>
                <a className='page-link' href='#' onClick={(e)=> movePage(0)}>처음</a>
            </li>
        )

        
        //이전블럭 가기
        isDisabled =  nowBlock <= 0;
        const prevBlockPage = (nowBlock * blockPerCount) -1;
        pageHTML.push(
            <li key="prev" className={`page-item ${isDisabled ? 'disabled': ''}`}>
                <a className='page-link' href='#' onClick={(e)=> movePage(prevBlockPage)}>이전</a>
            </li>
        )

        //페이지 번호 그리기
        for(let i = 0; i < blockPerCount ; i++) {
            let isActive = "";
            const pageNum = (nowBlock * blockPerCount) + i;

            if(page === pageNum) {
                isActive = 'active';
            }
            //현재 페이지면 활성화 표시
            pageHTML.push(
                <li key={pageNum} className={`page-item ${isActive}`}>
                    <a className='page-link' href='#' onClick={(e)=> movePage(pageNum)}>{pageNum+1}</a>
                </li>
            )

            //불필요한 페이지 안만들기 
            if(totalPage === 0 || totalPage === (pageNum+1)){
                break;
            }
        }

        //다음블럭 가기
        isDisabled =  (nowBlock+1) >= totalBlock;
        const nextBlockPageNum = (nowBlock +1) * blockPerCount;

        pageHTML.push(
            <li key="next" className={`page-item ${isDisabled ? 'disabled': ''}`}>
                <a className='page-link' href='#' onClick={(e)=> movePage(nextBlockPageNum)}>다음</a>
            </li>
        )

        //마지막 페이지 가기
        isDisabled =  totalPage === (page+1);
        const lastPageNum = totalPage -1;
        pageHTML.push(
            <li key="last" className={`page-item ${isDisabled ? 'disabled': ''}`}>
                <a className='page-link' href='#' onClick={(e)=> movePage(lastPageNum)}>마지막</a>
            </li>
        )

        return pageHTML;
    }
    

    return (
        <>
          <nav aria-label="Page navigation">
             <ul className='pagination justify-content-center'>
                {renderPage()}
             </ul>
         </nav>   
        </>
    );
}

export default Pagination; //외부에서 이 컴포넌트를 import 가능하게 내보냄
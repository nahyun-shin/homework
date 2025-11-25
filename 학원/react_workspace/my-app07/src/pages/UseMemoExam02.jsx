import React,{useState, useMemo} from 'react';

function UseMenoExam02(props) {
    const [numList, setNumList]=useState([]);
    const [num, setNum]=useState(0);
    

    //평균값 구하기
    /**
     * useMemo는 함수가 반환하는 값을 메몸리에 저장해두고, 의존성 배열에 명시된 값들이 변경되기 전에는
     * 다시 함수를 실해하여 계산하지 ㅇ낳고, 기존 값을 사용합니다.
     * 이런 것을 메모리제이션 이라고 합니다.
     * 즉, useMemo는 함수가 아니라 실행된 결과 값을 기억하는 것입니다.
     * 보통 useMemo는 함수가 실행된 결과 값을 반호나하는 구조 일때 사용가능합니다.
     * 비니니스 로직 중에 꼐산된 결과를 반환하는 함수에서
     * 그 연산이 복잡하거나, 오래 걸리는 함수에 useMemo 를 처리해서
     * cpu사용률이나 메모리 사용에 대한 최적화를 기대 할 수 있습니다.
     */


    const avg=useMemo(()=>{ //useEffect로 바꿀수 있지만 바로실행하는 useEffect는 지금의 상황에 맞지않음
        console.log('평균값 구하기')
        if(numList.length ===0)return 0;

        console.log(numList)
        const sum= numList.reduce((sum, num)=>sum +num); //(sum, num) <-sum은 이전누적값 num은 배열값
        return(sum/numList.length).toFixed(2);
    },[numList]);

    const insertNum=()=>{
        setNumList((prev)=>[...prev, Number(num)]);
        setNum('');
    }
    
    return (
        <div>
            <p>평균 값 : {avg}</p>
            <div>
                <label htmlFor="num">입력값 : </label>
                <input type="number"
                        id='num' 
                        value={num} 
                        onChange={(e)=>setNum(e.target.value)}/>
                <button type='button' onClick={insertNum}>등록</button>
            </div>
        </div>
    );
}

export default UseMenoExam02;
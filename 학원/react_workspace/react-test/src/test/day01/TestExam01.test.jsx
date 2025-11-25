import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TestExam01 from "../../pages/day01/TestExam01";
import userEvent from "@testing-library/user-event";

//비슷한 목적을 가진 테스트 끼리 그룹화
describe('컴포넌트 테스트',()=>{

    it('초기카운트는 0이고 버튼 누르면 증가',async()=>{
        //test할 파일 이름 기입
        render(<TestExam01/>);

        //초기값을 확인하기 위한 테스트
        //기대! 화면에서 카운트 : 0 이라는 문자가 있다.
        expect(screen.getByText('카운트 : 0')).toBeInTheDocument();
        
        //버튼 누르기
        //증가라는 이름을 가진 버튼 찾기
        const button = screen.getByRole('button', {name : '증가'});
        
        //이벤트 객체 선언
        const user = userEvent.setup();
        
        //버튼 클릭 > 이벤트 종료 될 때까지 대기
        await user.click(button) ;
        expect(screen.getByText('카운트 : 1')).toBeInTheDocument();

    })
})
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import CounterExam from "../../pages/day01/CounterExam";

describe('카운터 테스트',()=>{
    let user;
    let plusButton;
    let minusButton;

    beforeEach(() => {
        render(<CounterExam />);
        user = userEvent.setup();

        //초기값 0 확인(모든 테스트에서 동일)
        expect(screen.getByText('결과 값 : 0')).toBeInTheDocument();
        //증가라는 이름을 가진 버튼 찾기
        plusButton = screen.getByRole('button',{name:'증가'});
        //감소라는 이름을 가진 버튼 찾기
        minusButton = screen.getByRole('button',{name:'감소'});

    });

    
    it('증가 버튼 클릭시 숫자 증가',async()=>{
        
        await user.click(plusButton);
        expect(screen.getByText('결과 값 : 1')).toBeInTheDocument();
    })
    it('감소 버튼 클릭시 숫자 증가',async()=>{
        
        await user.click(minusButton);
        expect(screen.getByText('결과 값 : -1')).toBeInTheDocument();
    })

})
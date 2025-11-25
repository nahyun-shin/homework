import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import CounterExam from "../exam/CounterExam";

describe('카운터 테스트',()=>{
    let user;
    beforeEach(()=>{
        render(<CounterExam/>);
        user = userEvent.setup();
    })
    it('초기값을 0으로 가지고 있는지 확인',()=>{
        expect(screen.getByText('결과 : 0')).toBeInTheDocument();
    })
    it('증가 버튼 클릭시 숫자 증가 확인',async()=>{
        let addCount=screen.getByRole('button',{name:'증가하기'});
        await user.click(addCount);
        expect(screen.getByText('결과 : 1')).toBeInTheDocument();
    })
    it('감소 버튼 클릭시 숫자 증가 확인',async()=>{
        let addCount=screen.getByRole('button',{name:'감소하기'});
        await user.click(addCount);
        expect(screen.getByText('결과 : -1')).toBeInTheDocument();
    })
})

import {describe, expect, it} from "vitest";
import CounterExam from "../pages/CounterExam.jsx";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

describe('카운터 컴포넌트 테스트',()=>{
    it('카운터 증가하면 1씩증가',async ()=>{
        render(<CounterExam/>)
        //이벤트
        const user = userEvent.setup();

        //증가버튼
        const increment = screen.getByText('증가');
        await user.click(increment);
        expect(screen.getByText("1")).toBeInTheDocument();
    })
})
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AlertExam from "../../pages/day02/AlertExam";
import userEvent from "@testing-library/user-event";


describe('경고창 테스트',()=>{
    let alertMock;
    //시작하기전에 사전 처리
    beforeEach (()=>{
        alertMock=vi.spyOn(window,'alert').mockImplementation(()=>{});
    })

    afterEach(()=>{
        alertMock.mockRestore();
    })


    it('처음에는 결과가 없음',()=>{
        render(<AlertExam/>);
        expect(screen.getByText('결과 : 없음')).toBeInTheDocument();
    })


    it('입력 없이 처리 시 경고창',async()=>{
        const user = userEvent.setup();

        render(<AlertExam/>);

        const inputE = screen.getByRole('textbox');
        
        await user.type(screen.getByRole('textbox'),' ');//공백이란 입력값이 없는것
        expect(inputE.value.trim().length).toBe(0);

        await user.click(screen.getByRole('button'),{name :'입력확인'});

        expect(alertMock).toHaveBeenCalledWith('값을 입력하십시오.')

    })
})
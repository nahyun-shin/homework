import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PlusInput from "../../pages/day02/PlusInput";
import userEvent from "@testing-library/user-event";


describe('더하기 테스트',()=>{
    let user;
    let sumBtn;
    let input1;
    let input2;
    let alertMock;

    beforeEach(()=>{
        render(<PlusInput/>);
        user = userEvent.setup();
        input1 = screen.getByPlaceholderText('첫 번째 숫자');
        input2 = screen.getByPlaceholderText('두 번째 숫자');
        sumBtn = screen.getByRole('button',{name:'더하기'});
        alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
        
    })

    it('input창 1에 입력되는지 확인',async()=>{
        //값입력
        await user.type(input1,'10');
        //input의 값이 잘 입력되었는지
        expect(input1.value).toBe('10');
    })
    it('input창 2에 입력되는지 확인',async()=>{
        //값입력
        await user.type(input2,'20');
        expect(input2.value).toBe('20');
    })

    it('버튼클릭시 합계가 구해지는지 확인',async()=>{
        //input창에 값입력
        await user.type(input1,'10');
        await user.type(input2,'20');
        //버튼클릭
        await user.click(sumBtn);
        
        //결과 확인
        expect(screen.getByText('합계 : 30')).toBeInTheDocument();
        
        
    })
    it('입력하지 않았을 때 알림창 호출',async()=>{
        await user.click(sumBtn);
        expect(alertMock).toHaveBeenCalledWith('숫자를 입력해 주세요.');
    })
})
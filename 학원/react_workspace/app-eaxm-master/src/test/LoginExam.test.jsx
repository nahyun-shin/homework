import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import LoginExam from "../exam/LoginExam";

describe('로그인 테스트',()=>{
    let user;
    let idInput;
    let pwInput;
    let loginBtn;
    let alertMock;

    beforeEach(()=>{
        user=userEvent.setup();
        render(<LoginExam/>);
        idInput=screen.getByPlaceholderText('아이디 입력');
        pwInput=screen.getByPlaceholderText('비밀번호 입력');
        loginBtn=screen.getByRole('button',{name:'로그인'});
        alertMock=vi.spyOn(window,'alert').mockImplementation(()=>{});
    })
    afterEach(()=>{
        alertMock.mockRestore();
    })

    it('처음에는 입력값이 없음',()=>{
        expect(idInput.value).toBe('');
        expect(pwInput.value).toBe('');
    })
    it('id와 pw의 입력 값이 둘 다 없을 떄 알림창 뜨는지 확인',async()=>{
        await user.click(loginBtn);
        expect(alertMock).toHaveBeenCalledWith('아이디와 비밀번호를 입력하세요');
    })
    it('id만 입력값 없이 버튼 눌렀을 때 알림창 확인',async()=>{
        await user.type(idInput,' ');
        await user.type(pwInput,'비밀번호');
        await user.click(loginBtn);
        expect(alertMock).toHaveBeenCalledWith('아이디를 입력하세요');
    })
    it('pw만 입력값 없이 버튼 눌렀을 때 알림창 확인',async()=>{
        await user.type(idInput,'아이디');
        await user.type(pwInput,' ');
        await user.click(loginBtn);
        expect(alertMock).toHaveBeenCalledWith('비밀번호를 입력하세요');
    })
    it('id,pw 둘 다 입력값이 있고 버튼 눌렀을 때 알림창 확인',async()=>{
        await user.type(idInput,'아이디');
        await user.type(pwInput,'비밀번호');
        await user.click(loginBtn);
        expect(alertMock).toHaveBeenCalledWith('로그인 성공: 아이디');
    })


})

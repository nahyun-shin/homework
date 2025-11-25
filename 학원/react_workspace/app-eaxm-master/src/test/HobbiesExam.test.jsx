import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import HobbiesExam from "../exam/HobbiesExam";

describe('체크박스 테스트',()=>{
    let user;
    
    beforeEach(async()=>{
        user=userEvent.setup();
        render(<HobbiesExam/>);
        
    })
    it('초기 출력 화면 확인',()=>{
        const movieChk = screen.getByLabelText('영화');
        const musicChk = screen.getByLabelText('음악감상');
        const workChk = screen.getByLabelText('산책');
        const gameChk = screen.getByLabelText('게임하기');

        expect(movieChk).not.toBeChecked();
        expect(musicChk).not.toBeChecked();
        expect(workChk).not.toBeChecked();
        expect(gameChk).not.toBeChecked();

        
    });
    it('체크박스 선택한 취미 출력 확인',async()=>{
        const movieChk = screen.getByLabelText('영화');
        const musicChk = screen.getByLabelText('음악감상');
        const workChk = screen.getByLabelText('산책');
        const gameChk = screen.getByLabelText('게임하기');

        await user.click(movieChk);
        await user.click(musicChk);

        expect(movieChk).toBeChecked();
        expect(musicChk).toBeChecked();
        expect(workChk).not.toBeChecked();
        expect(gameChk).not.toBeChecked();

        let button= await screen.findByRole('button',{name: /확인/i});
        await user.click(button);
        
        expect(screen.getByText('영화, 음악감상')).toBeInTheDocument();

    })
    it('선택한 체크박스가 없을때 출력 확인',async()=>{
        const movieChk = screen.getByLabelText('영화');
        const musicChk = screen.getByLabelText('음악감상');
        const workChk = screen.getByLabelText('산책');
        const gameChk = screen.getByLabelText('게임하기');

        expect(movieChk).not.toBeChecked();
        expect(musicChk).not.toBeChecked();
        expect(workChk).not.toBeChecked();
        expect(gameChk).not.toBeChecked();

        let button= await screen.findByRole('button',{name: /확인/i});
        await user.click(button);
        
        expect(screen.getByText('선택 없음')).toBeInTheDocument();

    })
})
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConfirmExam from "../../pages/day02/ConfirmExam";
import userEvent from "@testing-library/user-event";

let alterMock;
const user = userEvent.setup();

beforeEach(() => {
  alterMock = vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  alterMock.mockRestore();
});

describe('테스트',()=>{
    it('삭제확인을 하면 삭제 멘트 출력',async()=>{

        render(<ConfirmExam/>);
        const confirmMock = vi.spyOn(window,'confirm').mockReturnValue(true);


        const button = screen.getByRole('button',{name : '삭제'});

        await user.click(button);

        expect(confirmMock).toHaveBeenCalledWith('진짜 삭제?')
        expect(alterMock).toHaveBeenCalledWith('삭제됨')
    })
    it('삭제취소를 하면 삭제 멘트 출력',async()=>{

        render(<ConfirmExam/>);
        const confirmMock = vi.spyOn(window,'confirm').mockReturnValue(false);


        const button = screen.getByRole('button',{name : '삭제'});

        await user.click(button);

        expect(confirmMock).toHaveBeenCalledWith('진짜 삭제?')
        expect(alterMock).toHaveBeenCalledWith('삭제취소')
    })
})


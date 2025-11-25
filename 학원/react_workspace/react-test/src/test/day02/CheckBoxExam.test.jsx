import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CheckBoxExam from "../../pages/day02/CheckBoxExam";
import userEvent from "@testing-library/user-event";

const user=userEvent.setup();

describe('초기상태는 체크박스 체크 없음',()=>{
    

    it('체크박스 체크 안했을 때',()=>{
        render(<CheckBoxExam/>);

        const movieCheck = screen.getByLabelText('영화감상')
        const soccerCheck = screen.getByLabelText('축구')
        const basketballCheck = screen.getByLabelText('농구')

        //초반에는 모두 해제
        expect(movieCheck).not.toBeChecked();
        expect(soccerCheck).not.toBeChecked();
        expect(basketballCheck).not.toBeChecked();

        expect(screen.getByText('취미 : 없음')).toBeInTheDocument();

    })
    it('취미선택하면',async()=>{
        render(<CheckBoxExam/>);

        const movieCheck = screen.getByLabelText('영화감상')
        const basketballCheck = screen.getByLabelText('농구')
        const soccerCheck = screen.getByLabelText('축구')
        const button = screen.getByRole('button', {name : '출력'})

        await user.click(movieCheck);
        await user.click(soccerCheck);

        //체크된 것 확인
        expect(movieCheck).toBeChecked();
        expect(soccerCheck).toBeChecked();
        //농구는 체크하지 않았으니까 체크가 안된걸 확인
        expect(basketballCheck).not.toBeChecked();

        await user.click(button);

        expect(screen.getByText('취미 : 영화, 축구')).toBeInTheDocument();

    })

})
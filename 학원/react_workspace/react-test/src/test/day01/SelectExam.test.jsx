import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SelectExam from "../../pages/day01/SelectExam";


describe('셀렉트 테스트',()=>{
    it('셀렉트 박스 선택시 화면에 출력',async()=>{
        const user = userEvent.setup();
        render(<SelectExam/>);

        // const select = screen.getByRole('combobox',{id : 'fruits'});
        const select =screen.getByLabelText('과일 선택 :');

        //처음에는 내용이 없음
        expect(screen.getByText('선택된 과일 :')).toBeInTheDocument();

        //toBe = 바뀌었을 때 결과를 보여줌
        expect(select.value).toBe('');
        //선택
        //async를 사용하는 이유는 select가 될떄까지 기다렸다가
        await user.selectOptions(select,'사과');
        expect (screen.getByText('선택된 과일 : 사과')).toBeInTheDocument();
    })
})
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TodoList from "../../pages/day02/TodoList";

describe('TodoList 테스트',()=>{
    it('처음에는 데이터 1개 보인다',()=>{
        render(<TodoList/>);
        const row = screen.getAllByTestId('row-item');
        expect(row).toHaveLength(1);

    })
})
describe('TodoList 테스트2', () => {
    it('추가를 누르면 개수 증가', async()=>{
        render(<TodoList/>);
        const user= userEvent.setup();
        const addBtn = screen.getByRole('button',{name : '추가'});
        await user.click(addBtn);

        const row = screen.getAllByTestId('row-item');
        expect(row).toHaveLength(2); //길이 판단
    })
})

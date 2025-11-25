import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TodoList02 from "../../pages/day02/TodoList02";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";

//mock데이터/기능 --> fake기능 또는 데이터

const mockList = [
    {id:1, contents :'안녕'}
]

const mockAddTodo = vi.fn();


describe('TodoList02 테스트',()=>{

    it('처음에는 데이터 1개 보인다',()=>{
        render(<TodoList02 todoList={mockList} addTodo={mockAddTodo}/>);

        const row = screen.getAllByTestId('row-item');
        expect(row).toHaveLength(1)
       
    })

})
describe('TodoList 테스트2', () => {
    it('추가를 누르면 이벤트동작', async()=>{
        render(<TodoList02 todoList={mockList} addTodo={mockAddTodo}/>);
        const user= userEvent.setup();

        const addBtn = screen.getByRole('button',{name : '추가'});
        await user.click(addBtn);

        const row = screen.getAllByTestId('row-item');
        expect(mockAddTodo).toHaveBeenCalledTimes(1); //시간내에 콜이 된다는걸 알수있음
    })
})
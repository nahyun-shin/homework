import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TodoList from "../exam/TodoList";

describe('todoList 테스트',()=>{
    let user;
    let alertMock;
    let todoInput;
    let addBtn;
    
    beforeEach(()=>{
        user=userEvent.setup();
        render(<TodoList/>);
        todoInput=screen.getByRole('textbox', { name: /할 일/i });
        alertMock=vi.spyOn(window,'alert').mockImplementation(()=>{});
        addBtn=screen.getByRole('button',{name: '추가'});
    })
    
    it('초기화면은 추가 된todo가 없음을 확인',()=>{
        let tbody=screen.queryAllByRole('row');
        let todo=tbody.slice(1);
        expect(todo).toHaveLength(0);
    })
    it('입력창에 할일을 입력하지 않을 시 알림창 확인',async()=>{
        await user.type(todoInput,' ');
        await user.click(addBtn);
        expect(alertMock).toHaveBeenCalledWith('할일을 입력');
    })
    it('할일을 입력후 버튼 클릭시 할일 증가 확인',async()=>{
        await user.type(todoInput,'할일추가');
        await user.click(addBtn);
        //추가 후 최신상태 재조회
        let tbody=screen.queryAllByRole('row');
        let todo=tbody.slice(1);
        
        expect(todo).toHaveLength(1);
        expect(todo[0]).toHaveTextContent('할일추가');
    })
})
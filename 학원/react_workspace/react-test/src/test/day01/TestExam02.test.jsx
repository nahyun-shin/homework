import { render,screen } from "@testing-library/react";
import { expect, test } from "vitest";
import TestExam02 from "../../pages/day01/TestExam02";

test('tbody가 있는지만 확인',()=>{
    const {container}=render(<TestExam02/>);

    const table =container.querySelector('table');
    expect(table.querySelector('tbody')).not.toBeNull();
})
test('tbody가 있는지만 확인2',()=>{
    render(<TestExam02/>);

    //초기에 리스트가 3개
    expect(screen.getAllByTestId('row-item').length).toBe(3);
})
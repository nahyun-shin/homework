import React from 'react';
import { create } from 'zustand';
import {immer} from 'zustand/middleware/immer'
import {persist} from 'zustand/middleware'

// 상태 공유
// 로그인 시 많이 이용
//persist 를 사용하면 새로고침을 해도 값이 유지됨 (대부분 로그인시 사용)
const useCounterStore = create(persist(immer((set) => ({

    count: 0,
    // action
    addNumber: () => set((state) => {state.count += 1 }),
    minusNumber: () => set((state) => {state.count -= 1 })

}))),
{

    //브라우저 스토리지(LocalStorage나 SessionStorage)에 저장될 때 사용하는 key 이름
    //persist를 사용시 키설정
    name :'count-storage'
}


);

export default useCounterStore;
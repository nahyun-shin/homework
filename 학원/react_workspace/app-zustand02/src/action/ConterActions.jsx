

export const counterActions = ((set, get)=>({

    addCount : ()=>set((state)=>{state.count +=1}),
    //빼기에 if문으로 조건을 0이하에선 빼기가 되지 않게 줄 수도 있다.
    minusCount : ()=>set((state)=>{
        if(state.count>0){
            state.count -=1;
        }
    })

}));
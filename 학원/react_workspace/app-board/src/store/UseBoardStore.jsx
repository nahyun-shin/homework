import{create} from 'zustand';
import{immer}from 'zustand/middleware/immer';
import axios from'axios';

const useBoardStore =create(immer((set,get)=>({
    detail : {boardId :'', title : '', contents:'', writer : ''},
    boId :0,
    fetchDetail : async (id)=>{
        const res = await axios.get(`/api/board/${get().boId}`);
        set((state)=>{
            state.detail.boId = res.data.data.boId;
            state.detail.title = res.data.data.title;
            state.detail.contents = res.data.data.contents;
            state.detail.writer = res.data.data.writer;
        })

        
    },
    setBoId :(id)=>{
        set((state)=> {state.boId = id});
    },
    inputDetail : (name , value)=>{
            set((state)=>{
            state.detail[name]=value;
        });
    }
})))

export default useBoardStore;
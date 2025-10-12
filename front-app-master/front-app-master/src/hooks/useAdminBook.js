import { useMutation, useQueryClient } from "@tanstack/react-query"
import { bookAPI } from "../service/bookService"



export const useAdminBook = ()=>{

    const queryClient = useQueryClient();

    const deleteFileMutation = useMutation({
        mutationFn : (bfId) => bookAPI.deleteFile(bfId),
    });

    const createBookSMutation = useMutation({
        mutationFn : (formData) => bookAPI.create(formData),
        onSuccess : () =>{
            console.log('등록 완료')
            queryClient.invalidateQueries({queryKey:['books', 0]})
        }
    });

    const updateBookMutation = useMutation({
        mutationFn : (formData) => bookAPI.update(formData),
        onSuccess : () =>{
            console.log('업데이트 완료')
            queryClient.invalidateQueries({queryKey:['books', 0]})
        }
    });


     const deleteBookMutation = useMutation({
        mutationFn : (brdId) => bookAPI.delete(brdId),
        onSuccess : () =>{
            console.log('삭제 완료')
            queryClient.invalidateQueries({queryKey:['books', 0]})
        }
    });

    return {createBookSMutation, deleteFileMutation, updateBookMutation, deleteBookMutation}
}

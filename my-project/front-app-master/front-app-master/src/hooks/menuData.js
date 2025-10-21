import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { bookAPI } from "../service/bookService";



export const menuPathMap = {
  '카테고리': '/books',
  '베스트': '/best',
  '신상품': '/new'
};


// hooks/menuUtils.js (또는 menuData.js 내부에 추가 가능)
export const getFixedMenuKey = (pathname) => {
  return Object.entries(menuPathMap).find(([_, basePath]) =>
    pathname.startsWith(basePath)
  )?.[0]; // key만 반환
};




//디테일페이지로 이동
export const goDetail = (navigate, categoryId, bookId) => {
  navigate(`/books/category/${categoryId}/detail/${bookId}`);
};
export const goAdminBookDetail = (navigate, bookId) => {
  navigate(`/admin/books/${bookId}`);
};
export const goUpdate = (navigate, bookId) => {
  navigate(`/admin/books/${bookId}/update`);
};



export const useBook = () => {
  const queryClient = useQueryClient();

  const createBookMutation = useMutation({
    mutationFn: (formData) => bookAPI.createBook(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] }); // 전체 리스트
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: ({ bookId, formData }) => bookAPI.updateBook(bookId, formData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["books"] }); // 리스트
      queryClient.invalidateQueries({ queryKey: ["books", variables.bookId] }); // 상세
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: (bookId) => bookAPI.deleteBook(bookId),
    onSuccess: (data, bookId) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["books", bookId] });
    },
  });

  return {
    createBookMutation,
    updateBookMutation,
    deleteBookMutation,
  };
};


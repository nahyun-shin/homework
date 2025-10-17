import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../pages/Layout";

import LoginForm from "../pages/login/LoginForm";

import MainBookList from "../pages/books/MainBooklist";
import CategoryBooklist from "../pages/books/CategoryBooklist";
import NewBookList from "../pages/books/NewBookList";
import BestBookList from "../pages/books/BestBookList";
import DetailBook from "../pages/books/DetailBook";
import AdminBookList from "../pages/admin/AdminBookList";

export const routers = createBrowserRouter([
    {
        path:'/',
        element : <Layout/>,
        children:[
            {
                index : true, element : <MainBookList/>
            },
            {
                path: 'main',
                children:[
                    {
                        index: true ,
                        element : <MainBookList/>
                    }
                ]
            },
            {
                path: 'books',
                children: [
                    { index: true, element: <Navigate to="all" replace /> },       // /books
                    { path: 'all', element: <CategoryBooklist key={window.location.search}/> },      // /books/all
                    { path: 'category/:categoryId', element: <CategoryBooklist key={window.location.search}/> }, // /books/category/:categoryId
                    // { path: ':bookId', element: <DetailBook/> } 
                ]
            },
            {
                path: 'best',
                children: [
                    {
                        index: true,
                        element: <Navigate to="day" replace />
                    }
                    ,
                    {
                        path: ':type',
                        element: <BestBookList/>
                    }
                ]
            },
            {
                path: 'new',
                children: [
                    {
                        index: true,
                        element: <Navigate to="daily" replace />
                    },
                    {
                        path: ':type',   // daily, weekly, monthly, all
                        element: <NewBookList />
                    }
                    
                ]
            },
            {
                path: 'detail/:bookId',
                children: [
                    {
                        index: true,
                        element: <DetailBook/>
                    }
                ]
            },
            {
                path: 'admin',
                children: [
                    {
                        index: true,
                        element: <Navigate to="books" replace />
                    },
                    {
                        path: 'books',   // daily, weekly, monthly, all
                        element: <AdminBookList />
                    }
                    
                ]
            }
        ]
    },
    {
        path : '/login',
        element : <LoginForm/>
    }
]);

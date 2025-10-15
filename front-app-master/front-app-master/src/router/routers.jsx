import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../pages/Layout";

import LoginForm from "../pages/login/LoginForm";

import MainBookList from "../pages/books/MainBooklist";
import CategoryBooklist from "../pages/books/CategoryBooklist";
import NewBookList from "../pages/books/NewBookList";
import BestBookList from "../pages/books/BestBookList";

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
                    { index: true, element: <CategoryBooklist/> },       // /books
                    { path: 'all', element: <CategoryBooklist/> },      // /books/all
                    { path: 'category/:categoryId', element: <CategoryBooklist/> } // /books/category/:categoryId
                ]
            },
            {
                path: 'best',
                children: [
                    {
                        index: true,
                        element: <BestBookList/>
                    }
                ]
            },
            {
                path: 'new',
                children: [
                    {
                        index: true,
                        element: <Navigate to="week" replace />
                    },
                    {
                        path: ':type',
                        element: <NewBookList/>
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

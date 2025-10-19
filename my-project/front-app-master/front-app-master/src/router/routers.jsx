import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../pages/Layout";

import LoginForm from "../pages/login/LoginForm";

import MainBookList from "../pages/books/MainBooklist";
import CategoryBooklist from "../pages/books/CategoryBooklist";
import NewBookList from "../pages/books/NewBookList";
import BestBookList from "../pages/books/BestBookList";
import DetailBook from "../pages/books/DetailBook";
import AdminBookList from "../pages/admin/AdminBookList";
import AdminDetailBook from "../pages/admin/AdminDetailBook";
import CreateBook from "../pages/admin/CreateBook";
import AdminUserList from "../pages/admin/AdminUserList";

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
                    { index: true, element: <Navigate to="all" replace /> },       
                    { path: 'all', element: <CategoryBooklist key={window.location.search}/> },      
                    { path: 'category/:categoryId', element: <CategoryBooklist key={window.location.search}/> }, 
                    { path: ':bookId', element: <DetailBook/> } 
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
                        path: ':type',  
                        element: <NewBookList />
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
                        path: 'books',
                        children:[
                            {
                                index: true,
                                element: <AdminBookList />
                            },
                            {
                                path:':bookId',
                                element: <AdminDetailBook />
                            },
                            {
                                path: 'create',
                                element: <CreateBook />
                            }
                        ]
                    },
                    {
                        path: 'users',
                        children:[
                            {
                                index: true,
                                element : <AdminUserList/>
                            }
                        ]
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

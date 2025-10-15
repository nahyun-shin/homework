// import { createBrowserRouter } from "react-router";
// import Layout from "../pages/Layout";

// import LoginForm from "../pages/login/LoginForm";

// import MainBookList from "../pages/books/MainBooklist";
// import CategoryBooklist from "../pages/books/CategoryBooklist";
// import NewBookList from "../pages/books/NewBookList";
// import BestBookList from "../pages/books/BestBookList";

// export const router = createBrowserRouter([
//     {
//         path:'/',
//         Component : Layout,
//         children:[
//             {
//                 index : true, Component : MainBookList
//             },
//             {
//                 path: 'main',
//                 children:[
//                     {
//                         index: true ,
//                         Component : MainBookList
//                     }
//                 ]
//             },
//             {
//                 path: 'books',
//                 children: [
//                     { index: true, Component: CategoryBooklist },       // /books
//                     { path: 'all', Component: CategoryBooklist },      // /books/all
//                     { path: 'category/:categoryId', Component: CategoryBooklist } // /books/category/:categoryId
//                 ]
//             },
//             {
//                 path: 'best',
//                 children: [
//                     {
//                         index: true,
//                         Component: BestBookList
//                     }
//                 ]
//             },
//             {
//                 path: 'new',
//                 children: [
//                     {
//                         index: true,
//                         Component: NewBookList
//                     },
//                     {
//                         path: ':type',
//                         Component: NewBookList
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         path : '/login',
//         Component : LoginForm
//     }
// ]);

// import { createBrowserRouter } from "react-router";
// import Layout from "../pages/Layout";

// import LoginForm from "../pages/login/LoginForm";
// import ProtectedRoute from "../compoents/ProtectedRoute";
// import MainBookList from "../pages/books/MainBooklist";

// export const router = createBrowserRouter([
//    {
//         path: '/',
//         Component: Layout,
//         children: [
//             {
//                 index: true,
//                 element: (
//                     <ProtectedRoute>
//                         <MainBookList />
//                     </ProtectedRoute>
//                 )
//             },
//             {
//                 path: 'main',
//                 children: [
//                     {
//                         index: true,
//                         element: (
//                             <ProtectedRoute>
//                                 <MainBookList />
//                             </ProtectedRoute>
//                         )
//                     },
//                 ]
//             },
//         ]
//     },
//     {
//         path: '/login',
//         Component: LoginForm
//     }
// ]);

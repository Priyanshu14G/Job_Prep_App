import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/protected";
import Home from "./features/interview/pages/Home";
import { InterviewProvider } from "./features/interview/interview.context";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <Protected><InterviewProvider><Home /></InterviewProvider></Protected>,
    },
    {
        path: "/interview/:interviewId",
        element: <Protected><InterviewProvider><Home /></InterviewProvider></Protected>,
    }
]);
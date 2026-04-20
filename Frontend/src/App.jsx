import { RouterProvider } from "react-router";
import { router } from "./apps.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";

function App() {
  

  return (
    <>
    <AuthProvider>
   <RouterProvider router={router}></RouterProvider>
   </AuthProvider>
   </>
  )
}

export default App

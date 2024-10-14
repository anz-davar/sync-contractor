import { ContractorTable } from "./pages/ContractorTable";
import { Home } from "./pages/Home";
import { Login } from "./pages/login";
import { createBrowserRouter, } from "react-router-dom";
import { ManagerTable } from "./pages/ManagementPage";
import { WorkContent } from "./cmps/WorkContent";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    }
]);
import { createBrowserRouter } from "react-router";
import RootlayOut from "../Layout/RootlayOut";
import Home from "../Pages/Home/Home";
import EvidenceDetail from "../Pages/Evidence/EvidenceDetail";



 export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootlayOut></RootlayOut>,
    children: [
        {
            index: true,
            element:<Home></Home>,
            loader:()=>fetch('/docData.json').then(res => res.json()),
        },
        {
        path: "evidence/:id",
        element: <EvidenceDetail></EvidenceDetail>,
        loader: () => fetch("/docData.json").then(res => res.json()),
      },
    ]
  },
]);
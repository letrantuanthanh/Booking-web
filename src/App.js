import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import NewHotel from "./pages/NewHotel";
import EditHotel from "./pages/EditHotel";
import Transactions from "./pages/Transactions";
import NewRoom from "./pages/NewRoom";
import EditRoom from "./pages/EditRoom";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/hotels", element: <Hotels /> },
      { path: "/rooms", element: <Rooms /> },
      { path: "/create-hotel", element: <NewHotel /> },
      { path: "/edit-hotel/:id", element: <EditHotel /> },
      { path: "/transactions", element: <Transactions /> },
      { path: "/create-room", element: <NewRoom /> },
      { path: "/edit-room/:id", element: <EditRoom /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "scenes/home";
import Events from "./scenes/events";
import Layout from "scenes/layout";
import Login from "scenes/login";
import Register from "scenes/register";
import Event from "scenes/single-event";
import { RequireAuth } from "state/RequireAuth";
import { RequireAdminAuth } from "state/RequireAdminAuth";
import Users from "scenes/users";
import AllEvents from "scenes/allevents";
import New from "scenes/new";
import { useContext } from "react";
import UserContext from "context/user/UserContext";
import Loading from "react-fullscreen-loading";

function App() {
  let { loaderVisible, setVisibilityTrue, setVisibilityFalse } =
    useContext(UserContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/events"
              element={
                <RequireAuth>
                  <Events />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new/:email" element={<New />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route
              path="/allevents"
              element={
                <RequireAuth>
                  <RequireAdminAuth>
                    <AllEvents />
                  </RequireAdminAuth>
                </RequireAuth>
              }
            />
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <RequireAdminAuth>
                    <Users />
                  </RequireAdminAuth>
                </RequireAuth>
              }
            />
            <Route
              path="/event/:id"
              element={
                <RequireAuth>
                  <Event />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Loading
        loading={loaderVisible}
        background="rgba(0,0,0,0.4)"
        loaderColor="#802f59"
      />
    </div>
  );
}

export default App;

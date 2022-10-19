import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../../Styles/GlobalStyles";
import UserContext from "../../Contexts/UserContext";
import SignUp from "../SignUp/SignUp.js";
import SignIn from "../SignIn/SignIn";
import Logged from "../Logged/Logged";

export default function App() {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    return (
        <>
            <UserContext.Provider value={{ BASE_URL }}>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/logged" element={<Logged />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
};
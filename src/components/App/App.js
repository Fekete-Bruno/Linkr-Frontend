import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../../Styles/GlobalStyles";
import UserContext from "../../Contexts/UserContext";
import PrivatePage from "../../Common/PrivatePage";
import SignUp from "../SignUp/SignUp.js";
import SignIn from "../SignIn/SignIn";
import Logged from "../Logged/Logged";
import UserProfile from "../UserProfile/Profile";

export default function App() {
    
    return (
        <>
            <UserContext.Provider value={{ BASE_URL: process.env.REACT_APP_BASE_URL }}>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route 
                            path="/logged" 
                            element={
                                <PrivatePage>
                                    <Logged />
                                </PrivatePage>
                            }
                        />
                        <Route 
                            path="/user/:id" 
                            element={
                                <PrivatePage>
                                    <UserProfile />
                                </PrivatePage>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
};
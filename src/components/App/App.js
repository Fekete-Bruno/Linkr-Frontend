import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../../Styles/GlobalStyles";
import UserContext from "../../Contexts/UserContext";
import PrivatePage from "../../Common/PrivatePage";
import SignUp from "../SignUp/SignUp.js";
import SignIn from "../SignIn/SignIn";
import UserProfile from "../UserProfile/Profile";
import Timeline from "../Timeline/Timeline";

export default function App() {
    
    // NAO MUDAR PRA NAO TRAVAR O DEPLOY
    // COLOCAR NO .env A VARIAVEL ABAIXO PARA TESTES
    // REACT_APP_API_BASE_URL=https://localhost:5000
    const BASE_URL = process.env.REACT_APP_API_BASE_URL; 
    
    return (
        <>
            <UserContext.Provider value={{ BASE_URL }}>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />

                        <Route 
                            path="/timeline" 
                            element={
                                <PrivatePage>
                                    <Timeline />
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserAuthorization(route) {
    const navigate = useNavigate();

    if (localStorage.getItem("token")) {
        let token = localStorage.getItem("token");
        token = JSON.parse(token);
        token = token.token;
        const body = {

        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const signout = axios.post(process.env.REACT_APP_API_BASE_URL + '/validatetoken', body, config);

        signout.then(() => {
            navigate(`${route}`);
        });

        signout.catch((error) => {
            console.log(error);
            localStorage.removeItem("token");
            localStorage.removeItem("img");
            localStorage.removeItem("linkr-userId");
            alert('Your session has expired. Please, login again');
            navigate('/');
        });
    }
}
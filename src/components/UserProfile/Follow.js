import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import Button from "../Buttons/Buttons";
import { 
    confirmFollow, 
    followUser, 
    unfollowUser 
  } from "../../Common/Service";

export default function Follow() {

    const params = useParams();
    const [isFollow, setIsFollow] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {

        const promise = confirmFollow(params.id);    
        setDisabled(true);
        promise.then((res) => {
            setIsFollow(res.data);
            setDisabled(false);
        });
    
    }, [params.id]);

    function follow() {
        const promise = followUser(params.id);
        setDisabled(true);
        promise.then(() => {
            setIsFollow(true);
            setDisabled(false)
        });
        promise.catch(() => {
            alert('Oops! Something went wrong 😞');
            setDisabled(false);
        });
    }

    function unfollow() {
        const promise = unfollowUser(params.id);
        setDisabled(true);
        promise.then(() => {
            setIsFollow(false);
            setDisabled(false)
        });
        promise.catch(() => {
            alert('Oops! Something went wrong 😞');
            setDisabled(false);
        });
    }

    return (
        <>  
            {isFollow ? (
                <Button 
                    className="unfollow" 
                    disabled={disabled}
                    onClick={() => unfollow()}
                >
                    {disabled ? <ThreeCircles color="#1877F2" height={30} /> : <>Unfollow</>}
                </Button>
            ):(
                <Button 
                    className="post" 
                    disabled={disabled}
                    onClick={() => follow()}
                >
                    {disabled ? <ThreeCircles color="#fff" height={30} /> : <>Follow</>}
                </Button> 
            )}           
        </>
    )
}
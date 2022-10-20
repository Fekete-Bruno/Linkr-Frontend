import React from "react";
import { ThreeDots } from  'react-loader-spinner';

export default function Loader () {
    return (
        <ThreeDots 
            height = "160"
            width = "160"
            radius = "18"
            color = '#FFFFFF'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle
            wrapperClass
        />
    )
};
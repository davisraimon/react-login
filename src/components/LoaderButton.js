import React from "react";


export default function LoaderButton(props){

    return(
        <div className="text-center">
        <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        </div>
    )
}
import type { ReactElement } from "react";


type Variants = "primary"| "secondary";
type Size = "sm"|"md"|"lg";

interface ButtonProps {

    variant: Variants;
    size: Size;
    text:string;
    startIcon?: ReactElement
    endIcon?:ReactElement
    onClick?: ()=> void;
    fullWidth?: boolean
    
}



const variantStyles ={

    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-sm hover:shadow-md active:bg-purple-800",

    secondary:" bg-white text-purple-600  border border-purple-200 hover:bg-purple-50 hover:border-purple-300 shadow-sm",

};


const sizeStyles = {

    sm:" px-3 py-1.5 text-xs gap-1.5",
    md:"px-4 py-2 text-sm gap-2",
    lg:"px-5 py-2.5 text-sm gap-2",
}


export const Button =({onClick , variant , size , fullWidth, startIcon, text, endIcon }:ButtonProps)=>{


    return(


        <button
         onClick={onClick}
         className={`
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            rounded-lg font-medium
            flex items-center justify-center
            transition-all duration-150
            active:scale-95 cursor-pointer
            ${fullWidth? "w-full":""}
            
            
            `}
        >

            {startIcon && (

                <span  className=" flex items-center shrink-0 ">{startIcon}</span>
            )}

            {text}

            {endIcon &&(

                <span className="flex items-center shrink-0">{endIcon}</span>
            )}


        </button>
    )
}
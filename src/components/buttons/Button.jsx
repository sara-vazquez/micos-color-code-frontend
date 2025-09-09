import React from 'react'
import './Button.css'

export default function Button({ variant = "primary", children, ...props }) {
    return(
        <button className={`btn btn-${variant}`} {...props}>
            {children}
        </button>
    );
}
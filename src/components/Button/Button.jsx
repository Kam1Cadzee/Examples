import React from 'react';
import css from './Button.module.css'
import {composeClasses} from "../../util/composeClassNames";

const Button = ({children, onClick, className}) => {
    const style = composeClasses(className, css.btn);

    return (
        <button type="button" onClick={onClick} className={style}>{children}</button>
    )
}

export default Button;
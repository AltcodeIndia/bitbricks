import React, { useState } from "react";
import { PropertyCategory } from "./PropertyCategories";
import { NavLink } from "react-router-dom";

function Dropdown(){
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    return(
        <>
            <div className="absolute">
                {PropertyCategory.map((propertyType , index) => {
                    return(
                        <li key={index}>
                            <NavLink to={propertyType.path} onClick={() => setClick(false)}>{ propertyType.title }</NavLink>
                        </li>
                    )
                })}
            </div>
        </>
    )
}
export default Dropdown;

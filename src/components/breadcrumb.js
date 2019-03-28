import React from "react"
import { Link } from "gatsby"
import breadcrumbStyles from "./breadcrumb.module.css"

export default props => {
    return (
        <div>
            <ul className={breadcrumbStyles.breadcrumb}>
                {props.crumbs.map((crumb, index) => (
                    ((props.crumbs.length - index) > 1) ? <li><Link to={crumb.toLowerCase()}>{crumb}</Link></li> : <li>{crumb}</li> 
                ))}
            </ul>
            <div style={{ clear: 'both' }}></div>
        </div>
        
    )
}

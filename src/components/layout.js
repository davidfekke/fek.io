import React from "react"
import "./layout.css"

export default ({children}) => {
    return (
        <div style={{ fontFamily: 'Open Sans, Helvetica', margin: '0px 0px 0px 0px' }}>
            {children}
        </div>
    )
}
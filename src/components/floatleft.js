import React from "react"

const FloatLeft = ({children}) => {
    return (
        <div style={{ float: 'left', width: '220px' }}>
            {children}
        </div>
    )
}

export default FloatLeft;

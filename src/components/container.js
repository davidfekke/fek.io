import React from "react"

export default ({children}) => {
    return (<div style={{ maxWidth: '1140px', 
                width: 'auto', 
                paddingRight: '15px', 
                paddingLeft: '15px', 
                marginRight: 'auto', 
                marginLeft: 'auto' }}>
        {children}
    </div>)
}
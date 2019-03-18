import React from "react"
import Container from "./container.js"
import HeaderPhoto from "../pages/Rejection.png"
import headerStyles from "./header.module.css"

console.log(HeaderPhoto)

export default props => {
    return (
        <header className={headerStyles.back}>
            <Container>
                <h1>{props.headline}</h1>
            </Container>
        </header>
    )
}
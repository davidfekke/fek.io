import React from "react"
import Container from "./container.js"
import * as headerStyles from "./header.module.css"

export default props => {
    return (
        <header className={headerStyles.back}>
            <Container>
                <h1 className={headerStyles.myheadline}>{props.headline}</h1>
            </Container>
        </header>
    )
}

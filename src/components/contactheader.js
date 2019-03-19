import React from "react"
import Container from "./container.js"
import headerStyles from "./contactheader.module.css"

export default props => {
    return (
        <header className={headerStyles.back}>
            <Container>
                <h1>{props.headline}</h1>
            </Container>
        </header>
    )
}

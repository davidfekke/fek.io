import React from "react"
import Container from "./container.js"
import * as headerStyles from "./aboutheader.module.css"

const AboutHeader = props => {
    return (
        <header className={headerStyles.back}>
            <Container>
                <h1 className={headerStyles.about}>{props.headline}</h1>
            </Container>
        </header>
    )
}

export default AboutHeader;

import React from "react"
import Container from "./container.js"
import * as headerStyles from "./contactheader.module.css"

const ContactHeader = props => {
    return (
        <header className={headerStyles.back}>
            <Container>
                <h1 className={headerStyles.contact}>{props.headline}</h1>
            </Container>
        </header>
    )
}

export default ContactHeader;

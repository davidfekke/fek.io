import React from "react"
import Container from "./container.js"
import headerStyles from "./postheader.module.css"

export default props => {
    return (
        <header className={headerStyles.back} style={{ backgroundImage: `url(${props.backgroundImage})`}}>
            <Container>
                <h1 className={headerStyles.post}>{props.headline}</h1>
            </Container>
        </header>
    )
}

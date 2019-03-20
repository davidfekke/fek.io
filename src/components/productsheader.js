import React from "react"
import Container from "./container.js"
import headerStyles from "./productsheader.module.css"

export default props => {
    return (
        <header className={headerStyles.back}>
            <Container>
                <h1 className={headerStyles.product}>{props.headline}</h1>
            </Container>
        </header>
    )
}

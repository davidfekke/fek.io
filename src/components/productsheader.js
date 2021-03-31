import React from "react"
import Container from "./container.js"
import * as headerStyles from "./productsheader.module.css"

const ProductHeader = props => {
    return (
        <header className={headerStyles.back}>
            <Container>
                <h1 className={headerStyles.product}>{props.headline}</h1>
            </Container>
        </header>
    )
}

export default ProductHeader;

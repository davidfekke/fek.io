import React from "react"
import Container from "./container.js"
import * as headerStyles from "./blogheader.module.css"

const BlogHeader = props => {
    return (
        <header className={headerStyles.back}>
            <Container>
                <h1 className={headerStyles.blog}>{props.headline}</h1>
            </Container>
        </header>
    )
}

export default BlogHeader;

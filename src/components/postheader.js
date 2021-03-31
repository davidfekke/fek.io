import React from "react"
import Container from "./container.js"
import * as headerStyles from "./postheader.module.css"
// Lowercased name.

const PostHeader = props => {
    return (
        <header className={headerStyles.back} style={{ backgroundImage: `url(${props.backgroundImage})`}}>
            <Container>
                <h1 className={headerStyles.post}>{props.headline}</h1>
            </Container>
        </header>
    )
}

export default PostHeader;

import React from "react"
import Container from "./container.js"

const Article = ({children}) => {
    return (
        <article>
            <Container>
                {children}
            </Container>
        </article>
    )
}

export default Article;

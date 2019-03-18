import React from "react"
import Container from "./container.js"

export default ({children}) => {
    return (
        <article>
            <Container>
                {children}
            </Container>
        </article>
    )
}
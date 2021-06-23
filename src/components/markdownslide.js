import React, { useEffect } from "react"
import "reveal.js/dist/reveal.css"
import "reveal.js/dist/theme/white.css"
import Reveal from "reveal.js/dist/reveal"

const MarkdownSlide = (props) => {
    useEffect(() => {
        Reveal.initialize();
    });
    return (
        <div className="reveal">
            <div className="slides">
                <section>Slide 1</section>
                <section>Slide 2</section>
            </div>
        </div>
    )
}

export default MarkdownSlide;

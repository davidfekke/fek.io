import React from "react"
import { Helmet } from "react-helmet"

export default (props) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
            <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css"></link>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css"></link>
        </Helmet>
    )
}

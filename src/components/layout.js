import React from "react"
import Navbar from "./navbar.js"
import Header from "./header.js"
import Footer from "./footer.js"
import Article from "./article.js"
import { Helmet } from "react-helmet"

export default ({children}) => {
    return (
        <div style={{ fontFamily: 'Open Sans, Helvetica' }}>
            {children}
        </div>
    )
}
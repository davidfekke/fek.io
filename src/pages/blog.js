import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import HeaderPhoto from "./Rejection.png"
import { Helmet } from "react-helmet"

export default () => {
    return (
        <Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fek.io</title>
            </Helmet>
            <Navbar />
            <Header headline="Blog" backgroundImage={HeaderPhoto} />
            <Article>
                <div>Blog</div>
            </Article>
            <Footer />
        </Layout>
    )
}

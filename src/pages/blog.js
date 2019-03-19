import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/blogheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import HeaderPhoto from "./Rejection.png"
import MainHelmet from "../components/mainhelmet.js"

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Blog" backgroundImage={HeaderPhoto} />
            <Article>
                <div>Blog</div>
            </Article>
            <Footer />
        </Layout>
    )
}

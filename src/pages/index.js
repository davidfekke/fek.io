import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="This is the homepage" />
            <Article>
                <div style={{ fontSize: '4rem', fontWeight: 'bolder'}}>Mobile Software for your iPhone, iPad and Android devices. We also produce web services that can be consumed by these devices.</div>
            </Article>
            <Footer />
        </Layout>
    )
}

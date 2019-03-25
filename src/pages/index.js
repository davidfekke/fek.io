import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import Home from "../components/home"

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Welcome to FEK.IO" />
            <Article>
                <div style={{ display: 'block'}}>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center' }}>Mobile Software for your iPhone, iPad and Android devices. We also produce web services that can be consumed by these devices.</p>    
                    <Home />        
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

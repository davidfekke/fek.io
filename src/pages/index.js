import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import iPhone from "../images/Template-App-iPhoneX.png"

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Welcome to FEK.IO" />
            <Article>
                <div style={{ display: 'block'}}>
                    <img src={iPhone} alt="iPhone" style={{ width: '250px', float: 'left', padding: '1rem' }} />
                    <div style={{ textAlign: 'center', fontWeight: 'bolder'}}>
                        <p style={{ fontSize: '3rem' }}>Mobile Software for your iPhone, iPad and Android devices. We also produce web services that can be consumed by these devices.</p>
                        <p style={{ fontSize: '2rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.</p>
                    </div>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

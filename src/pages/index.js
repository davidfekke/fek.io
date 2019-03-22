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
                        <p style={{ fontSize: '2rem' }}>Mobile Software for your iPhone, iPad and Android devices. We also produce web services that can be consumed by these devices.</p>
                        <h3>iOS Apps iPhone, iPad and Apple Watch development</h3>
                        <p style={{ fontSize: '2rem' }}>Learn about our iOS projects leveraging key aspects of the iOS SDK.</p>
                        <h3>Android Development</h3>
                        <h4>The rest of the 92% of devices</h4>
                        <p style={{ fontSize: '2rem' }}>Learn about our iOS projects leveraging key aspects of the iOS SDK.</p>
                        <h3>.NET and Node.js</h3>
                        <h4> Will Seal the Deal.</h4>
                        <p>Mobile and IoT devices need a way to speak to the Cloud. We have 20 years of experience building server applications for your cloud solutions.</p>
                    </div>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

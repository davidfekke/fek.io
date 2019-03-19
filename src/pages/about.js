import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/aboutheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="About FEK.IO" />
            <Article>
                <div>
                    <h2>Need a iOS, Android or Node.js application</h2>
                <p>This is the web site for David Fekke's mobile applications. David Fekke is a iOS developer. He also develops .NET, ColdFusion and Java web applications, with a specialization in service oriented architecture (SOA).</p>

                <p>If you are looking for David's Powerpoint and Keynote presentation slides, you find them at this link.</p>

                <p>If you are interested in custom application development, please contact us for rates.</p>

                <p>This Web site is built using Gatsby JS. </p>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

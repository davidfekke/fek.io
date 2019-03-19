import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/contactheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Contact Us" />
            <Article>
                <div>
                <h3>How to contact me</h3>
                <p>
                The best way to get a hold of me is to email me at my gmail account:</p>

                <p>davidfekke@gmail.com</p>

                <p>I can also be reached by Twitter:</p>

                <p>@davefekke
                </p>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

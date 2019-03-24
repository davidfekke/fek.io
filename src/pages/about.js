import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/aboutheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import ExtLink from "../components/extlink.js"
import photoOfMe from "./DavidFekke.jpg"

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="About FEK.IO" />
            <Article>
                <div>
                    <h2>Need a iOS, Android or Node.js application</h2>
                    <img src={photoOfMe} alt="David Fekke" style={{ float: 'left', boxShadow: '2px 2px 5px black', width: '7rem', borderRadius: '50%', border:'1px solid orange', margin: '0.5rem' }} />
                    <p>This is the web site for David Fekke's mobile applications. David is a iOS, Android and Node.js developer. He also develops .NET, ColdFusion and Java web applications.</p>

                <p>If you are looking for David's Powerpoint and presentation slides, you find them at this <a href="https://slides.com/davidfekke/" target="_blank" rel="noopener noreferrer">link</a>.</p>

                <p>If you are interested in custom application development, please contact us for rates.</p>
                <br />
                <h3>Affiliations</h3>
                <p><strong><ExtLink uri="https://www.jaxnode.com" name="JaxNode" /></strong>, <strong>JaxDUG</strong>, <strong>JaxWeb</strong>, <strong>JaxMUG</strong></p>
                <h3>Aviation</h3>
                <p>David is also a Commercial pilot and a licensed remote pilot in single engine and multi engine land aircraft (ASMEL).</p>

                <p>This Web site is built using Gatsby JS. </p>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

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
                    <h3>How to contact</h3>
                    <p>
                    The best way to get a hold of me is to email me at my gmail account:</p>

                    <p><a href="mailto:davidfekke@gmail.com">davidfekke@gmail.com</a></p>

                    <p>I can also be reached by Twitter:</p>

                    <p><a href="https://twitter.com/@davidfekke" 
                            target="_blank"
                            rel="noopener noreferrer">@davidfekke</a>
                    </p>
                    
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440729.5231172946!2d-81.9639752016373!3d30.345282490679985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7e2!2sJacksonville%2C+FL!5e0!3m2!1sen!2sus!4v1553701891837" title="Map of Jacksonville, Fl" width="100%" height="450" frameborder="0" style={{ border: '0' }} allowfullscreen></iframe>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

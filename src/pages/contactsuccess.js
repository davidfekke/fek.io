import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/contactheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import ExtLink from "../components/extlink"

const ContactSuccess = () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Contact Us" />
            <Article>
                <div>
                    <h3>Thank You for Contacting Me</h3>
                    <p>
                        I will try to get back to you as soon as possible.
                    </p>

                    <p>
                        In the mean time you can try to reach out to me the following ways;

                    </p>

                    <ul>
                        <li>
                            Twitter: <ExtLink uri="https://twitter.com/@davidfekke" name="@davidfekke" />
                        </li>
                        <li>
                            Linkedin: <ExtLink uri="https://www.linkedin.com/in/david-fekke-1913ba2/" name="Linkedin" />
                        </li>
                        <li>
                            Skype
                        </li>
                        <li>
                            Facebook: <ExtLink uri="https://www.facebook.com/David-Fekke-LLC-178889285498948" name="David Fekke" />
                        </li>
                    </ul>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

export default ContactSuccess;


import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/contactheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import PubList from "../components/publist.js"
import aviationlinks from "../data/faapubs.json"

const FlightTraining = () => (
    <Layout>
        <MainHelmet title="Fek.io" />
        <Navbar />
        <Header headline="Flight Training" />
        <Article>
        <div>
            <h1>Flight Training</h1>
            <p>Here are Flight training resources I use.</p>
            
            <PubList pubs={aviationlinks} />
            
        </div>
        </Article>
        <Footer />
    </Layout>
)

export default FlightTraining;

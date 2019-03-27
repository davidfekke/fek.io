import React from "react"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import Header from "../../components/productsheader"
import Footer from "../../components/footer"
import Article from "../../components/article"
import ExtLink from "../../components/extlink"
import MainHelmet from "../../components/mainhelmet"
import products from "../../data/products.json"

const jaxnodeDetails = products.filter(item => item.name === 'JaxNode')[0];

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="JaxNode" />
            <Article>
                <div>
                    <img src={jaxnodeDetails.icon} alt={jaxnodeDetails.name} style={{ borderRadius: '5px' }} />
                    <h2>JaxNode</h2>
                    <h3>This is the iOS app for the JaxNode User Group</h3>
                    <p>{jaxnodeDetails.description}</p>
                    <p><ExtLink uri={jaxnodeDetails.uri} name={jaxnodeDetails.name} /></p>
                    {jaxnodeDetails.screens.map(screen => (
                        <img src={screen} alt="screenshot" style={{ width: '256px', padding: '5px' }} />
                    ))}
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

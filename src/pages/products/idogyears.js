import React from "react"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import Header from "../../components/productsheader"
import Footer from "../../components/footer"
import Article from "../../components/article"
import ExtLink from "../../components/extlink"
import MainHelmet from "../../components/mainhelmet"
import products from "../../data/products.json"

const iDogYears = products.filter(item => item.name === 'iDogYears')[0];
const icon = iDogYears.icon;

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="iDogYears" />
            <Article>
                <div>
                    <img src={icon} alt={iDogYears.name} style={{ borderRadius: '5px' }} />
                    <h2>iDogYears</h2>
                    <h3>This is the iOS app for caculating your dog's age in dog years</h3>
                    <p>{iDogYears.description}</p>
                    <p><ExtLink uri={iDogYears.uri} name={iDogYears.name} /></p>
                    {iDogYears.screens.map(screen => (
                        <img src={screen} alt="screenshot" style={{ width: '256px', padding: '5px' }} />
                    ))}
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

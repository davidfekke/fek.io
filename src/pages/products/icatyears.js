import React from "react"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import Header from "../../components/productsheader"
import Footer from "../../components/footer"
import Article from "../../components/article"
import ExtLink from "../../components/extlink"
import MainHelmet from "../../components/mainhelmet"
import products from "../../data/products.json"

const iDogYears = products.filter(item => item.name === 'iCatYears')[0];

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="iCatYears" />
            <Article>
                <div>
                    <h2>iCatYears</h2>
                    <h3>This is the iOS app for caculating your cat's age in cat years</h3>
                    <p>{iDogYears.description}</p>
                    <p><ExtLink uri={iDogYears.uri} name={iDogYears.name} /></p>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

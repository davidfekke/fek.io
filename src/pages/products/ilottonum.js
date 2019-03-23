import React from "react"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import Header from "../../components/productsheader"
import Footer from "../../components/footer"
import Article from "../../components/article"
import ExtLink from "../../components/extlink"
import MainHelmet from "../../components/mainhelmet"
import products from "../../data/products.json"

const ilottonum = products.filter(item => item.name === 'iLottoNum')[0];

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="JaxNode" />
            <Article>
                <div>
                    <h2>iLottoNum</h2>
                    <h3>This is the iOS app for picking a random number for meeting giveaways</h3>
                    <p>{ilottonum.description}</p>
                    <p><ExtLink uri={ilottonum.uri} name={ilottonum.name} /></p>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

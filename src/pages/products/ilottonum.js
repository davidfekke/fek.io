import React from "react"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import Header from "../../components/productsheader"
import Footer from "../../components/footer"
import Article from "../../components/article"
import ExtLink from "../../components/extlink"
import MainHelmet from "../../components/mainhelmet"
import Breadcrumb from "../../components/breadcrumb"
import products from "../../data/products.json"

const ilottonum = products.filter(item => item.name === 'iLottoNum')[0];

const iLottoNum = () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="iLottoNum" />
            <Article>
                <div>
                    <Breadcrumb crumbs={ [ 'Products', 'iLottNum' ] } />
                    <img src={ilottonum.icon} alt={ilottonum.name} style={{ borderRadius: '5px' }} />
                    <h2>iLottoNum</h2>
                    <h3>This is the iOS app for picking a random number for meeting giveaways</h3>
                    <p>{ilottonum.description}</p>
                    <p><ExtLink uri={ilottonum.uri} name={ilottonum.name} /></p>
                    {ilottonum.screens.map(screen => (
                        <img src={screen} alt="screenshot" style={{ width: '256px', padding: '5px' }} />
                    ))}
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

export default iLottoNum;

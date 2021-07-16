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

const iDogYears = products.filter(item => item.name === 'iCatYears')[0];

const iCatYears = () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="iCatYears" />
            <Article>
                <div>
                    <Breadcrumb crumbs={ [ 'Products', 'iCatYears' ] } /> 
                    <img src={iDogYears.icon} alt={iDogYears.name} style={{ borderRadius: '5px' }} />
                    <h2>iCatYears</h2>
                    <h3>This is the iOS app for calculating your cat's age in cat years</h3>
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

export default iCatYears;

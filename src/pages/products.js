import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/productsheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

const products = [
    { name: 'iDogYears' },
    { name: 'iCatYears' },
    { name: 'iLottoNum' },
    { name: 'JaxNode' }  
];

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="This is my Stuff" />
            <Article>
                <div>
                    <h2>Apps for Download</h2>
                    <p>Here are some of my apps you can download on Apple's iTunes App Store</p>
                    {products.map(item => (
                        <h2>{item.name}</h2>
                    ))}
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

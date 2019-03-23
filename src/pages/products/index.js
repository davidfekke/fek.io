import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import Header from "../../components/productsheader"
import Footer from "../../components/footer"
import Article from "../../components/article"
import MainHelmet from "../../components/mainhelmet"
import products from "../../data/products.json"

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
                        <div>
                            <h2><Link to={`/products/${item.name.toLowerCase()}`}>{item.name}</Link></h2>
                            <p>{item.description}</p>
                            <p><a href={item.uri} target="_blank" rel="noopener noreferrer">View on App Store</a></p>
                        </div>
                    ))}
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

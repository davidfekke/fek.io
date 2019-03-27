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
                        <div  style={{ display: 'flex', width: '100%' }}>
                            <div style={{ width: '150px', padding: '1rem' }}>
                                <img src={item.icon} alt={item.name} style={{ width: '100px', borderRadius: '10px' }} />
                            </div>
                            <div style={{ width: '300px' }}>
                                <h2><Link to={`/products/${item.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>{item.name}</Link></h2>
                                <p>{item.description}</p>
                                <p><a href={item.uri} target="_blank" rel="noopener noreferrer">View on App Store</a></p>
                            </div>
                        </div>
                    ))}
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import Header from "../../components/productsheader"
import Footer from "../../components/footer"
import Article from "../../components/article"
import MainHelmet from "../../components/mainhelmet"
import products from "../../data/products.json"
import ExtLink from "../../components/extlink"

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
                        <div  style={{ display: 'block', width: '100%' }} key={item.name}>
                            <div style={{ float: 'left', width: '120px', padding: '1rem' }}>
                                <Link to={`/products/${item.name.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <img src={item.icon} alt={item.name} style={{ width: '100px', borderRadius: '10px' }} />
                                </Link>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <h2><Link to={`/products/${item.name.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>{item.name}</Link></h2>
                                <p>{item.description}</p>
                                <p>
                                    <ExtLink style={{ color: 'black' }} uri={item.uri} name="View on App Store" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                    
            </Article>
            <Footer />
        </Layout>
    )
}

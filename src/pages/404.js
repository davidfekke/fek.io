import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/aboutheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import { Link} from "gatsby"
import upsetMarmot from "./marmot.gif"


const FourOhFour = () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="404: Nothing to See Here, Move Along" />
            <Article>
                <div style={{ textAlign: 'center'}}>
                    <img src={upsetMarmot} alt="Upset Marmot" />
                </div>
                <div>
                    <h2>The page you are looking for does not exist</h2>
                    <ul>
                        <li>
                            <Link to="/">Homepage</Link>
                            
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                            
                        </li>
                        <li>
                            <Link to="/blog">Blog</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

export default FourOhFour;

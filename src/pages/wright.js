import React, { useState, useEffect }  from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

const getQuote = async () => {
    const result = await fetch('https://wrightquotes.herokuapp.com/quote/random');
    const json = await result.json();
    return json.quote;
};

const WrightQuote = () => {
    const [quote, setQuote] = useState('');

    const processQuote = async () => {
        const myQuote = await getQuote();
        setQuote(myQuote);
    };

    useEffect(() => {
        processQuote();
    }, []);

    return (<Layout>
        <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Steven Wright Quotes" />
            <Article>
                <h1>Steven Wright</h1>
                <img src="/images/220px-Steven_Wright_1994.jpg" alt="Steven Wright" />

                <div style={{ display: 'block'}}>
                    <div className="hero" style={{ borderRadius: '1rem', 
                                    padding: '0.65rem', 
                                    backgroundColor: 'lightgrey',
                                    marginTop: '2rem', marginBottom: '4rem' }}>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                            {quote}
                        </p>
                    </div>        
                </div>

                <button style={{
                        backgroundColor: "#337ab7",
                        color: "white", 
                        borderRadius: "3px", 
                        fontSize: "1rem",
                        padding: "0.7em",
                        width: "100%",
                        border: 0
                }} onClick={() => processQuote()}>Get New Quote</button>
            </Article>
            <Footer />
        </Layout>);
};

export default WrightQuote;

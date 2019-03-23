import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import MainHelmet from "../components/mainhelmet"
import Navbar from "../components/navbar"
import Header from "../components/header"
import Article from "../components/article"
import Footer from "../components/footer"
import "../components/layout.css"
import "../components/imgresponsive.css"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <MainHelmet />
      <Navbar />
      <Header headline={post.frontmatter.title} />
      <Article>
        <em>By David Fekke</em><br />
        {post.frontmatter.date}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Article>
      <Footer />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
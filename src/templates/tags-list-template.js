import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/blogheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

const TagList = ({ pageContext, data }) => {
    const { tag } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`;

    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline={tagHeader} />
            <Article>
          <h1>{tagHeader}</h1>
          <ul>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const blogslug = `/blog${slug}`;
              const { title } = node.frontmatter
              return (
                <li key={slug}>
                  <Link to={blogslug}>{title}</Link>
                </li>
              )
            })}
          </ul>
          <Link to="/tags">All tags</Link>
          </Article>
          <Footer />
        </Layout>
    );
}

export default TagList;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/blogheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

export default class BlogList extends React.Component {
  render() {
    const { data } = this.props;
    const posts = this.props.data.allMarkdownRemark.edges;
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? '/blog/' : `/blog/${(currentPage - 1).toString()}`;
    const nextPage = `/blog/${(currentPage + 1).toString()}`;

    return (
      <Layout>
        <MainHelmet />
        <Navbar />
        <Header headline="Blog" />
        <Article>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (<div key={node.fields.slug}>
                    <div style={{ fontSize: '2rem'}}>
                        <Link to={node.fields.slug}>{title}</Link>
                    </div>
                    <div>{node.excerpt}</div> 
                    <div><em>Time to read: {node.timeToRead || 1} minute.</em></div> 
                </div>)
          })}
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </Article>
        <Footer />
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          excerpt
          timeToRead
        }
      }
    }
  }
`
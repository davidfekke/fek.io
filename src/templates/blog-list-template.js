import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/blogheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import BlogListItem from "../components/bloglistitem"
import MainHelmet from "../components/mainhelmet.js"

export default class BlogList extends React.Component {
  render() {
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
            return (<BlogListItem key={node.fields.slug}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        <Link to={`blog/${node.fields.slug}`} style={{ textShadow: '2px 2px 5px black', textDecoration: 'none', color: 'orange'}}>{title}</Link>
                    </div>
                    <div>{node.excerpt}</div> 
                    <div><em>Time to read: {node.timeToRead || 1} minute.</em></div> 
                </BlogListItem>)
          })}
          <div style={{ margin: '0px 100px 30px 100px'}}>
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}
            {!isLast && <span>&nbsp;</span>}
            {!isLast && (
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </div>
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
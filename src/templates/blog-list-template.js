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
          <div style={{ color: 'grey', 
                        fontWeight: 'bold', 
                        fontSize: '1.5rem', 
                        marginBottom: '50px', 
                        textAlign: 'center' }}>
            This blog is dedicated to my musings and are strictly my own. I use it to write about all things software, hardware and aviation. 
            The views and opinions on this site strictly reflect that of my own, and not my employer. 
            At any point I can change my mind, and they may not even reflect my opinions from three minutes ago, so please don't take anything I say too seriously.<br /><br /> 
            Some of the software topics on this blog will probably include ColdFusion, C#, .NET Core, Node.js, Objective-C, Swift, Java, Kotlin, C++.<br /><br />
            As commercial pilot I will be writing about General Aviation, the Airlines, instrument flying, avionics, the Federal Aviation Administration and the TSA.
          </div>
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
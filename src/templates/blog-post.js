import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import MainHelmet from "../components/mainhelmet"
import Navbar from "../components/navbar"
import Header from "../components/postheader"
import Article from "../components/article"
import Footer from "../components/footer"
import "../components/layout.css"
import "../components/imgresponsive.css"
import Share from "../components/share"
import BannerImage from "../pages/cardinal.jpg"

export default class BlogPost extends React.Component {
  render() {
    const data = this.props.data;
    const { prev, next } = this.props.pageContext;
    const post = data.markdownRemark
    let HeaderImage = BannerImage;
    if (post.frontmatter.cover_image !== undefined && post.frontmatter.cover_image !== null && post.frontmatter.cover_image.publicURL !== undefined && post.frontmatter.cover_image.publicURL !== null) {
      HeaderImage = post.frontmatter.cover_image.publicURL;
    }
    const url = `https://fek.io/blog${post.fields.slug}`;
    const title = post.frontmatter.title;
    const socialConfig = {
      twitterHandle: '@davidfekke',
      config: {
        url: `${url}`,
        title
      }
    };
    return (
      <Layout>
        <MainHelmet />
        <Navbar />
        <Header headline={post.frontmatter.title} backgroundImage={HeaderImage} />
        <Article>
          <Share socialConfig={socialConfig} /><br />
          <em>By David Fekke</em><br />
          {post.frontmatter.date}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          {prev && <Link to={`blog/${prev.fields.slug}`}>← Previous Page </Link>}
          {next && <span>&nbsp;</span>}
          {next && <Link to={`blog/${next.fields.slug}`}>Next Page →</Link>}
        </Article>
        <Footer />
      </Layout>
    )
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        cover_image {
          publicURL
        }
      }
      fields {
        slug
      } 
    }
  }
`
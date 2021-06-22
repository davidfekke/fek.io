import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { DiscussionEmbed } from "disqus-react";
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
    const post = data.page;
    const site = data.site;
    let HeaderImage = BannerImage;
    if (post.frontmatter.cover_image !== undefined && post.frontmatter.cover_image !== null && post.frontmatter.cover_image.publicURL !== undefined && post.frontmatter.cover_image.publicURL !== null) {
      HeaderImage = post.frontmatter.cover_image.publicURL;
    }
    const url = `https://fek.io/blog${post.fields.slug}`;
    const title = post.frontmatter.title;
    const socialConfig = {
      twitterHandle: site.siteMetadata.twitterHandle,
      config: {
        url,
        title,
        description: site.siteMetadata.description
      }
    };
    const seoData = {
      title,
      cover: HeaderImage,
      slug: url,
      siteURL: socialConfig.config.url,
      twitterHandle: site.siteMetadata.twitterHandle,
      description: site.siteMetadata.description
    };
    const facebook = {
      appId: site.siteMetadata.facebookAppId
    };
    const disqusShortname = "fek-io-1";
    const disqusConfig = {
      identifier: post.fields.slug,
      title,
      url: `https://fek.io/blog/${post.fields.slug}`
    };
    const tags = post.frontmatter.tags || [];
    const taglist = tags.join(', ');
    return (
      <Layout>
        <SEO data={seoData} facebook={facebook} />
        <Navbar />
        <Header headline={post.frontmatter.title} backgroundImage={HeaderImage} />
        <Article>
          <Share socialConfig={socialConfig} /><br />
          <em>By David Fekke</em><br />
          {post.frontmatter.date}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          {tags.length &&
            <div style={{ fontWeight: 'bold' }}>
              <p>Tags: {taglist}</p>
            </div>
          }
          {prev && <Link to={`/blog${prev.fields.slug}`}>← Previous Page </Link>}
          {next && <span>&nbsp;</span>}
          {next && <Link to={`/blog${next.fields.slug}`}>Next Page →</Link>}
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} /> 
        </Article>
        <Footer />
      </Layout>
    )
  }
}

export const query = graphql`
  query($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM Do, YYYY")
        tags
        cover_image {
          publicURL
        }
      }
      fields {
        slug
      } 
    }
    site {
      siteMetadata {
          title
          description
          twitterHandle
          url
          facebookAppId
      }
    }
  }
`
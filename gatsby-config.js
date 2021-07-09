module.exports = {
    siteMetadata: {
        title: `FEK.IO`,
        description: `FEK.IO The website for David Fekke L.L.C.`,
        twitterHandle: '@davidfekke',
        url: 'https://fek.io',
        siteUrl: 'https://fek.io',
        facebookAppId: '833529826996398'
      },
    flags: {
      PRESERVE_FILE_DOWNLOAD_CACHE: true,
      PRESERVE_WEBPACK_CACHE: true
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-image`,
      `gatsby-plugin-sitemap`,
      `gatsby-remark-copy-linked-files`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-gatsby-cloud`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `src`,
            path: `${__dirname}/src/blog/`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `static`,
          path: `${__dirname}/static`
        },
      },
      `gatsby-transformer-remark`,
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                
                classPrefix: "language-",
                
                inlineCodeMarker: null,
                
                aliases: {},
                
                showLineNumbers: true,
                
                noInlineHighlight: false,

                // This adds a new language definition to Prism or extend an already
            // existing language definition. More details on this option can be
            // found under the header "Add new language definition or extend an
            // existing language" below.
            languageExtensions: [
              {
                language: "superscript",
                extend: "javascript",
                definition: {
                  superscript_types: /(SuperType)/,
                },
                insertBefore: {
                  function: {
                    superscript_keywords: /(superif|superelse)/,
                  },
                },
              },
            ],
            // Customize the prompt used in shell output
            // Values below are default
            prompt: {
              user: "root",
              host: "localhost",
              global: false,
            },
            // By default the HTML entities <>&'" are escaped.
            // Add additional HTML escapes by providing a mapping
            // of HTML entities and their escape value IE: { '}': '&#123;' }
            escapeEntities: {}
              },
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                // It's important to specify the maxWidth (in pixels) of
                // the content container as this plugin uses this as the
                // base for generating different widths of each image.
                maxWidth: 1800,
              },
            },
          ],
        },
      },
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          host: 'https://fek.io',
          sitemap: 'https://fek.io/sitemap.xml',
          policy: [{ userAgent: '*', allow: '/' }]
        }
      },
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: "UA-620182-2",
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is optional
          anonymize: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          cookieDomain: "fek.io"
        },
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          // this base query will be merged with any queries in each feed
          query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
          feeds: [
            {
              serialize: ({ query: { site, allMarkdownRemark } }) => {
                return allMarkdownRemark.edges.map(edge => {
                  return Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.excerpt,
                    date: edge.node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    custom_elements: [{ "content:encoded": edge.node.html }],
                  })
                })
              },
              query: `
                {
                  allMarkdownRemark(
                    limit: 1000,
                    sort: { order: DESC, fields: [frontmatter___date] }
                  ) {
                    edges {
                      node {
                        excerpt
                        html
                        fields { slug }
                        frontmatter {
                          title
                          date
                        }
                      }
                    }
                  }
                }
              `,
              output: "/rss.xml",
              title: "FEK.IO RSS Feed",
              match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
              link: "https://fek.io/blog",
            },
          ],
        },
      },
    ],
  }
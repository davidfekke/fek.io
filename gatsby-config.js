module.exports = {
    siteMetadata: {
        title: `FEK.IO`,
        description: `FEK.IO The website for David Fekke L.L.C.`,
        twitterHandle: '@davidfekke',
        url: 'https://fek.io',
        facebookAppId: '833529826996398'
      },
    plugins: [
      `gatsby-plugin-react-helmet`,
      `gatsby-remark-copy-linked-files`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `src`,
            path: `${__dirname}/src/blog/`,
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
      }
    ],
  }
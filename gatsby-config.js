module.exports = {
    siteMetadata: {
        title: `FEK.IO, The website for David Fekke L.L.C.`,
      },
    plugins: [
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `src`,
            path: `${__dirname}/src/blog/`,
        },
      },
      `gatsby-transformer-remark`
    ],
  }
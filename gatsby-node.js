const path = require('path');
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    }
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
  
    return new Promise((resolve, reject) => {
      const postPage = path.resolve('src/templates/blog-post.js');
      resolve(
        graphql(`
          {
            posts: allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    category
                  }
                }
              }
            }
          }
        `).then(result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }
  
          const posts = result.data.posts.edges;
          const postsPerPage = 10;
          const numPages = Math.ceil(posts.length / postsPerPage);
          
          Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `/blog` : `/blog/${i + 1}`,
              component: path.resolve("./src/templates/blog-list-template.js"),
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1
              }
            })
          })
          
          posts.forEach((edge, index) => {
            const next = index === 0 ? null : posts[index - 1].node;
            const prev = index === posts.length - 1 ? null : posts[index + 1].node;
  
            createPage({
              path: edge.node.fields.slug,
              component: postPage,
              context: {
                slug: edge.node.fields.slug,
                prev,
                next,
              },
            });
          });
  
        })
      );
    });
  };

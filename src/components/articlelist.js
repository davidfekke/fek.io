import React from "react"

const ArticleLink = props => (<li>
    <a rel="noreferrer" target="_blank" alt={props.article.title} href={props.article.href}>{props.article.title}</a>
</li>);

export default ArticleLink;

import React from "react"
import ArticleLink from "./articlelist";

const PubList = props => (
    <div>
        {props.pubs.map(section => (<div>
            <p style={{fontWeight: 'bold'}}>{section.title}</p>
            <ul>
                {section.articles.map(article => <ArticleLink article={article} />)}
            </ul>
        </div>))}
    </div>
);

export default PubList;

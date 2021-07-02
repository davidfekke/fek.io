import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const TagDecorator = props => {
    return (
        <span>
            <Link to={`/tags/${kebabCase(props.tag)}`}>{props.tag}</Link>
        </span> 
    );
}

export default TagDecorator;

import React from "react"
import * as itemStyle from "./bloglistitem.module.css"

const BlogListItem = ({children}) => {
    return (
        <div className={itemStyle.listitem}>
            {children}
        </div>
    )
};

export default BlogListItem;

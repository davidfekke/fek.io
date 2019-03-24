import React from "react"
import itemStyle from "./bloglistitem.module.css"

const BlogListItem = ({children}) => {
    return (
        <div className={itemStyle.listitem}>
            {children}
        </div>
    )
};

export default BlogListItem;

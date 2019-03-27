import React from "react"
import { Helmet } from "react-helmet"

export default (props) => {
    const { data, facebook } = props;
    const postTitle = (data || {}).title;
    const postDescription = (data || {}).description;
    const postCover = (data || {}).cover;
    const postSlug = (data || {}).slug;

    const title = postTitle || '';
    const description = postDescription || '';
    const image = postCover ? postCover : 'cardinal.jpg';
    const url = postSlug;
    const author = (data || {}).twitterHandle;

    const metaArray = [
        { 'charSet': 'utf-8'},
        { 'name': 'description', 'content': description },
        { 'property': 'og:url',  'content': url },
        { 'property': 'og:title',  'content': title },
        { 'property': 'og:description',  'content': description },
        { 'property': 'og:image',  'content': image },
        { 'property': 'og:type',  'content': 'website' },
        { 'property': 'fb:app_id',  'content': facebook.appId },
        { 'name': 'twitter:card', 'content': 'summary' },
        { 'name': 'twitter:creator', 'content': author }
    ];
    return (

        <Helmet
            meta={metaArray}
            title={postTitle}
            link={[
                { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic'},
                { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'},
                { rel: 'icon', sizes: '16x16', type: 'image/png', href: `/favicon16.png` },
                { rel: 'icon', sizes: '32x32', type: 'image/png', href: `/favicon32.png` },
                { rel: 'shortcut icon', type: 'image/png', href: `/favicon64.png` }
            ]} />
    )
}

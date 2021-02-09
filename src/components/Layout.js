import React from 'react';
import Head from 'next/head';
import _ from 'lodash';

import {withPrefix} from '../utils';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>{_.get(this.props, 'page.frontmatter.title', null) && (_.get(this.props, 'page.frontmatter.title', null) + ' - ')}{_.get(this.props, 'data.config.title', null)}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content={_.get(this.props, 'page.frontmatter.excerpt', null) || _.get(this.props, 'data.config.description', null)}/>
                    <link href="https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i&display=swap" rel="stylesheet"/> 
                    {_.get(this.props, 'data.config.favicon', null) && (
                    <link rel="icon" href={withPrefix(_.get(this.props, 'data.config.favicon', null))}/>
                    )}
                </Head>
                <div id="page" className={'site palette-' + _.get(this.props, 'data.config.color_scheme', null) + ' accent-' + _.get(this.props, 'data.config.accent_color', null)}>
                  <Header {...this.props} />
                  <main id="content" className="site-content">
                    {this.props.children}
                  </main>
                  <Footer {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}

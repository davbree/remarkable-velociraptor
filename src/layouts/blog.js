import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {classNames, htmlToReact, getPages, Link, withPrefix} from '../utils';

export default class Blog extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pages, '/blog'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
            <div className="inner outer">
              <header className={classNames('page-header', 'inner-sm', {'screen-reader-text': _.get(this.props, 'page.frontmatter.hide_title', null)})}>
                <h1 className="page-title line-top">{_.get(this.props, 'page.frontmatter.title', null)}</h1>
                {_.get(this.props, 'page.frontmatter.subtitle', null) && (
                <div className="page-subtitle">
                  {htmlToReact(_.get(this.props, 'page.frontmatter.subtitle', null))}
                </div>
                )}
              </header>
              <div className={classNames('post-feed', 'grid', {'grid-col-2': _.get(this.props, 'page.frontmatter.col_number', null) === 'two', 'grid-col-3': _.get(this.props, 'page.frontmatter.col_number', null) === 'three'})}>
                {_.map(display_posts, (post, post_idx) => (
                <article key={post_idx} className="post grid-item">
                  <div className="post-inside">
                    {_.get(post, 'frontmatter.thumb_image', null) && (
                        <div>
                        <Link className="post-thumbnail" href={withPrefix(_.get(post, '__metadata.urlPath', null))}>

                        <img src={withPrefix(_.get(post, 'frontmatter.thumb_image', null))} alt={_.get(post, 'frontmatter.thumb_image_alt', null)} />
    
</Link>
                      </div>

                    </div>
                    )}                                       
                    <header className="post-header">
                      <h2 className="post-title"><Link href={withPrefix(_.get(post, '__metadata.urlPath', null))} rel="bookmark">{_.get(post, 'frontmatter.title', null)}</Link></h2>
                      <div className="post-meta">
                        <time className="published"
                          dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                      </div>
                    </header>
                    {_.get(post, 'frontmatter.excerpt', null) && (
                    <p className="post-content">
                      {_.get(post, 'frontmatter.excerpt', null)}
                    </p>
                    )}
                  </div>
                </article>
                ))}
              </div>
            </div>
            </Layout>
        );
    }
}

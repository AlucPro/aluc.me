import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRss, faCamera } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

interface SocialLink {
  label?: string;
  icon: string;
  link: string;
}

interface Project {
  url: string;
  name: string;
  desc: string;
}

interface Post {
  date: string;
  updated?: string;
  title: string;
  url: string;
}

interface IndexProps {
  config: {
    description?: string;
  };
  theme: {
    social_links: SocialLink[];
    nav: {
      articles: string;
    };
    tags_overview: any;
    posts_overview: {
      sort_updated: boolean;
      show_all_posts: boolean;
      post_count: number;
    };
    projects_url: string;
  };
  site: {
    tags: any[];
    posts: Post[];
    data: {
      projects?: Record<string, Project>;
    };
  };
  translations: {
    'index.find_me_on': string;
    'index.enum_and': string;
    'index.enum_comma': string;
    'index.articles': string;
    'index.topics': string;
    'index.most_recent': string;
    'index.projects': string;
  };
}

const Index: React.FC<IndexProps> = ({ config, theme, site, translations }) => {
  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case 'mail':
        return <FontAwesomeIcon icon={faEnvelope} />;
      case 'rss':
        return <FontAwesomeIcon icon={faRss} />;
      case 'red':
        return <FontAwesomeIcon icon={faCamera} />;
      default:
        return <FontAwesomeIcon icon={['fab', icon]} />;
    }
  };

  const getSocialLinkClass = (icon: string) => {
    if (icon === 'mail') return 'icon u-email';
    if (icon === 'rss' || icon === 'red') return 'icon';
    return 'icon u-url';
  };

  const renderSocialLinks = () => {
    return theme.social_links.map((link, index, array) => {
      const title = link.label || link.icon;
      const isLast = index === array.length - 1;
      const isSecondToLast = index === array.length - 2;

      return (
        <React.Fragment key={link.icon}>
          <a
            className={getSocialLinkClass(link.icon)}
            target="_blank"
            rel="noopener noreferrer"
            href={link.icon === 'mail' || link.icon === 'rss' || link.icon === 'red' ? link.link : `/${link.link}`}
            aria-label={title}
            title={title}
          >
            {renderSocialIcon(link.icon)}
          </a>
          {!isLast && (
            <span>
              {isSecondToLast
                ? ` ${translations['index.enum_and']} `
                : `${translations['index.enum_comma']} `}
            </span>
          )}
          {isLast && '.'}
        </React.Fragment>
      );
    });
  };

  const sortPosts = () => {
    const field = theme.posts_overview.sort_updated ? 'updated' : 'date';
    const sorted = [...site.posts].sort((a, b) => 
      new Date(b[field]).getTime() - new Date(a[field]).getTime()
    );
    return theme.posts_overview.show_all_posts
      ? sorted
      : sorted.slice(0, theme.posts_overview.post_count || 5);
  };

  return (
    <>
      <section id="about" className="p-note">
        {config.description && (
          <ReactMarkdown>{config.description}</ReactMarkdown>
        )}
        {theme.social_links && (
          <p>
            {translations['index.find_me_on']}
            {renderSocialLinks()}
          </p>
        )}
      </section>

      <section id="writing">
        <span className="h1">
          <a href={theme.nav.articles}>{translations['index.articles']}</a>
        </span>
        
        {theme.tags_overview && site.tags.length > 0 && (
          <>
            <span className="h2">{translations['index.topics']}</span>
            <span className="widget tagcloud">
              {/* 这里需要实现一个TagCloud组件 */}
            </span>
            <span className="h2">{translations['index.most_recent']}</span>
          </>
        )}

        <ul className="post-list">
          {sortPosts().map((post, i) => (
            <li key={i} className="post-item">
              <span className="meta">{post.date}</span>
              <span>
                <a href={post.url}>{post.title}</a>
              </span>
            </li>
          ))}
        </ul>

        {theme.posts_overview.show_all_posts && (
          <div>{/* 这里需要实现分页组件 */}</div>
        )}
      </section>

      {site.data.projects && (
        <section id="projects">
          <span className="h1">
            <a href={theme.projects_url}>{translations['index.projects']}</a>
          </span>
          <ul className="project-list">
            {Object.entries(site.data.projects).map(([key, project]) => (
              <li key={key} className="project-item">
                <a href={project.url}>{project.name}</a>:{' '}
                <ReactMarkdown>{project.desc}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default Index;
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Title } from 'react-head'

import Taitan from '../Taitan'
import ErrorPage from '../ErrorPage'
import { Translate, English, Swedish } from '../Translate'
import { comparePages } from '../../utility/compare'
import { addLangToUrl } from '../../utility/lang'
import { navigateBack } from '../../utility/nav'

const getPageNav = (nav) => {
  const child = nav.find(item => item.nav);
  if (child && child.nav) return child.nav;
  return [];
};

const parseNav = (items, lang, slug) => (
  <ul key={slug}>
    {items
      .sort(comparePages)
      .map(item =>
        <Fragment key={item.slug}>
          <li>
            {item.nav
              ? <h3>{item.title}</h3>
              : <Link
                className={item.active ? 'text-theme-color strong' : ''}
                to={addLangToUrl(item.slug, lang)}
              >
                {item.title}
              </Link>
            }
          </li>
          {item.nav && parseNav(item.nav, lang, item.slug + '/')}
        </Fragment>
      )}
  </ul>
);

const getRightSidebarListItemStyle = (headerLevel) => {
  // smallest level is 1, but it since we don't display the list item dot,
  // it is nice to move the top level header a bit to the left to
  // compensate (since that doesn't happen automatically)
  const indent = (headerLevel - 2);
  return {
    marginLeft: indent + "rem",
    lineHeight: "120%",
    marginBottom: "1rem",
  };
};

const getActiveMainTabTitle = (nav) => {
  for (const item of nav) {
    if (item.expanded || item.active) {
      return item.title;
    }
  }
  return null;
};


const PageHeader = ({ title, location }) => (
  <header key="header">
    <div className="header-inner">
      <div className="row">
        <div className="header-left col-md-2">
          <Link onClick={navigateBack(false)}>
            {'« '}
            <Translate>
              <English>Back</English>
              <Swedish>Tillbaka</Swedish>
            </Translate>
          </Link>
        </div>
        <div className="col-md-8">
          <h2>{title}</h2>
        </div>
        <div className="header-right col-md-2">
          <a className="primary-action" href={"https://github.com/datasektionen/bawang-content/tree/master/" + location.pathname}>
            <Translate>
              <English>Edit</English>
              <Swedish>Redigera</Swedish>
            </Translate>
          </a>
        </div>
      </div>
    </div>
  </header>
);

const LeftSidebar = ({ nav, lang }) => {
  // without this check, the page crashes due to rendering the page before the taitan request is finished
  nav = nav || [];
  return (
    <div className="col-sm-4 col-md-3">
      <h2>
        {getActiveMainTabTitle(nav)}
      </h2>
      <div id="secondary-nav">
        {parseNav(getPageNav(nav), lang)}
      </div>
    </div>
  )
};

const RightSidebar = ({ sidebar, anchors }) => (
  <div className="col-md-3" id="sidebar">
    {sidebar
      ? <div
        className="sidebar-card"
        dangerouslySetInnerHTML={{ __html: sidebar }}
      />
      : false
    }
    <div className="sidebar-card">
      <h2>
        <Translate>
          <English>On this page</English>
          <Swedish>På den här sidan</Swedish>
        </Translate>
      </h2>
      <ul>
        {(anchors || []).map(anchor =>
          <li key={anchor.id} style={{ listStyleType: "none" }}>
            <a href={'#' + anchor.id}>
              <div style={getRightSidebarListItemStyle(anchor.level)}>
                {anchor.value}
              </div>
            </a>
          </li>
        )}
      </ul>
    </div>
  </div>
);

const taitanRenderer = (location, lang) =>
  ({ title, body, sidebar, nav, anchors, error }) => {

    // This useEffect solution is a workaround to prevent hydration errors when loading the Error page.
    // useEffect does not run when doing serverside rendering, so this prevents the error page from 
    // rendering serverside. Rendering it serverside caused the page to crash when rendering clientside,
    // since the client always tries to render the normal page first, and getting angry that it does not
    // match what the server produced. (This is due to error being undefined first due to latecncy).
    const [errorPage, setErrorPage] = useState(null);
    useEffect(() => {
      if (error) {
        setErrorPage(error)
      } else {
        setErrorPage(null)
      }
    }, [location, error]);

    return (errorPage ?
      <ErrorPage error={errorPage} /> :
      <>
        <Title>
          {title + ' - Konglig Datasektionen'}
        </Title>
        <PageHeader title={title} location={location} />

        <div id="content" key="content">
          <div className="row">
            <LeftSidebar nav={nav} lang={lang} />

            <div className="col-sm-8 col-md-9">
              <div className="row">
                <div
                  className="col-md-9"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
                <RightSidebar sidebar={sidebar} anchors={anchors} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

export const Default = ({ lang }) => {
  const location = useLocation();
  const Page = taitanRenderer(location, lang);

  return (
    <Taitan pathname={location.pathname} lang={lang}>
      {(props, err) => <Page {...props} error={err} />}
    </Taitan>
  )
};

export default Default

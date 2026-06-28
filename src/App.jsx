import { useState, useEffect } from 'react'
import Layout from '@/Layout.jsx'
import { pagesConfig } from '@/pages.config';
import PageNotFound from '@/lib/PageNotFound';

const { Pages, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const PREVIEW_MARKER = '/editor/preview';

function getBasePrefix(pathname) {
  const markerIndex = pathname.indexOf(PREVIEW_MARKER);
  if (markerIndex === -1) return '';
  return pathname.slice(0, markerIndex + PREVIEW_MARKER.length);
}

function stripBasePrefix(pathname) {
  const basePrefix = getBasePrefix(pathname);
  if (!basePrefix) return pathname || '/';
  const remainder = pathname.slice(basePrefix.length);
  if (!remainder) return '/';
  return remainder.startsWith('/') ? remainder : `/${remainder}`;
}

function resolvePageComponent(pathname) {
  const normalizedPath = stripBasePrefix(pathname);
  if (normalizedPath === '/' || normalizedPath === '') {
    return Pages[mainPageKey] || null;
  }
  const segment = normalizedPath.replace(/^\//, '').split('/')[0];
  const pageKeys = Object.keys(Pages);
  const matched = pageKeys.find(
    key => key.toLowerCase() === segment.toLowerCase()
  );
  return matched ? Pages[matched] : null;
}

function PageRouter() {
  const [pathname, setPathname] = useState(stripBasePrefix(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPathname(stripBasePrefix(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Intercept <a> clicks for SPA navigation
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a');
      if (
        !anchor ||
        anchor.target === '_blank' ||
        e.ctrlKey || e.metaKey || e.shiftKey ||
        anchor.hasAttribute('download')
      ) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      e.preventDefault();
      const hrefPath = href.split('?')[0].split('#')[0];
      const basePrefix = getBasePrefix(window.location.pathname);
      const normalizedHref = hrefPath.startsWith('/') ? hrefPath : `/${hrefPath}`;
      const nextPath = basePrefix ? `${basePrefix}${normalizedHref}` : normalizedHref;
      window.history.pushState({}, '', nextPath);
      setPathname(stripBasePrefix(nextPath));
      window.scrollTo(0, 0);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const PageComponent = resolvePageComponent(pathname);
  if (!PageComponent) {
    return <PageNotFound />;
  }
  return <PageComponent />;
}

// Standalone App — used by main.jsx for local dev.
// On Base44, the platform uses pagesConfig.Layout (Layout.jsx) directly.
function App() {
  return (
    <Layout>
      <PageRouter />
    </Layout>
  )
}

export default App

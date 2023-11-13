'use strict';
import app from './config.js';
import { client, repoName } from './prismic-configuration.js';
import * as prismicH from '@prismicio/helpers';
import asyncHandler from './utils/async-handler.js';

const route = app();
const PORT = route.get('port');

route.listen(PORT, () => {
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to enables Previews
const prismicAutoPreviewsMiddleware = (req, _res, next) => {
  client.enableAutoPreviewsFromReq(req);
  next();
};
route.use(prismicAutoPreviewsMiddleware);

// Middleware to connect to inject prismic context
route.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
    repoName,
  };
  next();
});

// Route for Previews
route.get(
  '/preview',
  asyncHandler(async (req, res, next) => {
    const redirectUrl = await client.resolvePreviewURL({ defaultURL: '/' });
    res.redirect(302, redirectUrl);
  })
);

// Query the site layout with every route
route.get(
  '*',
  asyncHandler(async (req, res, next) => {
    const menuContent = await client.getSingle('menu');
    res.locals.menuContent = menuContent;
    next();
  })
);


/*
 * -------------- Routes --------------
 */

/*
 * Preconfigured prismic preview
 */
route.get('/preview', (req, res) => {
  const token = req.query.token;
  if (token) {
    req.prismic.api.previewSession(token, PrismicConfig.linkResolver, '/')
    .then((url) => {
      const cookies = new Cookies(req, res);
      cookies.set(Prismic.previewCookie, token, { maxAge: 30 * 60 * 1000, path: '/', httpOnly: false });
      res.redirect(302, url);
    }).catch((err) => {
      res.status(500).send(`Error 500 in preview: ${err.message}`);
    });
  } else {
    res.send(400, 'Missing token from querystring');
  }
});

// Route for homepage
route.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const pageContent = await client.getSingle('homepage');
    res.render('homepage', { pageContent });
  })
);

// Route for services
route.get(
  '/services',
  asyncHandler(async (req, res, next) => {
    const pageContent = await client.getSingle('services');
    res.render('services', { pageContent });
  })
);

// Route for archive
route.get(
  '/archive',
  asyncHandler(async (req, res, next) => {
    const pageContent = await client.getByUID('archive');
    res.render('archive', { pageContent });
  })
);

// Route for generic pages
route.get(
  '/:uid',
  asyncHandler(async (req, res, next) => {
    const uid = req.params.uid;
    const pageContent = await client.getByUID('page', uid);
    res.render('page', { pageContent });
  })
);



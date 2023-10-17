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

/*
 * Page route
 */
route.get('/:uid', (req, res, next) => {
  // Store the param uid in a variable
  const uid = req.params.uid;

    if (uid == 'archive') {
      // Get a page by its uid
      req.prismic.api.getByUID("archive", uid)
      .then((pageContent) => {
        if (pageContent) {
          res.render('archive', { pageContent });
        } else {
          res.status(404).render('404');
        }
      })
      .catch((error) => {
        next(`error when retriving page ${error.message}`);
      });
    }
    else {
      // Get a page by its uid
      req.prismic.api.getByUID("page", uid)
      .then((pageContent) => {
        if (pageContent) {
          res.render('page', { pageContent });
        } else {
          res.status(404).render('404');
        }
      })
      .catch((error) => {
        next(`error when retriving page ${error.message}`);
      });
    }
});

// Route for homepage
route.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const pageContent = await client.getSingle('homepage');
    res.render('Homepage', { pageContent });
  })
);

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
    console.log('get archive');
    const pageContent = await client.getSingle('archive');
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



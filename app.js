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
    const footerContent = await client.getSingle('footer');
    const partials = await client.getSingle('partials');
    res.locals.menuContent = menuContent;
    res.locals.footerContent = footerContent;
    res.locals.partials = partials;
    next();
  })
);

/*
 * -------------- Routes --------------
 */

// route for homepage
route.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const pageContent = await client.getSingle('index');
    res.render('index', { pageContent });
  })
);

// route for about
route.get(
  '/about',
  asyncHandler(async (req, res, next) => {
    const pageContent = await client.getSingle('about');
    res.render('about', { pageContent });
  })
);

// route for contact
// route.get(
//   '/contact',
//   asyncHandler(async (req, res, next) => {
//     const pageContent = await client.getSingle('contact');
//     res.render('contact', { pageContent });
//   })
// );

// route for portfolio request
route.get(
  '/portfolio-request',
  asyncHandler(async (req, res, next) => {
    const pageContent = await client.getSingle('portfolio');
    res.render('portfolio', { pageContent });
  })
);

// route for services
route.get(
  '/services',
  asyncHandler(async (req, res, next) => {
    const pageContent = await client.getSingle('services2');
    res.render('services2', { pageContent });
  })
);

// --------------------------------- NEW SITE -------------------------------------//

function requireLogin(req, res, next) {
  console.log("require login");
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
}

// route for portfolio services
route.get(
  '/login',
  asyncHandler(async (req, res, next) => {
    res.render('login');
  })
);

// process login form
route.post(
  "/login", 
  asyncHandler(async (req, res, next) => {
    const submittedPassword = req.body.pwd;
    const partials = await client.getSingle("partials");

    const expectedPassword = partials.data.password;

    if (submittedPassword === expectedPassword) {
      req.session.loggedIn = true;
      return res.redirect("/portfolio");
    }

    res.status(401).render("login", {
      error: "Incorrect password"
    });
  })
);

// routes starting with `/portfolio`
route.all(
  "/portfolio", 
  requireLogin, asyncHandler(async (req, res, next) => {
    const pageContent = await client.getSingle('homepage');
    res.render('homepage', { pageContent });
  })
);

// routes starting with `/portfolio`
route.all(
  "/portfolio/*", 
  requireLogin, function(req, res, next) {
  next();
});

// Route for portfolio services
route.get(
  '/portfolio/services',
  asyncHandler(async (req, res, next) => {
    const pageContent = await client.getSingle('services');
    res.render('services', { pageContent });
  })
);

// Route for portfolio archive
route.get(
  '/portfolio/archive',
  asyncHandler(async (req, res, next) => {
    console.log('get archive');
    const pageContent = await client.getSingle('archive');
    res.render('archive', { pageContent });
  })
);

// Route for portfolio generic pages
route.get(
  '/portfolio/:uid',
  asyncHandler(async (req, res, next) => {
    const uid = req.params.uid;
    const pageContent = await client.getByUID('page', uid);
    res.render('page', { pageContent });
  })
);



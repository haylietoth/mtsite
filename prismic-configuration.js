import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';

export const repoName = 'mttestsite';
export const client = prismic.createClient(repoName, {
  accessToken: '',
  fetch,
  routes: [
    {
      type: 'homepage',
      path: '/portfolio',
    },
    {
      type: 'page',
      path: '/portfolio/:uid',
    },
    {
      type: 'archive',
      path: '/portfolio/archive',
    },
    {
      type: 'services',
      path: '/portfolio/services',
    },
    {
      type: 'portfolio',
      path: '/portfolio-request',
    },
    {
      type: 'about',
      path: '/about',
    },
    {
      type: 'contact',
      path: '/contact',
    },
    {
      type: 'services2',
      path: '/services',
    },
    {
      type: 'index',
      path: '/index',
    },
  ],
});

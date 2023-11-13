import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';

export const repoName = 'mttestsite';
export const client = prismic.createClient(repoName, {
  accessToken: '',
  fetch,
  routes: [
    {
      type: 'homepage',
      path: '/',
    },
    {
      type: 'page',
      path: '/:uid',
    },
    {
      type: 'archive',
      path: '/archive',
    },
    {
      type: 'services',
      path: '/services',
    },
  ],
});

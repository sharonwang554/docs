import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const docs = await getCollection('docs');

  // Only include published articles in the RSS feed
  const items = docs
    .filter((doc) => {
      const slug = doc.id;
      return slug.startsWith('articles/') && !doc.data.draft;
    })
    .map((doc) => ({
      title: doc.data.title,
      description: doc.data.description || '',
      link: `/${doc.id}/`,
      // Starlight computes lastUpdated from git at build time, not via getCollection().
      // Use the current build date as a reliable fallback.
      pubDate: new Date(),
    }));

  return rss({
    title: 'Sharon Wang — Technical Documentation Portfolio',
    description:
      'Production-grade developer documentation, API specifications, onboarding guides, and end-user product docs.',
    site: context.site,
    items,
    customData: `<language>en-us</language><atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml" />`,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
  });
}

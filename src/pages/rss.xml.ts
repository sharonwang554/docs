import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const docs = await getCollection('docs');

  // Filter to only include articles and major overview pages
  const items = docs
    .filter((doc) => {
      const slug = doc.id;
      return (
        slug.startsWith('articles/') ||
        slug.startsWith('tms/') ||
        slug.startsWith('3d-space-portfolio/') ||
        slug.startsWith('raised-church-website/')
      );
    })
    .map((doc) => ({
      title: doc.data.title,
      description: doc.data.description || '',
      link: `/${doc.id}/`,
      // Use current date as fallback since Starlight content doesn't have pubDate by default, and lastUpdated can be a boolean
      pubDate: (typeof doc.data.lastUpdated === 'boolean' || !doc.data.lastUpdated) ? new Date() : doc.data.lastUpdated,
    }));

  return rss({
    title: 'Sharon Wang — Technical Documentation Portfolio',
    description:
      'Production-grade developer documentation, API specifications, onboarding guides, and end-user product docs.',
    site: context.site || 'https://docs.sharonwang.me',
    items,
    customData: '<language>en-us</language>',
  });
}

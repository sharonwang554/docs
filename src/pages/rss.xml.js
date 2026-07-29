import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const docs = await getCollection('docs');

  // Filter to only include articles and major overview pages
  const items = docs
    .filter((doc) => {
      const slug = doc.id;
      return (
        slug.startsWith('articles/') ||
        slug.startsWith('teamassign/') ||
        slug.startsWith('3d-space-portfolio/') ||
        slug.startsWith('raised-church-website/')
      );
    })
    .map((doc) => ({
      title: doc.data.title,
      description: doc.data.description || '',
      link: `/${doc.id}/`,
      // Use current date as fallback since Starlight content doesn't have pubDate by default
      pubDate: doc.data.lastUpdated || new Date(),
    }));

  return rss({
    title: 'Sharon Wang — Technical Documentation Portfolio',
    description:
      'Production-grade developer documentation, API specifications, onboarding guides, and end-user product docs.',
    site: context.site,
    items,
    customData: '<language>en-us</language>',
  });
}

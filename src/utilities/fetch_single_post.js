import fetchGhost from './fetch_ghost';

const fields = [
  'tags',
  'meta_title',
  'meta_description',
  'slug',
  'title',
  'published_at',
  'image',
  'markdown'
];

export default function fetchSinglePost(slug) {
  console.log('>>> SINGLE POST : '+slug);
  const url = `posts/slug/${slug}`
  return fetchGhost(url, {
    'include': 'tags',
    'fields': fields.join(',')
  });
}

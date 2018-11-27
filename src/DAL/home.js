import accessInterface from '@/utils/dataInterface';

export function getSpaces() {
  return accessInterface({url: '/api/spaces.json'});
}

export function getSpaceById(spaceId) {
  return accessInterface({url: '/api/space.json', params: {id: spaceId}});
}

export function getArticleById(articleId) {
  return accessInterface({url: '/api/article.json', params: {id: articleId}});
}

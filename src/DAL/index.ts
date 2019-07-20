import accessInterface from '@/utils/dataInterface';

export function getUserInfo (salt: string) {
  return accessInterface({url: '/api/user.json', params: {salt}});
}

export function getSpaces() {
  return accessInterface({url: '/api/spaces.json'});
}

export function getArticles(offset = 0, limit = 50) {
  return accessInterface({url: '/api/articles.json', params: {offset: 0, limit: 50}});
}

export function getSpaceById(spaceId: string) {
  return accessInterface({url: '/api/space.json', params: {id: spaceId}});
}

export function getArticleById(articleId: string) {
  return accessInterface({url: '/api/article.json', params: {id: articleId}});
}

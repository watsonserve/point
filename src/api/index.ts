import request, { Method } from './request'
import { Article } from '@/entities'

export function loadArticleList(offset: number = 0, limit: number = 50): Promise<Article[]> {
  return request({
    url: '/api/articles.json',
    method: Method.GET,
    data: { offset, limit }
  })
  .then(respData => respData.data)
}

export function loadArticle(articleId: string) {
  return request({ url: `/api/article/${articleId}.md`, method: Method.GET })
}

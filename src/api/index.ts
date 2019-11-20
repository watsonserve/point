import request, { Method } from './request'
import { Article } from '@/entities'

export function loadArticleList(): Promise<Article[]> {
  // return request({ url: `/api/order-set-list.json`, method: Method.GET })
  // .then(respData => respData.data)
  return Promise.resolve([
    {
      id: '123',
      title: 'http协议',
      summary: 'http协议 RFC1234',
      updateTime: 0,
    }, {
      id: '',
      title: '',
      summary: '',
      updateTime: 0,
    } as any,
  ])
}

export function loadArticle(articleId: string) {
  return request({ url: `/api/article/${articleId}.md`, method: Method.GET })
  .then(respData => respData.data)
}
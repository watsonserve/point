interface Dict {
  [word: string]: string
}

interface DictTree {
  [lang: string]: Dict
}

const dict: DictTree = {
  'zh-CN': {
    contact: '联系方式',
    phone: '电话',
    address: '地址',
    about: '关于',
    'sign-out': '退出',
    'mine': '我的',
    'booking': '预定',
    'found': '发现',
    'unit-price': '单价',
    'max-unit-price': '单价上限制',
    'order-set-dispatching': '配货中',
    'order-set-transiting': '运输中',
    'order-set-received': '已收货',
    'order-waitting': '待确认',
    'order-cancel': '已取消',
    'order-finding': '寻找中',
    'order-got': '已到手',
    'order-reject': '已驳回',
    'new-appeal': '新建诉求单',
    
  },
  'en-US': {
  },
}

dict['zh-HK'] = dict['zh-TW']
dict.zh = dict['zh-CN']
dict.en = dict['en-US']
dict['es-US'] = dict.es
dict['es-ES'] = dict.es

export default dict

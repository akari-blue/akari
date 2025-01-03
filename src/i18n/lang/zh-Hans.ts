// Simplified Chinese
export const zh_Hans = {
  auth: {
    login: {
      default: '登录',
      pending: '正在登录...',
    },
    logout: '登出',
    password: '密码',
  },
  app: {
    loading: '正在加载...',
    blueskyHandle: 'bluesky账户代码 例如：@alice.bsky.social',
    following: '正在关注',
    followers: '关注者',
    posts: '帖文',
    replies: '回复',
    reposts: '转发',
    likes: '喜欢',
    settings: '设置',
  },
  settings: {
    developerMode: {
      name: '开发者模式',
      description: '启用附加调试工具。',
    },
    streamerMode: {
      name: '流媒体模式',
      description: '隐藏敏感信息并模糊所有媒体内容。',
    },
    zenMode: {
      name: '禅模式',
      description: '隐藏所有数字。',
    },
    columns: {
      name: '列数',
      description: '在主页视图中显示多少列。',
    },
    responsiveUI: {
      name: '响应式用户界面',
      description: '选择将用户界面完全响应式或固定宽度。',
    },
    language: {
      name: '语言',
      description: '更改应用程序语言。',
    },
    font: {
      family: {
        name: '字体家族',
        description: '更改应用程序字体家族。',
      },
      size: {
        name: '字体大小',
        description: '更改应用程序字体大小。',
      },
    },
    cleanHandles: {
      name: '短账户代码',
      description: '将.bsky.social从账户代码中清除。',
    },
  },
  image: {
    noImage: '无图片',
  },
  profile: {
    profile: '个人资料',
    notFound: '未找到个人资料',
  },
  post: {
    notFound: '未找到帖文',
    blockedAuthor: '此帖文由于您将此作者屏蔽而被隐藏',
    blockedByAuthor: '此帖文由于此作者将您屏蔽而被隐藏',
  },
  error: {
    somethingWentWrong: '发生问题了',
    reloadComponent: '刷新组件',
  },
  handleSearch: {
    noResultsFound: '未找到结果',
  },
} as const;

// Cantonese
export const yue = {
  auth: {
    login: {
      default: '登入',
      pending: '登入緊 ...',
    },
    logout: '登出',
    password: '密碼',
  },
  app: {
    loading: '載入緊 ...',
    blueskyHandle: 'bluesky 帳號頭銜 例如：@alice.bsky.social',
    following: '跟緊',
    followers: '擁躉',
    posts: '帖文',
    replies: '回覆',
    reposts: '轉發',
    likes: '讚好',
    settings: '設定',
  },
  settings: {
    developerMode: {
      name: '開發人員模式',
      description: '啟用額外嘅調試工具。',
    },
    streamerMode: {
      name: '流媒體模式',
      description: '隱藏敏感資料同埋模糊所有媒體內容。',
    },
    zenMode: {
      name: '禪模式',
      description: '隱藏所有數字。',
    },
    columns: {
      name: '欄數',
      description: '喺主視圖入面要顯示幾多欄。',
    },
    responsiveUI: {
      name: '回應式用戶介面',
      description: '個用戶介面係咪應該係完全回應式定係固定闊度。',
    },
    language: {
      name: '語言',
      description: '改應用程式嘅語言。',
    },
    font: {
      family: {
        name: '字體家族',
        description: '改應用程式嘅字體系列。',
      },
      size: {
        name: '字體大小',
        description: '改應用程式嘅字體大細。',
      },
    },
    cleanHandles: {
      name: '短帳號頭銜',
      description: '喺帳號頭銜入面移除「.bsky.social」。',
    },
  },
  image: {
    noImage: '冇圖像',
  },
  profile: {
    profile: '個人檔案',
    notFound: '搵唔到個人檔案',
  },
  post: {
    notFound: '搵唔到個帖文',
    blockedAuthor: '呢個帖文係隱藏嘅，因為你封鎖咗個作者。',
    blockedByAuthor: '呢個帖文係隱藏嘅，因為作者封鎖咗你。',
  },
  error: {
    somethingWentWrong: '出現問題喇',
    reloadComponent: '重新載入組件',
  },
  handleSearch: {
    noResultsFound: '搵唔到結果',
  },
} as const;

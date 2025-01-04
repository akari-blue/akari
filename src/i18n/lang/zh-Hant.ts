// Traditional Chinese
export const zh_Hant = {
  name: '繁體中文',
  translations: {
    auth: {
      login: {
        default: '登入',
        pending: '登入中...',
      },
      logout: '註銷',
      password: '密碼',
    },
    app: {
      loading: '載入中...',
      blueskyHandle: 'bluesky帳號代碼 例如：@alice.bsky.social',
      following: '跟隨中',
      followers: '跟隨者',
      posts: '貼文',
      replies: '回覆',
      reposts: '轉發',
      likes: '喜歡',
      settings: '設定',
    },
    settings: {
      developerMode: {
        name: '開發者模式',
        description: '啟用額外的調試工具。',
      },
      streamerMode: {
        name: '串流模式',
        description: '隱藏敏感資訊並模糊所有媒體內容。',
      },
      zenMode: {
        name: '禪模式',
        description: '隱藏所有數位。',
      },
      columns: {
        name: '列數',
        description: '在主頁視圖中顯示多少列。',
      },
      responsiveUI: {
        name: '響應式使用者介面',
        description: '選擇將使用者介面完全響應式或固定寬度。',
      },
      language: {
        name: '語言',
        description: '更改應用程式語言。',
      },
      font: {
        family: {
          name: '字體家族',
          description: '更改應用程式字體家族。',
        },
        size: {
          name: '字體大小',
          description: '更改應用程式字體大小。',
        },
      },
      cleanHandles: {
        name: '短帳號代碼',
        description: '將.bsky.social從帳號代碼中清除。',
      },
    },
    image: {
      noImage: '無圖片',
    },
    profile: {
      profile: '個人檔案',
      notFound: '未找到個人檔案',
    },
    post: {
      notFound: '未找到貼文',
      blockedAuthor: '該貼文由於您將該作者封鎖而被隱藏。',
      blockedByAuthor: '該貼文由於該作者將您封鎖而被隱藏。',
    },
    error: {
      somethingWentWrong: '出現問題了',
      reloadComponent: '重新載入元件',
    },
    handleSearch: {
      noResultsFound: '未找到結果',
    },
  },
} as const;

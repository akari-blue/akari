// Japanese
export const ja = {
  auth: {
    login: {
      default: 'サインイン',
      pending: 'サインイン中...',
    },
    logout: 'サインアウト',
    password: 'パスワード',
  },
  app: {
    appName: '[placeholder name]',
    loading: 'ロード中...',
    blueskyHandle: 'blueskyハンドル　例：@alice.bsky.social',
    following: 'フォロー中',
    followers: 'フォロワー',
    posts: '投稿',
    replies: '返信',
    reposts: 'リポスト',
    likes: 'いいね',
    settings: '設定',
  },
  settings: {
    developerMode: {
      name: '開発者モード',
      description: '追加のデバッグツールを有効にします。',
    },
    streamerMode: {
      name: '配信モード',
      description: '機微情報を非表示にし、すべてのメディアコンテンツをぼかします。',
    },
    zenMode: {
      name: '禅モード',
      description: 'すべての数字を非表示にします。',
    },
    columns: {
      name: '列数',
      description: 'ホームビューに表示する列の数。',
    },
    responsiveUI: {
      name: 'レスポンシブなUI',
      description: 'UIは完全にレスポンシブにするか、固定幅にするか。',
    },
    language: {
      name: '言語',
      description: 'アプリの言語を変更します。',
    },
    font: {
      family: {
        name: 'フォントファミリ',
        description: 'アプリのフォントファミリを変更します。',
      },
      size: {
        name: 'フォントサイズ',
        description: 'アプリのフォントサイズを変更します。',
      },
    },
    cleanHandles: {
      name: 'ハンドルをクリーンする',
      description: 'ハンドルから「.bsky.social」を削除します。',
    },
  },
  image: {
    noImage: '画像なし',
  },
  profile: {
    profile: 'プロフィール',
    notFound: 'プロフィールが見つかりません',
  },
  post: {
    notFound: '投稿が見つかりません',
    blockedAuthor: '投稿者をブロックしているため、この投稿は非表示になっています。',
    blockedByAuthor: '投稿者があなたをブロックしているため、この投稿は非表示になっています。',
  },
  error: {
    somethingWentWrong: '問題が発生しました',
    reloadComponent: 'コンポーネントをリロードする',
  },
  handleSearch: {
    noResultsFound: '結果が見つかりません',
  },
} as const;

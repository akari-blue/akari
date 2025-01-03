// Japanese
export const ja = {
  auth: {
    login: {
      default: 'サインイン',
      pending: 'サインイン中...',
    },
    logout: 'サインアウト',
    password: 'パスワード',
    authFactorToken: '二要素トークン',
  },
  app: {
    loading: 'ロード中...',
    loadMore: 'さらにロードする',
    blueskyHandle: 'blueskyハンドル　例：@alice.bsky.social',
    following: 'フォロー中',
    followers: 'フォロワー',
    posts: '投稿',
    replies: '返信',
    reposts: 'リポスト',
    likes: 'いいね',
    settings: '設定',
    notFound: '見つかりません',
    save: '保存',
    optional: '任意',
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
      name: 'きれいなハンドル',
      description: 'ハンドルから「.bsky.social」を削除します。',
    },
  },
  image: {
    noImage: '画像なし',
  },
  profile: {
    profile: 'プロフィール',
    notFound: 'プロフィールが見つかりません',
    tabs: {
      all: 'すべて',
      posts: '投稿',
      media: 'メディア',
      feeds: 'フィード',
      reposts: 'リポスト',
      likes: 'いいね',
      lists: 'リスト',
      starterpacks: 'スターターパック',
    },
  },
  post: {
    notFound: '投稿が見つかりません',
    createPost: '投稿を作成',
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
  notifications: {
    notifications: '通知',
    noNotifications: '通知なし',
    followedYou: 'あなたをフォローしました',
    likedYourPost: 'あなたの投稿をいいねしました',
    repostedYourPost: 'あなたの投稿をリポストしました',
    repliedToYourPost: 'あなたの投稿に返信しました',
    mentionedYou: 'あなたについてメンションしました',
    quotedYourPost: 'あなたの投稿を引用しました',
    joinedYourStarterpack: 'あなたのスターターパックに参加しました',
    tabs: {
      all: 'すべて',
      mentions: 'メンション',
      grouped: 'グループされた',
    },
  },
  messages: {
    messages: 'メッセージ',
    noMessages: 'メッセージなし',
  },
  dialog: {
    close: '閉じる',
  },
  editor: {
    toolbar: {
      link: {
        edit: 'リンクを編集',
        openInNewTab: '新しいタブで開く',
        displayText: 'テキストを表示',
      },
      image: {
        title: '画像をアップロードする',
        description: 'コンピュータから画像をアップロードする',
        failedToLoad: '画像のロードに失敗しました',
        submit: 'サブミット',
      },
    },
  },
} as const;

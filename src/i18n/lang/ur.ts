// Urdu
export const ur = {
  name: 'اردو',
  translations: {
    auth: {
      login: {
        default: 'لاگ ان',
        pending: '... لاگ ان ہو رہا ہے',
      },
      logout: 'لاگ آؤٹ',
      password: 'پاس ورڈ',
    },
    app: {
      loading: '...لوڈ ہو رہا ہے',
      blueskyHandle: '@alice.bsky.social بلیو اسکائی ہینڈل مثلاً',
      following: 'فالو کر رہے ہیں',
      followers: 'فالوورز',
      posts: 'پوسٹس',
      replies: 'جوابات',
      reposts: 'ری پوسٹس',
      likes: 'پسند',
      settings: 'ترتیبات',
    },
    settings: {
      developerMode: {
        name: 'ڈویلپر موڈ',
        description: 'اضافی ڈیبگنگ ٹولز کو فعال کریں۔',
      },
      streamerMode: {
        name: 'اسٹریمر موڈ',
        description: 'حساس معلومات کو چھپائیں اور تمام میڈیا مواد کو دھندلا کریں۔',
      },
      zenMode: {
        name: 'زین موڈ',
        description: 'تمام نمبرز کو چھپائیں۔',
      },
      columns: {
        name: 'کالمز',
        description: 'ہوم ویو میں کتنے کالمز دکھانے ہیں۔',
      },
      responsiveUI: {
        name: 'ریسپانسو یو آئی',
        description: 'کیا یو آئی مکمل طور پر ریسپانسو ہونی چاہیے یا فکسڈ سائز؟',
      },
      language: {
        name: 'زبان',
        description: 'ایپ کی زبان تبدیل کریں۔',
      },
      font: {
        family: {
          name: 'فونٹ فیملی',
          description: 'ایپ کی فونٹ فیملی تبدیل کریں۔',
        },
        size: {
          name: 'فونٹ سائز',
          description: 'ایپ کا فونٹ سائز تبدیل کریں۔',
        },
      },
      cleanHandles: {
        name: 'صاف ہینڈلز',
        description: 'کو ہینڈلز سے ہٹا دیں۔ .bsky.social',
      },
    },
    image: {
      noImage: 'کوئی تصویر نہیں',
    },
    profile: {
      profile: 'پروفائل',
      notFound: 'پروفائل نہیں ملا',
    },
    post: {
      notFound: 'پوسٹ نہیں ملی',
      blockedAuthor: 'یہ پوسٹ چھپی ہوئی ہے کیونکہ آپ نے مصنف کو بلاک کر دیا ہے۔',
      blockedByAuthor: 'یہ پوسٹ چھپی ہوئی ہے کیونکہ مصنف نے آپ کو بلاک کر دیا ہے۔',
    },
    error: {
      somethingWentWrong: 'کوہی چیز غلط ہو گئی',
      reloadComponent: 'کمپوننٹ کو دوبارہ لوڈ کریں',
    },
    handleSearch: {
      noResultsFound: 'کوئی نتائج نہیں ملے',
    },
    debug: {
      notImplemented: 'ابھی نہیں کیا گیا: {{value}}',
    },
  },
} as const;

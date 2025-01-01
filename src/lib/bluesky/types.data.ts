import { BSkyNotification } from './types/BSkyNotification';
import { BSkyPost } from './types/BSkyPost';

export const textPost = {
  uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lei22stup22j',
  cid: 'bafyreihbw2joqkbrnr5lxu7cv6ngkmdk43xropvsylmu6wcnxo5fuho62a',
  author: {
    did: 'did:plc:k6acu4chiwkixvdedcmdgmal',
    handle: 'imlunahey.com',
    displayName: 'luna',
    avatar:
      'https://cdn.bsky.app/img/avatar/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreihwjqusqk5wyahldrx4spchtozxce6vpd47p2wyfccg2pvhrc3hya@jpeg',
    associated: {
      chat: {
        allowIncoming: 'following',
      },
    },
    viewer: {
      muted: false,
      blockedBy: false,
    },
    labels: [],
    createdAt: '2024-10-21T12:09:53.506Z',
  },
  record: {
    $type: 'app.bsky.feed.post',
    createdAt: '2024-12-29T22:13:30.980Z',
    langs: ['en'],
    text: 'oh neat. we hit 45k 👀',
  },
  replyCount: 1,
  repostCount: 1,
  likeCount: 35,
  quoteCount: 0,
  indexedAt: '2024-12-29T22:13:31.860Z',
  viewer: {
    threadMuted: false,
    embeddingDisabled: false,
    pinned: false,
  },
  labels: [],
} satisfies BSkyPost;

export const textPostWithFacets = {
  uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lebmeaogd42j',
  cid: 'bafyreihfkkavvml22qlpxvtvr5c6zsooypdqtqa7posqhb3arzeiuwrjva',
  author: {
    did: 'did:plc:k6acu4chiwkixvdedcmdgmal',
    handle: 'imlunahey.com',
    displayName: 'luna',
    avatar:
      'https://cdn.bsky.app/img/avatar/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreihwjqusqk5wyahldrx4spchtozxce6vpd47p2wyfccg2pvhrc3hya@jpeg',
    associated: {
      chat: {
        allowIncoming: 'following',
      },
    },
    viewer: {
      muted: false,
      blockedBy: false,
    },
    labels: [],
    createdAt: '2024-10-21T12:09:53.506Z',
  },
  record: {
    $type: 'app.bsky.feed.post',
    createdAt: '2024-12-27T08:52:15.873Z',
    facets: [
      {
        features: [
          {
            $type: 'app.bsky.richtext.facet#link',
            uri: 'https://google.com',
          },
        ],
        index: {
          byteEnd: 16,
          byteStart: 8,
        },
      },
      {
        features: [
          {
            $type: 'app.bsky.richtext.facet#link',
            uri: 'https://google.com',
          },
        ],
        index: {
          byteEnd: 22,
          byteStart: 17,
        },
      },
      {
        features: [
          {
            $type: 'app.bsky.richtext.facet#bold',
          },
        ],
        index: {
          byteEnd: 28,
          byteStart: 24,
        },
      },
      {
        features: [
          {
            $type: 'app.bsky.richtext.facet#italic',
          },
        ],
        index: {
          byteEnd: 47,
          byteStart: 33,
        },
      },
      {
        features: [
          {
            $type: 'app.bsky.richtext.facet#underline',
          },
        ],
        index: {
          byteEnd: 56,
          byteStart: 47,
        },
      },
    ],
    text: 'testing newlines.\nlinks, bold and italic, maybe underline?\nunordered lists?\n• first item\n\n• second item\n\nordered lists?\n1. first item\n2. second item\nordered lists with custom start?\n5. this is the first item',
  },
  replyCount: 3,
  repostCount: 0,
  likeCount: 15,
  quoteCount: 1,
  indexedAt: '2024-12-27T08:52:16.852Z',
  viewer: {
    threadMuted: false,
    embeddingDisabled: false,
    pinned: false,
  },
  labels: [],
} satisfies BSkyPost;

export const imagePost = {
  uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lb5gdqzpxc2k',
  cid: 'bafyreihrynwidoou2jwka2alhq5vgublpigee6raflhwpgj7cduyhbx5r4',
  author: {
    did: 'did:plc:k6acu4chiwkixvdedcmdgmal',
    handle: 'imlunahey.com',
    displayName: 'luna',
    avatar:
      'https://cdn.bsky.app/img/avatar/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreihwjqusqk5wyahldrx4spchtozxce6vpd47p2wyfccg2pvhrc3hya@jpeg',
    associated: {
      chat: {
        allowIncoming: 'following',
      },
    },
    viewer: {
      muted: false,
      blockedBy: false,
    },
    labels: [],
    createdAt: '2024-10-21T12:09:53.506Z',
  },
  record: {
    $type: 'app.bsky.feed.post',
    createdAt: '2024-11-17T12:38:23.960Z',
    embed: {
      $type: 'app.bsky.embed.recordWithMedia',
      media: {
        $type: 'app.bsky.embed.images',
        images: [
          {
            alt: 'collectible pokémon games.  ',
            aspectRatio: {
              height: 2000,
              width: 1500,
            },
            image: {
              $type: 'blob',
              ref: {
                $link: 'bafkreib2t4dln5wboep3lbvrouk2mx4wgxdjgw72d2cx22tj7pfeepedkq',
              },
              mimeType: 'image/jpeg',
              size: 901908,
            },
          },
        ],
      },
      record: {
        $type: 'app.bsky.embed.record',
        record: {
          cid: 'bafyreicmvaku42qrcx3cbcsmivomcueschuwaszg7375r3bbj27543m6xi',
          uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lb5eaivmbb2s',
        },
      },
    },
    langs: ['en'],
    text: 'it wasn’t just 360 games either btw. i had a MASSIVE collection.',
  },
  embed: {
    $type: 'app.bsky.embed.recordWithMedia#view',
    media: {
      $type: 'app.bsky.embed.images#view',
      images: [
        {
          thumb:
            'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreib2t4dln5wboep3lbvrouk2mx4wgxdjgw72d2cx22tj7pfeepedkq@jpeg',
          fullsize:
            'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreib2t4dln5wboep3lbvrouk2mx4wgxdjgw72d2cx22tj7pfeepedkq@jpeg',
          alt: 'collectible pokémon games.  ',
          aspectRatio: {
            height: 2000,
            width: 1500,
          },
        },
      ],
    },
    record: {
      record: {
        $type: 'app.bsky.embed.record#viewRecord',
        uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lb5eaivmbb2s',
        cid: 'bafyreicmvaku42qrcx3cbcsmivomcueschuwaszg7375r3bbj27543m6xi',
        author: {
          did: 'did:plc:k6acu4chiwkixvdedcmdgmal',
          handle: 'imlunahey.com',
          displayName: 'luna',
          avatar:
            'https://cdn.bsky.app/img/avatar/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreihwjqusqk5wyahldrx4spchtozxce6vpd47p2wyfccg2pvhrc3hya@jpeg',
          associated: {
            chat: {
              allowIncoming: 'following',
            },
          },
          viewer: {
            muted: false,
            blockedBy: false,
          },
          labels: [],
          createdAt: '2024-10-21T12:09:53.506Z',
        },
        value: {
          $type: 'app.bsky.feed.post',
          createdAt: '2024-11-17T12:00:47.287Z',
          embed: {
            $type: 'app.bsky.embed.images',
            images: [
              {
                alt: 'a few hundred xbox 360 games  ',
                aspectRatio: {
                  height: 2000,
                  width: 1500,
                },
                image: {
                  $type: 'blob',
                  ref: {
                    $link: 'bafkreia6wskimpbbyfollz6gdhjyif5ddc3mnoxgkcpndzdb7yaoqxh7dq',
                  },
                  mimeType: 'image/jpeg',
                  size: 971782,
                },
              },
            ],
          },
          langs: ['en'],
          text: 'i miss my xbox 360 collection',
        },
        labels: [],
        likeCount: 177,
        replyCount: 28,
        repostCount: 4,
        quoteCount: 4,
        indexedAt: '2024-11-17T12:00:52.255Z',
        embeds: [
          {
            $type: 'app.bsky.embed.images#view',
            images: [
              {
                thumb:
                  'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreia6wskimpbbyfollz6gdhjyif5ddc3mnoxgkcpndzdb7yaoqxh7dq@jpeg',
                fullsize:
                  'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreia6wskimpbbyfollz6gdhjyif5ddc3mnoxgkcpndzdb7yaoqxh7dq@jpeg',
                alt: 'a few hundred xbox 360 games  ',
                aspectRatio: {
                  height: 2000,
                  width: 1500,
                },
              },
            ],
          },
        ],
      },
    },
  },
  replyCount: 5,
  repostCount: 3,
  likeCount: 75,
  quoteCount: 1,
  indexedAt: '2024-11-17T12:38:28.141Z',
  viewer: {
    repost: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.repost/3legaiztyob2o',
    threadMuted: false,
    embeddingDisabled: false,
    pinned: false,
  },
  labels: [],
} satisfies BSkyPost;

const quotedPost = {
  uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lemuaobklc22',
  cid: 'bafyreibf3popjcolqjatrlurbpb6nd4rsjxwkbzu4mknglp6gfnnvrldje',
  author: {
    did: 'did:plc:k6acu4chiwkixvdedcmdgmal',
    handle: 'imlunahey.com',
    displayName: 'luna',
    avatar:
      'https://cdn.bsky.app/img/avatar/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreihwjqusqk5wyahldrx4spchtozxce6vpd47p2wyfccg2pvhrc3hya@jpeg',
    associated: {
      chat: {
        allowIncoming: 'following',
      },
    },
    viewer: {
      muted: false,
      blockedBy: false,
    },
    labels: [],
    createdAt: '2024-10-21T12:09:53.506Z',
  },
  record: {
    $type: 'app.bsky.feed.post',
    createdAt: '2024-12-31T20:12:43.753Z',
    embed: {
      $type: 'app.bsky.embed.record',
      record: {
        cid: 'bafyreiax5pfouwerovjaezay5vwxlempfqolrgy2mkufziu5mwonkpahim',
        uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lemu7or24k22',
      },
    },
    langs: ['en'],
    text: '“luna how can you know this”\n\nif i keep saying it eventually it’ll happen lol',
  },
  embed: {
    $type: 'app.bsky.embed.record#view',
    record: {
      $type: 'app.bsky.embed.record#viewRecord',
      uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lemu7or24k22',
      cid: 'bafyreiax5pfouwerovjaezay5vwxlempfqolrgy2mkufziu5mwonkpahim',
      author: {
        did: 'did:plc:k6acu4chiwkixvdedcmdgmal',
        handle: 'imlunahey.com',
        displayName: 'luna',
        avatar:
          'https://cdn.bsky.app/img/avatar/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreihwjqusqk5wyahldrx4spchtozxce6vpd47p2wyfccg2pvhrc3hya@jpeg',
        associated: {
          chat: {
            allowIncoming: 'following',
          },
        },
        viewer: {
          muted: false,
          blockedBy: false,
        },
        labels: [],
        createdAt: '2024-10-21T12:09:53.506Z',
      },
      value: {
        $type: 'app.bsky.feed.post',
        createdAt: '2024-12-31T20:12:10.704Z',
        embed: {
          $type: 'app.bsky.embed.record',
          record: {
            cid: 'bafyreickq64ieftqlzcmnnq7rx55j2xqopfcgpicssh4rahrmiykabqxdq',
            uri: 'at://did:plc:62fii2ns7hvdzlg6h6kwnfdw/app.bsky.feed.post/3lemu5hqejs2z',
          },
        },
        langs: ['en'],
        text: 'spoiler trump dies in 2025 👀',
      },
      labels: [],
      likeCount: 11,
      replyCount: 0,
      repostCount: 2,
      quoteCount: 2,
      indexedAt: '2024-12-31T20:12:11.746Z',
      embeds: [
        {
          $type: 'app.bsky.embed.record#view',
          record: {
            $type: 'app.bsky.embed.record#viewRecord',
            uri: 'at://did:plc:62fii2ns7hvdzlg6h6kwnfdw/app.bsky.feed.post/3lemu5hqejs2z',
            cid: 'bafyreickq64ieftqlzcmnnq7rx55j2xqopfcgpicssh4rahrmiykabqxdq',
            author: {
              did: 'did:plc:62fii2ns7hvdzlg6h6kwnfdw',
              handle: 'madkris.fyi',
              displayName: 'MadKris',
              avatar:
                'https://cdn.bsky.app/img/avatar/plain/did:plc:62fii2ns7hvdzlg6h6kwnfdw/bafkreia7m6aphuwkpkrf6jpzielaghxz33yi2osnn5fc3chop3ktt2g6jm@jpeg',
              associated: {
                chat: {
                  allowIncoming: 'all',
                },
              },
              viewer: {
                muted: false,
                blockedBy: false,
                following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3laxcuz3kvr26',
                followedBy: 'at://did:plc:62fii2ns7hvdzlg6h6kwnfdw/app.bsky.graph.follow/3laxxoyst4v2f',
              },
              labels: [],
              createdAt: '2024-10-17T21:14:01.309Z',
            },
            value: {
              $type: 'app.bsky.feed.post',
              createdAt: '2024-12-31T20:10:56.235Z',
              langs: ['en'],
              reply: {
                parent: {
                  cid: 'bafyreifb4ks77jtasth6c6qvjvvsrqcnr3pwwox275o4fup6qjvomvbd6m',
                  uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lemtx7gn7c22',
                },
                root: {
                  cid: 'bafyreifb4ks77jtasth6c6qvjvvsrqcnr3pwwox275o4fup6qjvomvbd6m',
                  uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lemtx7gn7c22',
                },
              },
              text: "Good morning)\nHow's it in 2025? \nI'm still in 2024 and I'm curious :D",
            },
            labels: [],
            likeCount: 1,
            replyCount: 0,
            repostCount: 0,
            quoteCount: 1,
            indexedAt: '2024-12-31T20:10:57.247Z',
          },
        },
      ],
    },
  },
  replyCount: 4,
  repostCount: 1,
  likeCount: 22,
  quoteCount: 0,
  indexedAt: '2024-12-31T20:12:44.146Z',
  viewer: {
    threadMuted: false,
    embeddingDisabled: false,
    pinned: false,
  },
  labels: [],
} satisfies BSkyPost;

export const testPosts = [textPost, imagePost, quotedPost] satisfies BSkyPost[];

export const followNotification = {
  uri: 'at://did:plc:gxrpjvmwpcwjoe5nef3r56bj/app.bsky.graph.follow/3len6ki45562y',
  cid: 'bafyreifxh2dplxf4hfy4isrsm2erqkk5tmjrhpg4hw4dilgycdi3dy2opu',
  author: {
    did: 'did:plc:gxrpjvmwpcwjoe5nef3r56bj',
    handle: 'musa221.bsky.social',
    displayName: '',
    avatar:
      'https://cdn.bsky.app/img/avatar/plain/did:plc:gxrpjvmwpcwjoe5nef3r56bj/bafkreibt43jqutqfect423sv6ekmyfw5wfl67kczbp636o3fzitzpnjsi4@jpeg',
    viewer: {
      muted: false,
      blockedBy: false,
      followedBy: 'at://did:plc:gxrpjvmwpcwjoe5nef3r56bj/app.bsky.graph.follow/3len6ki45562y',
    },
    labels: [],
    createdAt: '2024-12-11T10:50:28.150Z',
    indexedAt: '2024-12-11T10:53:47.650Z',
  },
  reason: 'follow',
  record: {
    $type: 'app.bsky.graph.follow',
    createdAt: '2024-12-31T23:17:10.080Z',
    subject: 'did:plc:k6acu4chiwkixvdedcmdgmal',
  },
  isRead: false,
  indexedAt: '2024-12-31T23:17:10.080Z',
  labels: [],
} satisfies BSkyNotification;

export const likeNotification = {
  uri: 'at://did:plc:6tjudimst5omfxdm473kysdy/app.bsky.feed.like/3len6twbdqm2c',
  cid: 'bafyreicp6dcl3m25gzrdayl6ybhz6445ofpxlfb2uwhc5gfdlenqha35tu',
  author: {
    did: 'did:plc:6tjudimst5omfxdm473kysdy',
    handle: 'mwdfroggatt.bsky.social',
    displayName: 'Mike Froggatt',
    avatar:
      'https://cdn.bsky.app/img/avatar/plain/did:plc:6tjudimst5omfxdm473kysdy/bafkreic3saqzjf6ytejowytppnjdowmcbzhpzwgles4mvpm2n5gdzglrsm@jpeg',
    viewer: {
      muted: false,
      blockedBy: false,
      following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3lagbqmidpn26',
      followedBy: 'at://did:plc:6tjudimst5omfxdm473kysdy/app.bsky.graph.follow/3lajxsjhwqf2o',
    },
    labels: [
      {
        src: 'did:plc:6tjudimst5omfxdm473kysdy',
        uri: 'at://did:plc:6tjudimst5omfxdm473kysdy/app.bsky.actor.profile/self',
        cid: 'bafyreihufbn65w5xv7rlniyqc55rmsw6eu7x4etld3tuzmosw7n6gq5aii',
        val: '!no-unauthenticated',
        cts: '1970-01-01T00:00:00.000Z',
      },
    ],
    createdAt: '2023-11-21T16:35:59.477Z',
    description:
      "Miku is coming. Look busy. \nミクが来るよ。忙しい振りをしよう！ \nXbox ATG manager for EMEA / APAC \nXbox ATG国際部のマネージャー。\nOpinions neither Microsoft's nor Miku's \nマイクロソフトの意見でもミクの意見でもない\n(Also: Shoegaze)\n（シューゲイズもあるかも）\n\n\nhttp://www.linkedin.com/in/mwdfroggatt",
    indexedAt: '2024-12-02T17:19:53.545Z',
  },
  reason: 'like',
  reasonSubject: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lemyi37p722s',
  record: {
    $type: 'app.bsky.feed.like',
    createdAt: '2024-12-31T23:22:26.924Z',
    subject: {
      cid: 'bafyreidjmn4joya5tapeek6xhgkixqcvshg6m623rowmg47ou5zisw5kom',
      uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lemyi37p722s',
    },
  },
  isRead: false,
  indexedAt: '2024-12-31T23:22:26.924Z',
  labels: [],
} satisfies BSkyNotification;

export const testNotifications = [followNotification, likeNotification] satisfies BSkyNotification[];

type BskyPostLabel = {
  src: `did:${string}`;
  uri: `at://did:${string}`;
  cid: string;
  val: string;
  cts: string;
};

type BskyPostEmbed =
  | {
      $type: 'app.bsky.embed.external#view';
      external: {
        uri: string;
        title: string;
        description: string;
        thumb: string;
      };
    }
  | {
      $type: 'app.bsky.embed.images#view';
      images: [
        {
          thumb: string;
          fullsize: string;
          alt: string;
          aspectRatio: {
            height: number;
            width: number;
          };
        },
      ];
    }
  | {
      $type: 'app.bsky.embed.record#view';
      record: {
        $type: 'app.bsky.embed.record#viewRecord';
        uri: `at://did:${string}`;
        cid: string;
        author: {
          did: `did:plc:${string}`;
          handle: string;
          displayName: string;
          avatar: string;
          associated: {
            chat: {
              allowIncoming: 'all' | 'following';
            };
          };
          viewer: {
            muted: boolean;
            blockedBy: boolean;
            following: `at://did:${string}`;
            followedBy?: `at://did:${string}`;
          };
          labels: BskyPostLabel[];
          createdAt: string;
        };
        value: {
          $type: 'app.bsky.feed.post';
          createdAt: string;
          embed?:
            | {
                $type: 'app.bsky.embed.external';
                external: {
                  description: string;
                  thumb: {
                    $type: 'blob';
                    ref: {
                      $link: string;
                    };
                    mimeType: string;
                    size: number;
                  };
                  title: string;
                  uri: string;
                };
              }
            | {
                $type: 'app.bsky.embed.images';
                images: [
                  {
                    alt: string;
                    aspectRatio: {
                      height: number;
                      width: number;
                    };
                    image: {
                      $type: 'blob';
                      ref: {
                        $link: string;
                      };
                      mimeType: string;
                      size: number;
                    };
                  },
                ];
              };
          facets?: [
            {
              features: [
                {
                  $type: 'app.bsky.richtext.facet#tag';
                  tag: string;
                },
              ];
              index: {
                byteEnd: number;
                byteStart: number;
              };
            },
            {
              features: [
                {
                  $type: 'app.bsky.richtext.facet#link';
                  uri: string;
                },
              ];
              index: {
                byteEnd: number;
                byteStart: number;
              };
            },
          ];
          langs: ['en'];
          text: string;
          reply?: {
            parent: {
              cid: string;
              uri: `at://did:${string}`;
            };
            root: {
              cid: string;
              uri: `at://did:${string}`;
            };
          };
        };
        labels: BskyPostLabel[];
        likeCount: number;
        replyCount: number;
        repostCount: number;
        quoteCount: number;
        indexedAt: string;
        embeds:
          | {
              $type: 'app.bsky.embed.external#view';
              external: {
                uri: string;
                title: string;
                description: string;
                thumb: string;
              };
            }
          | {
              $type: 'app.bsky.embed.images#view';
              images: [
                {
                  thumb: string;
                  fullsize: string;
                  alt: string;
                  aspectRatio: {
                    height: number;
                    width: number;
                  };
                },
              ];
            }[];
      };
    }
  | {
      $type: 'app.bsky.embed.video#view';
      cid: string;
      playlist: string;
      thumbnail: string;
      aspectRatio: {
        height: number;
        width: number;
      };
    };

export type BskyPost = {
  uri: `at://did:${string}`;
  cid: string;
  author: {
    did: `did:${string}`;
    handle: string;
    displayName: string;
    avatar: string;
    associated?: {
      chat: {
        allowIncoming: 'all' | 'following';
      };
    };
    viewer: {
      muted: boolean;
      blockedBy: boolean;
      following: `at://did:${string}`;
      followedBy?: `at://did:${string}`;
    };
    labels?: BskyPostLabel[];
    createdAt: string;
  };
  record: {
    $type: 'app.bsky.feed.post';
    createdAt: string;
    embed?:
      | {
          $type: 'app.bsky.embed.external';
          external: {
            description: string;
            thumb: {
              $type: 'blob';
              ref: {
                $link: string;
              };
              mimeType: string;
              size: number;
            };
          };
        }
      | {
          $type: 'app.bsky.embed.images';
          images: [
            {
              alt: string;
              aspectRatio: {
                height: number;
                width: number;
              };
              image: {
                $type: 'blob';
                ref: {
                  $link: string;
                };
                mimeType: string;
                size: number;
              };
            },
          ];
        }
      | {
          $type: 'app.bsky.embed.record';
          record: {
            cid: string;
            uri: `at://did:${string}`;
          };
        }
      | {
          $type: 'app.bsky.embed.video';
          aspectRatio: {
            height: number;
            width: number;
          };
          video: {
            $type: 'blob';
            ref: {
              $link: string;
            };
            mimeType: string;
            size: number;
          };
        };
    facets?: {
      features: [
        {
          $type: 'app.bsky.richtext.facet#link';
          uri: string;
        },
      ];
      index: {
        byteEnd: number;
        byteStart: number;
      };
    }[];
    langs?: ('en' | 'de')[];
    reply?: unknown;
    text: string;
  };
  embed?: BskyPostEmbed;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  quoteCount: number;
  indexedAt: string;
  viewer: {
    threadMuted: boolean;
    embeddingDisabled: boolean;
    replyDisabled?: boolean;
    like?: `at://did:${string}`;
    repost?: `at://did:${string}`;
  };
  labels: [];
  threadgate?: {
    uri: `at://did:${string}`;
    cid: string;
    record: {
      $type: 'app.bsky.feed.threadgate';
      allow: (
        | {
            $type: 'app.bsky.feed.threadgate#followingRule';
          }
        | {
            $type: 'app.bsky.feed.threadgate#mentionRule';
          }
        | {
            $type: 'app.bsky.feed.threadgate#listRule';
            list: `at://did:${string}`;
          }
      )[];
      createdAt: string;
      post: `at://did:${string}`;
    };
    lists: [
      {
        uri: `at://did:${string}`;
        cid: string;
        name: string;
        purpose: 'app.bsky.graph.defs#curatelist';
        listItemCount: number;
        indexedAt: string;
        labels: [];
        viewer: {
          muted: boolean;
        };
      },
    ];
  };
};

// @ts-expect-error - this is a test post object
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testPost = [
  {
    uri: 'at://did:plc:mdjhvva6vlrswsj26cftjttd/app.bsky.feed.post/3lcuect7qz22s',
    cid: 'bafyreiddumzre6wvi72cjpzak5rbuwkcx7jy5yeqwvqijthlrb4nxsj3s4',
    author: {
      did: 'did:plc:mdjhvva6vlrswsj26cftjttd',
      handle: 'laurenshof.online',
      displayName: 'Laurens',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:mdjhvva6vlrswsj26cftjttd/bafkreibbttnj2runfdsfenqzb6zd74pxhmdvd2kuakei6ynu5gmg4n3wmq@jpeg',
      associated: {
        chat: {
          allowIncoming: 'all',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3la73hwfxdv2s',
      },
      labels: [],
      createdAt: '2023-05-16T13:33:37.802Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-09T08:58:30.827Z',
      embed: {
        $type: 'app.bsky.embed.record',
        record: {
          cid: 'bafyreidbhljqocbcnygac6xdyzzogml6uhkilujtlbgi4ftiut2njmqeoq',
          uri: 'at://did:plc:kkf4naxqmweop7dv4l2iqqf5/app.bsky.feed.post/3lcsbe56kws2m',
        },
      },
      langs: ['en'],
      text: 'its funny how every other microblogging platform (Threads, Farcaster, Mastodon) is rushing to copy Bluesky and add Starter Packs while Bluesky is slowly coming to the realisation that Starter Packs might be bad actually',
    },
    embed: {
      $type: 'app.bsky.embed.record#view',
      record: {
        $type: 'app.bsky.embed.record#viewRecord',
        uri: 'at://did:plc:kkf4naxqmweop7dv4l2iqqf5/app.bsky.feed.post/3lcsbe56kws2m',
        cid: 'bafyreidbhljqocbcnygac6xdyzzogml6uhkilujtlbgi4ftiut2njmqeoq',
        author: {
          did: 'did:plc:kkf4naxqmweop7dv4l2iqqf5',
          handle: 'aendra.com',
          displayName: 'ændra.',
          avatar:
            'https://cdn.bsky.app/img/avatar/plain/did:plc:kkf4naxqmweop7dv4l2iqqf5/bafkreiaqkfr6ikrkn2hj2tcapzmcxtkc3qo6hqwjvg4kn7r5f2cmbisstu@jpeg',
          associated: {
            chat: {
              allowIncoming: 'all',
            },
          },
          viewer: {
            muted: false,
            blockedBy: false,
            following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3lagt4pzhee2n',
          },
          labels: [],
          createdAt: '2023-05-04T16:59:41.121Z',
        },
        value: {
          $type: 'app.bsky.feed.post',
          createdAt: '2024-12-08T13:00:14.127Z',
          langs: ['en'],
          reply: {
            parent: {
              cid: 'bafyreiaqvbmhdgxt537holkkkkn2idjluzshxicbg6testdlkm2z7gttua',
              uri: 'at://did:plc:p2cp5gopk7mgjegy6wadk3ep/app.bsky.feed.post/3lcsbb3hscc2l',
            },
            root: {
              cid: 'bafyreifx2n4rto7hkvlddjxdumgqiqphuyslpz6midui23lzyqtuztl7km',
              uri: 'at://did:plc:kkf4naxqmweop7dv4l2iqqf5/app.bsky.feed.post/3lcs6oclyvc2m',
            },
          },
          text: "It's starter packs. I had a bunch of people follow me thinking I'm going to spoon-feed and dumb down every post because I'm in a journalism starter pack and are then astonished when they realise the reason these bizarre impenetrable posts are in their timeline is because they in fact follow me.",
        },
        labels: [],
        likeCount: 199,
        replyCount: 8,
        repostCount: 3,
        quoteCount: 10,
        indexedAt: '2024-12-08T13:00:13.550Z',
        embeds: [],
      },
    },
    replyCount: 5,
    repostCount: 3,
    likeCount: 23,
    quoteCount: 0,
    indexedAt: '2024-12-09T08:58:31.101Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:ia76kvnndjutgedggx2ibrem/app.bsky.feed.post/3lctnx5emt2tp',
    cid: 'bafyreide5uijsss22qffiao43db5gcajy4fom3uyz3m7gegwt4u5pzwyxe',
    author: {
      did: 'did:plc:ia76kvnndjutgedggx2ibrem',
      handle: 'mary.my.id',
      displayName: 'mary🐇',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:ia76kvnndjutgedggx2ibrem/bafkreiesgyo7ukzqhs5mmtulvovzrbbru7ztvopwdwfsvllu553qgfmxd4@jpeg',
      associated: {
        chat: {
          allowIncoming: 'all',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3l7v4nouqfz2d',
        followedBy: 'at://did:plc:ia76kvnndjutgedggx2ibrem/app.bsky.graph.follow/3lai3g74xzf2w',
      },
      labels: [],
      createdAt: '2023-10-14T22:32:58.570Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-09T02:18:16.500Z',
      embed: {
        $type: 'app.bsky.embed.images',
        images: [
          {
            alt: '',
            aspectRatio: {
              height: 2374,
              width: 1080,
            },
            image: {
              $type: 'blob',
              ref: {
                $link: 'bafkreifdzwzjohbzz2miharj6c54m2afmxzo7xtpfryyru73ftknwwoene',
              },
              mimeType: 'image/jpeg',
              size: 753873,
            },
          },
        ],
      },
      facets: [],
      langs: ['en'],
      text: 'who the hell is registering nostr bridge accounts via did:web',
    },
    embed: {
      $type: 'app.bsky.embed.images#view',
      images: [
        {
          thumb:
            'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:ia76kvnndjutgedggx2ibrem/bafkreifdzwzjohbzz2miharj6c54m2afmxzo7xtpfryyru73ftknwwoene@jpeg',
          fullsize:
            'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:ia76kvnndjutgedggx2ibrem/bafkreifdzwzjohbzz2miharj6c54m2afmxzo7xtpfryyru73ftknwwoene@jpeg',
          alt: '',
          aspectRatio: {
            height: 2374,
            width: 1080,
          },
        },
      ],
    },
    replyCount: 2,
    repostCount: 3,
    likeCount: 51,
    quoteCount: 5,
    indexedAt: '2024-12-09T02:18:23.407Z',
    viewer: {
      threadMuted: false,
      replyDisabled: false,
      embeddingDisabled: false,
    },
    labels: [],
    threadgate: {
      uri: 'at://did:plc:ia76kvnndjutgedggx2ibrem/app.bsky.feed.threadgate/3lctnx5emt2tp',
      cid: 'bafyreieaqrhudez4tjzausuufoxvoqncpjlyav2jol3tupsu326wvy35de',
      record: {
        $type: 'app.bsky.feed.threadgate',
        allow: [
          {
            $type: 'app.bsky.feed.threadgate#followingRule',
          },
          {
            $type: 'app.bsky.feed.threadgate#mentionRule',
          },
          {
            $type: 'app.bsky.feed.threadgate#listRule',
            list: 'at://did:plc:ia76kvnndjutgedggx2ibrem/app.bsky.graph.list/3kf7nikggcn22',
          },
        ],
        createdAt: '2024-12-09T02:18:16.500Z',
        post: 'at://did:plc:ia76kvnndjutgedggx2ibrem/app.bsky.feed.post/3lctnx5emt2tp',
      },
      lists: [
        {
          uri: 'at://did:plc:ia76kvnndjutgedggx2ibrem/app.bsky.graph.list/3kf7nikggcn22',
          cid: 'bafyreielzik5u3fwkhprr3rsspcvodzkirpobzlptukbfb5yhbwwbr76bi',
          name: 'Other follows',
          purpose: 'app.bsky.graph.defs#curatelist',
          listItemCount: 14,
          indexedAt: '2023-11-28T02:06:13.000Z',
          labels: [],
          viewer: {
            muted: false,
          },
        },
      ],
    },
  },
  {
    uri: 'at://did:plc:mfl5calppp7zoa44zt6pymie/app.bsky.feed.post/3lcu34gxo5c2q',
    cid: 'bafyreig3i76vel4y6bxdacdj66btqwz5ukql3q4ytiy5u3ywtkbqn44sw4',
    author: {
      did: 'did:plc:mfl5calppp7zoa44zt6pymie',
      handle: 'lukeacl.com',
      displayName: 'Lukas 🏳️‍🌈✈️',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:mfl5calppp7zoa44zt6pymie/bafkreihtsar6zuupf6fij55srzcmgx2b43lzcwxpeazfyhlveivpdp735u@jpeg',
      associated: {
        chat: {
          allowIncoming: 'following',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3ladjujlmxi2r',
        followedBy: 'at://did:plc:mfl5calppp7zoa44zt6pymie/app.bsky.graph.follow/3ladtes6dbc2y',
      },
      labels: [
        {
          src: 'did:plc:mfl5calppp7zoa44zt6pymie',
          uri: 'at://did:plc:mfl5calppp7zoa44zt6pymie/app.bsky.actor.profile/self',
          cid: 'bafyreiailr2vbtlvz6odi7jmvkz4nc4xhfme6lvmmzuqlodkgm5iljd3gi',
          val: '!no-unauthenticated',
          cts: '2024-11-24T22:28:52.888Z',
        },
      ],
      createdAt: '2023-06-08T22:55:37.989Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-09T06:13:52.977Z',
      embed: {
        $type: 'app.bsky.embed.record',
        record: {
          cid: 'bafyreicv6st2zq7rrcyiflznq7ngw4tbdvwftjtwsfb66x5e3r4gftjaou',
          uri: 'at://did:plc:mfl5calppp7zoa44zt6pymie/app.bsky.feed.post/3lctptvxilk2q',
        },
      },
      langs: ['en'],
      text: 'I survived! Home now. 🛬',
    },
    embed: {
      $type: 'app.bsky.embed.record#view',
      record: {
        $type: 'app.bsky.embed.record#viewRecord',
        uri: 'at://did:plc:mfl5calppp7zoa44zt6pymie/app.bsky.feed.post/3lctptvxilk2q',
        cid: 'bafyreicv6st2zq7rrcyiflznq7ngw4tbdvwftjtwsfb66x5e3r4gftjaou',
        author: {
          did: 'did:plc:mfl5calppp7zoa44zt6pymie',
          handle: 'lukeacl.com',
          displayName: 'Lukas 🏳️‍🌈✈️',
          avatar:
            'https://cdn.bsky.app/img/avatar/plain/did:plc:mfl5calppp7zoa44zt6pymie/bafkreihtsar6zuupf6fij55srzcmgx2b43lzcwxpeazfyhlveivpdp735u@jpeg',
          associated: {
            chat: {
              allowIncoming: 'following',
            },
          },
          viewer: {
            muted: false,
            blockedBy: false,
            following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3ladjujlmxi2r',
            followedBy: 'at://did:plc:mfl5calppp7zoa44zt6pymie/app.bsky.graph.follow/3ladtes6dbc2y',
          },
          labels: [
            {
              src: 'did:plc:mfl5calppp7zoa44zt6pymie',
              uri: 'at://did:plc:mfl5calppp7zoa44zt6pymie/app.bsky.actor.profile/self',
              cid: 'bafyreiailr2vbtlvz6odi7jmvkz4nc4xhfme6lvmmzuqlodkgm5iljd3gi',
              val: '!no-unauthenticated',
              cts: '2024-11-24T22:28:52.888Z',
            },
          ],
          createdAt: '2023-06-08T22:55:37.989Z',
        },
        value: {
          $type: 'app.bsky.feed.post',
          createdAt: '2024-12-09T02:52:15.550Z',
          embed: {
            $type: 'app.bsky.embed.images',
            images: [
              {
                alt: 'Me',
                aspectRatio: {
                  height: 2000,
                  width: 1500,
                },
                image: {
                  $type: 'blob',
                  ref: {
                    $link: 'bafkreie72xk2vzgbkjlz23oisapsm2cquhgoilcnfnml6winbseyldy2qu',
                  },
                  mimeType: 'image/jpeg',
                  size: 566821,
                },
              },
            ],
          },
          langs: ['en'],
          text: 'Yeah anyway. Can’t chat anymore. Gotta go fly. Please accept this fluorescent illuminated picture of me getting ready to head back to the plane.',
        },
        labels: [],
        likeCount: 235,
        replyCount: 20,
        repostCount: 1,
        quoteCount: 1,
        indexedAt: '2024-12-09T02:52:20.007Z',
        embeds: [
          {
            $type: 'app.bsky.embed.images#view',
            images: [
              {
                thumb:
                  'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:mfl5calppp7zoa44zt6pymie/bafkreie72xk2vzgbkjlz23oisapsm2cquhgoilcnfnml6winbseyldy2qu@jpeg',
                fullsize:
                  'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:mfl5calppp7zoa44zt6pymie/bafkreie72xk2vzgbkjlz23oisapsm2cquhgoilcnfnml6winbseyldy2qu@jpeg',
                alt: 'Me',
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
    replyCount: 2,
    repostCount: 0,
    likeCount: 53,
    quoteCount: 0,
    indexedAt: '2024-12-09T06:13:53.301Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:moolr67avq5u2bh7uyinoasf/app.bsky.feed.post/3lcumgvjc7k2m',
    cid: 'bafyreibdbs72f7inh65jxmheblsvddcw3ena272qmy2ld6jpr3li7274eq',
    author: {
      did: 'did:plc:moolr67avq5u2bh7uyinoasf',
      handle: 'mwithak.bsky.social',
      displayName: '✏️ MarKus With A K 🎮',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:moolr67avq5u2bh7uyinoasf/bafkreicolbfcgz5osrrw2kcglrbmkq43eanb2kjoumgqxx4gheocba5dgi@jpeg',
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3la5mukhhy52b',
      },
      labels: [
        {
          src: 'did:plc:moolr67avq5u2bh7uyinoasf',
          uri: 'at://did:plc:moolr67avq5u2bh7uyinoasf/app.bsky.actor.profile/self',
          cid: 'bafyreiag6q6dlneos6r7qm63pl6aukjmi4mq3u6gbyk7lcgqyp2yhd22im',
          val: '!no-unauthenticated',
          cts: '1970-01-01T00:00:00.000Z',
        },
      ],
      createdAt: '2023-08-11T13:26:37.367Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-09T11:23:57.390Z',
      embed: {
        $type: 'app.bsky.embed.video',
        aspectRatio: {
          height: 1080,
          width: 1920,
        },
        video: {
          $type: 'blob',
          ref: {
            $link: 'bafkreia7jb2h2wlwnozu6efhs7nuqrnseuhbwqq6q2d5uld6zow6eaofri',
          },
          mimeType: 'video/mp4',
          size: 4943048,
        },
      },
      langs: ['de'],
      text: "OUCH!\nMy sister is a feisty one LOL\n\n...but I get to play dress-up.\nI didn't know that I could play dress-up. I will SO go and play dress-up.\n\nMAIN QUEST HALTED,I NEED NEW CLOTHES!!!\n\n🎮 The Thaumaturge",
    },
    embed: {
      $type: 'app.bsky.embed.video#view',
      cid: 'bafkreia7jb2h2wlwnozu6efhs7nuqrnseuhbwqq6q2d5uld6zow6eaofri',
      playlist:
        'https://video.bsky.app/watch/did%3Aplc%3Amoolr67avq5u2bh7uyinoasf/bafkreia7jb2h2wlwnozu6efhs7nuqrnseuhbwqq6q2d5uld6zow6eaofri/playlist.m3u8',
      thumbnail:
        'https://video.bsky.app/watch/did%3Aplc%3Amoolr67avq5u2bh7uyinoasf/bafkreia7jb2h2wlwnozu6efhs7nuqrnseuhbwqq6q2d5uld6zow6eaofri/thumbnail.jpg',
      aspectRatio: {
        height: 1080,
        width: 1920,
      },
    },
    replyCount: 0,
    repostCount: 0,
    likeCount: 0,
    quoteCount: 0,
    indexedAt: '2024-12-09T11:23:58.707Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:xrr5j2okn7ew2zvcwsxus3gb/app.bsky.feed.post/3lda6ee472c2w',
    cid: 'bafyreidcmk3ne5sa3wi5yckeay54opbmwktjhgrfvypl3uecatf3kgqzhy',
    author: {
      did: 'did:plc:xrr5j2okn7ew2zvcwsxus3gb',
      handle: 'catsofyore.bsky.social',
      displayName: 'Cats of Yore',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:xrr5j2okn7ew2zvcwsxus3gb/bafkreig6pljjdx7aekpetnwdxmjzhcbiwsoph72wjhjzjqsey2bzrj4pz4@jpeg',
      associated: {
        chat: {
          allowIncoming: 'following',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3lafy7kcc6f2x',
      },
      labels: [],
      createdAt: '2023-04-28T06:40:27.997Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-14T01:43:56.377Z',
      embed: {
        $type: 'app.bsky.embed.images',
        images: [
          {
            alt: 'Photo of my two cats, Fergus and Francie, snuggled in a cushy cat bed together. Fergus, a large brown tuxedo tabby, has his forelegs wrapped around Francie, a petite white cat. Francis is blissfully snoozing against his chest while Fergus looks at the camera.',
            aspectRatio: {
              height: 2000,
              width: 1496,
            },
            image: {
              $type: 'blob',
              ref: {
                $link: 'bafkreidhtu7akbpfmkntmqwusuirfq4ktq7adnwcx3gp7b2ptpqzt4344i',
              },
              mimeType: 'image/jpeg',
              size: 614493,
            },
          },
        ],
      },
      langs: ['en'],
      text: 'Oh my goodness. I just noticed that I passed 200K followers here. Thank you! I never could have imagined this when I first started posting about my "boring" little hobby and I\'m so grateful to be able to share the joy these vintage images bring me. Thank you all so much! 😭❤️',
    },
    embed: {
      $type: 'app.bsky.embed.images#view',
      images: [
        {
          thumb:
            'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:xrr5j2okn7ew2zvcwsxus3gb/bafkreidhtu7akbpfmkntmqwusuirfq4ktq7adnwcx3gp7b2ptpqzt4344i@jpeg',
          fullsize:
            'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:xrr5j2okn7ew2zvcwsxus3gb/bafkreidhtu7akbpfmkntmqwusuirfq4ktq7adnwcx3gp7b2ptpqzt4344i@jpeg',
          alt: 'Photo of my two cats, Fergus and Francie, snuggled in a cushy cat bed together. Fergus, a large brown tuxedo tabby, has his forelegs wrapped around Francie, a petite white cat. Francis is blissfully snoozing against his chest while Fergus looks at the camera.',
          aspectRatio: {
            height: 2000,
            width: 1496,
          },
        },
      ],
    },
    replyCount: 37,
    repostCount: 62,
    likeCount: 1739,
    quoteCount: 0,
    indexedAt: '2024-12-14T01:43:58.854Z',
    viewer: {
      repost: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.repost/3ldaahny32d2x',
      like: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.like/3ldaahk3ait2a',
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
] satisfies BskyPost[];

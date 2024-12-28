import { BSkyPost } from './types/BSkyPost';

export const testPosts = [
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
  {
    uri: 'at://did:plc:wjatbj4hiinxfqaeixaw2bcp/app.bsky.feed.post/3ldadsarvwo24',
    cid: 'bafyreia36q2y3sbognfjqjnioupnf7qzezjkpl4j7kxt43l6g7fuekz6he',
    author: {
      did: 'did:plc:wjatbj4hiinxfqaeixaw2bcp',
      handle: 'realtuckfrumper.bsky.social',
      displayName: '#TuckFrump',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:wjatbj4hiinxfqaeixaw2bcp/bafkreideluihiwuwssieujhm7vkgpi3fjmkt7c2uvoyt3o5bhgwbwjwzpy@jpeg',
      associated: {
        chat: {
          allowIncoming: 'following',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3lb2c5fiboz25',
      },
      labels: [],
      createdAt: '2024-03-03T18:13:03.807Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-14T03:21:11Z',
      embed: {
        $type: 'app.bsky.embed.external',
        external: {
          description:
            "Sen. Mitch McConnell (R-KY) just fired a warning shot at President-elect Donald Trump's nominees, a Republican strategist opined on CNN late Friday.\n\nMcConnell has taken swipes at President-elect Donald Trump in recent days, and Friday, blasted an aide to…",
          thumb: {
            $type: 'blob',
            ref: {
              $link: 'bafkreiessscyjahjp4dtctvorlj6geslfopjhusahe3xexbqpyyosspddi',
            },
            mimeType: 'image/jpeg',
            size: 44869,
          },
          title: "Republican says McConnell fired a warning shot to Trump nominees — you're not 'automatic'",
          uri: 'https://www.rawstory.com/mitch-mcconnell-2670451965/?utm_source=dlvr.it&utm_medium=bluesky',
        },
      },
      text: '',
    },
    embed: {
      $type: 'app.bsky.embed.external#view',
      external: {
        uri: 'https://www.rawstory.com/mitch-mcconnell-2670451965/?utm_source=dlvr.it&utm_medium=bluesky',
        title: "Republican says McConnell fired a warning shot to Trump nominees — you're not 'automatic'",
        description:
          "Sen. Mitch McConnell (R-KY) just fired a warning shot at President-elect Donald Trump's nominees, a Republican strategist opined on CNN late Friday.\n\nMcConnell has taken swipes at President-elect Donald Trump in recent days, and Friday, blasted an aide to…",
        thumb:
          'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:wjatbj4hiinxfqaeixaw2bcp/bafkreiessscyjahjp4dtctvorlj6geslfopjhusahe3xexbqpyyosspddi@jpeg',
      },
    },
    replyCount: 20,
    repostCount: 14,
    likeCount: 86,
    quoteCount: 1,
    indexedAt: '2024-12-14T03:21:12.355Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:womhb5cxq2knwpevrf45nyec/app.bsky.feed.post/3ld73m4xurs2n',
    cid: 'bafyreihiwtmnyhakpteo2z2mytmpmjlyj2becu5ojiflb3telg3utdtc6a',
    author: {
      did: 'did:plc:womhb5cxq2knwpevrf45nyec',
      handle: 'bonesyblue.bsky.social',
      displayName: 'Jonathan Bones',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:womhb5cxq2knwpevrf45nyec/bafkreihoqf7d6f7tto4ocr7aiald3qregnqmaqc46luve4elq7xmgar4rm@jpeg',
      associated: {
        chat: {
          allowIncoming: 'following',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3l7vzazpagn2v',
      },
      labels: [
        {
          src: 'did:plc:womhb5cxq2knwpevrf45nyec',
          uri: 'at://did:plc:womhb5cxq2knwpevrf45nyec/app.bsky.actor.profile/self',
          cid: 'bafyreiadusufs5scly55dx6aewqjs4ta6szfrws3e6q7ajv6bwxbn5whs4',
          val: '!no-unauthenticated',
          cts: '1970-01-01T00:00:00.000Z',
        },
      ],
      createdAt: '2023-05-12T15:01:22.335Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-13T15:21:56.489Z',
      embed: {
        $type: 'app.bsky.embed.external',
        external: {
          description: 'YouTube video by tldraw',
          thumb: {
            $type: 'blob',
            ref: {
              $link: 'bafkreiga6uybapxde2lhri73po7mrcp2tfqqiod4udmovzcsczwhnrawmi',
            },
            mimeType: 'image/jpeg',
            size: 70293,
          },
          title: 'tldraw computer - Teaser',
          uri: 'https://youtu.be/u1016UnJIgA?si=7YJLFzpAWTJXGD61',
        },
      },
      facets: [
        {
          $type: 'app.bsky.richtext.facet',
          features: [
            {
              $type: 'app.bsky.richtext.facet#mention',
              did: 'did:plc:omsowhiqyifcyhcu4dd3zytj',
            },
          ],
          index: {
            byteEnd: 45,
            byteStart: 21,
          },
        },
        {
          features: [
            {
              $type: 'app.bsky.richtext.facet#tag',
              tag: 'ReactDayBerlin',
            },
          ],
          index: {
            byteEnd: 64,
            byteStart: 49,
          },
        },
        {
          features: [
            {
              $type: 'app.bsky.richtext.facet#link',
              uri: 'https://youtu.be/u1016UnJIgA?si=7YJLFzpAWTJXGD61',
            },
          ],
          index: {
            byteEnd: 155,
            byteStart: 131,
          },
        },
      ],
      langs: ['en'],
      text: 'Very cool demos from @steveruizok.bsky.social at #ReactDayBerlin! If you haven’t already, make sure to check out tldraw Computer youtu.be/u1016UnJIgA?...',
    },
    embed: {
      $type: 'app.bsky.embed.external#view',
      external: {
        uri: 'https://youtu.be/u1016UnJIgA?si=7YJLFzpAWTJXGD61',
        title: 'tldraw computer - Teaser',
        description: 'YouTube video by tldraw',
        thumb:
          'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:womhb5cxq2knwpevrf45nyec/bafkreiga6uybapxde2lhri73po7mrcp2tfqqiod4udmovzcsczwhnrawmi@jpeg',
      },
    },
    replyCount: 0,
    repostCount: 1,
    likeCount: 5,
    quoteCount: 0,
    indexedAt: '2024-12-13T15:21:58.856Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:5zf23j4w6npbiw3axiy5pzhq/app.bsky.feed.post/3ldae4sni7s2h',
    cid: 'bafyreicpv6uc3h6xgmla4br3dotkzavh3fgwloot3cvl7prox5dcs3q5o4',
    author: {
      did: 'did:plc:5zf23j4w6npbiw3axiy5pzhq',
      handle: 'neurodamuzz.bsky.social',
      displayName: 'NEURO da Muzz',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:5zf23j4w6npbiw3axiy5pzhq/bafkreica3qltuiddq4eviiibyjl4mrg57jas2ubd4apojdnswehn3yaaoq@jpeg',
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3lbdmhklxvy2x',
        followedBy: 'at://did:plc:5zf23j4w6npbiw3axiy5pzhq/app.bsky.graph.follow/3lb32fp5z6c23',
      },
      labels: [],
      createdAt: '2024-11-07T01:59:56.188Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-14T03:27:05.763Z',
      embed: {
        $type: 'app.bsky.embed.recordWithMedia',
        media: {
          $type: 'app.bsky.embed.external',
          external: {
            description: 'ALT: a woman in a black dress and necklace is pointing at something .',
            thumb: {
              $type: 'blob',
              ref: {
                $link: 'bafkreicg7zc6f4rthdbzre7et27gyryqvgzoeecgifi4nr4y5kn343sckq',
              },
              mimeType: 'image/jpeg',
              size: 144438,
            },
            title: 'a woman in a black dress and necklace is pointing at something .',
            uri: 'https://media.tenor.com/EuElMELV9aIAAAAC/the-withes-the-grand-high-witch.gif?hh=373&ww=498',
          },
        },
        record: {
          $type: 'app.bsky.embed.record',
          record: {
            cid: 'bafyreifyid63exka7fu25g6qhanj5sv65fwzttqvhemeoiswzb7c2vxfci',
            uri: 'at://did:plc:jxh3k4xiloncl2gef7vvb3h4/app.bsky.feed.post/3lda5ougmdk2l',
          },
        },
      },
      langs: ['en'],
      text: 'Age yourself with a movie you saw in the theatre as a kid.\n\nWitches the Original movie based off Roald Dahl book went with my auntie n it freaked her out more than me',
    },
    embed: {
      $type: 'app.bsky.embed.recordWithMedia#view',
      media: {
        $type: 'app.bsky.embed.external#view',
        external: {
          uri: 'https://media.tenor.com/EuElMELV9aIAAAAC/the-withes-the-grand-high-witch.gif?hh=373&ww=498',
          title: 'a woman in a black dress and necklace is pointing at something .',
          description: 'ALT: a woman in a black dress and necklace is pointing at something .',
          thumb:
            'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:5zf23j4w6npbiw3axiy5pzhq/bafkreicg7zc6f4rthdbzre7et27gyryqvgzoeecgifi4nr4y5kn343sckq@jpeg',
        },
      },
      record: {
        record: {
          $type: 'app.bsky.embed.record#viewRecord',
          uri: 'at://did:plc:jxh3k4xiloncl2gef7vvb3h4/app.bsky.feed.post/3lda5ougmdk2l',
          cid: 'bafyreifyid63exka7fu25g6qhanj5sv65fwzttqvhemeoiswzb7c2vxfci',
          author: {
            did: 'did:plc:jxh3k4xiloncl2gef7vvb3h4',
            handle: 'darthcanucks.bsky.social',
            displayName: 'Jordan',
            avatar:
              'https://cdn.bsky.app/img/avatar/plain/did:plc:jxh3k4xiloncl2gef7vvb3h4/bafkreigy6co2co4uoo27gyakxzdcbeowleqjxlu25ddpafm2hfl5vzjy2e@jpeg',
            viewer: {
              muted: false,
              blockedBy: false,
            },
            labels: [],
            createdAt: '2024-11-08T00:47:55.581Z',
          },
          value: {
            $type: 'app.bsky.feed.post',
            createdAt: '2024-12-14T01:31:55.423Z',
            embed: {
              $type: 'app.bsky.embed.recordWithMedia',
              media: {
                $type: 'app.bsky.embed.external',
                external: {
                  description: 'ALT: a cartoon character is standing in front of a fire',
                  thumb: {
                    $type: 'blob',
                    ref: {
                      $link: 'bafkreifrcgikz3blwstdr432cnu6iixqh5wnls3k2sfnm3ti5lk2awcs5a',
                    },
                    mimeType: 'image/jpeg',
                    size: 361886,
                  },
                  title: 'a cartoon character is standing in front of a fire',
                  uri: 'https://media.tenor.com/-4tVtkvpvn4AAAAC/pokemon-pokemon-first-movie.gif?hh=445&ww=498',
                },
              },
              record: {
                $type: 'app.bsky.embed.record',
                record: {
                  cid: 'bafyreidnmcg7c74mhwamk3s2zj2tckqnnnnapleunxvure4elfabhh7rmi',
                  uri: 'at://did:plc:3v4apvaros2mllnlmvoflhak/app.bsky.feed.post/3lda4pf3tnc22',
                },
              },
            },
            langs: ['en'],
            text: 'Age yourself with a movie you saw in the theatre as a kid.\n\nI remember getting the Ancient Mew card and seeing Pokemon on the big screen it was the best thing ever',
          },
          labels: [],
          likeCount: 1,
          replyCount: 0,
          repostCount: 0,
          quoteCount: 1,
          indexedAt: '2024-12-14T01:31:57.658Z',
          embeds: [
            {
              $type: 'app.bsky.embed.recordWithMedia#view',
              media: {
                $type: 'app.bsky.embed.external#view',
                external: {
                  uri: 'https://media.tenor.com/-4tVtkvpvn4AAAAC/pokemon-pokemon-first-movie.gif?hh=445&ww=498',
                  title: 'a cartoon character is standing in front of a fire',
                  description: 'ALT: a cartoon character is standing in front of a fire',
                  thumb:
                    'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:jxh3k4xiloncl2gef7vvb3h4/bafkreifrcgikz3blwstdr432cnu6iixqh5wnls3k2sfnm3ti5lk2awcs5a@jpeg',
                },
              },
              record: {
                record: {
                  $type: 'app.bsky.embed.record#viewRecord',
                  uri: 'at://did:plc:3v4apvaros2mllnlmvoflhak/app.bsky.feed.post/3lda4pf3tnc22',
                  cid: 'bafyreidnmcg7c74mhwamk3s2zj2tckqnnnnapleunxvure4elfabhh7rmi',
                  author: {
                    did: 'did:plc:3v4apvaros2mllnlmvoflhak',
                    handle: 'mikekobela.bsky.social',
                    displayName: 'Mike Kobela',
                    avatar:
                      'https://cdn.bsky.app/img/avatar/plain/did:plc:3v4apvaros2mllnlmvoflhak/bafkreihgudcphdgohchg3ivhfnrz5x4xxt4wkntqokmqvejsvnx2vqmiwe@jpeg',
                    viewer: {
                      muted: false,
                      blockedBy: false,
                    },
                    labels: [],
                    createdAt: '2023-09-21T05:45:16.950Z',
                  },
                  value: {
                    $type: 'app.bsky.feed.post',
                    createdAt: '2024-12-14T01:14:19.152Z',
                    embed: {
                      $type: 'app.bsky.embed.recordWithMedia',
                      media: {
                        $type: 'app.bsky.embed.external',
                        external: {
                          description: "ALT: a group of chickens with the words we must n't panic above them",
                          thumb: {
                            $type: 'blob',
                            ref: {
                              $link: 'bafkreih4nn4ts3ghxmyzwcj74l7ltbsexsv7fcywgjnp7u5meg55lgtdve',
                            },
                            mimeType: 'image/jpeg',
                            size: 109228,
                          },
                          title: "a group of chickens with the words we must n't panic above them",
                          uri: 'https://media.tenor.com/uh0Lsu5yZVQAAAAC/chicken-run.gif?hh=280&ww=498',
                        },
                      },
                      record: {
                        $type: 'app.bsky.embed.record',
                        record: {
                          cid: 'bafyreic2l2b6o7mzrimxu4dddsjq4ykib7troiyl5azy67jnq6nbmbm4ki',
                          uri: 'at://did:plc:36u66axh7ebjzxhtmqo6gel5/app.bsky.feed.post/3lda423qepc2m',
                        },
                      },
                    },
                    langs: ['en'],
                    text: 'Age yourself with a movie you saw in the theatre as a kid.\n\nThis was my first experience with the theatre. Couldn’t even grasp the idea of it till the film started rolling, I was like “what is this big wall, where’s the stage?”',
                  },
                  labels: [],
                  likeCount: 2,
                  replyCount: 0,
                  repostCount: 0,
                  quoteCount: 1,
                  indexedAt: '2024-12-14T01:14:29.755Z',
                },
              },
            },
          ],
        },
      },
    },
    replyCount: 0,
    repostCount: 0,
    likeCount: 1,
    quoteCount: 0,
    indexedAt: '2024-12-14T03:27:07.853Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:amysrxhsrdtchmujzw7hhhp4/app.bsky.feed.post/3ldads56y2d2o',
    cid: 'bafyreico3pf5foagnwffmzi5scanfmsan5ulnqfd4arasif2h4cbn55hky',
    author: {
      did: 'did:plc:amysrxhsrdtchmujzw7hhhp4',
      handle: 'noisypixel.net',
      displayName: 'Noisy Pixel',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:amysrxhsrdtchmujzw7hhhp4/bafkreiaa76tpcwdld6nv5p76yrklaficyfighgaqbrqlpiesktn7euqzc4@jpeg',
      associated: {
        chat: {
          allowIncoming: 'following',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3lafgtri3uh2v',
      },
      labels: [],
      createdAt: '2024-02-07T17:47:01.698Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-13T19:21:04-08:00',
      embed: {
        $type: 'app.bsky.embed.external',
        external: {
          description:
            'Crunchyroll reveals its Winter 2025 anime lineup, including new series like Fate/strange Fake and Re:ZERO Season 3, plus fan-favorites like Solo Leveling. See what’s premiering soon!',
          thumb: {
            $type: 'blob',
            ref: {
              $link: 'bafkreiekpe4r2xo7h4zekcw44vdxt44wn327rbkqncrrjlly55ozc22cni',
            },
            mimeType: 'image/webp',
            size: 76872,
          },
          title: 'Crunchyroll Winter 2025 Anime Lineup: New Premieres And Returning Favorites',
          uri: 'https://noisypixel.net/crunchyroll-winter-2025-anime-lineup/',
        },
      },
      text: '',
    },
    embed: {
      $type: 'app.bsky.embed.external#view',
      external: {
        uri: 'https://noisypixel.net/crunchyroll-winter-2025-anime-lineup/',
        title: 'Crunchyroll Winter 2025 Anime Lineup: New Premieres And Returning Favorites',
        description:
          'Crunchyroll reveals its Winter 2025 anime lineup, including new series like Fate/strange Fake and Re:ZERO Season 3, plus fan-favorites like Solo Leveling. See what’s premiering soon!',
        thumb:
          'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:amysrxhsrdtchmujzw7hhhp4/bafkreiekpe4r2xo7h4zekcw44vdxt44wn327rbkqncrrjlly55ozc22cni@jpeg',
      },
    },
    replyCount: 0,
    repostCount: 0,
    likeCount: 0,
    quoteCount: 0,
    indexedAt: '2024-12-14T03:21:08.749Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:fusfnqwap635b7b56renc2co/app.bsky.feed.post/3ldal6hgefc2y',
    cid: 'bafyreifjgztw7tefj4bfcb3x4sla5r4f6xyt7rvc4povni3juc7dxnzccy',
    author: {
      did: 'did:plc:fusfnqwap635b7b56renc2co',
      handle: 'squidpunk.bsky.social',
      displayName: '[squidpunk]',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:fusfnqwap635b7b56renc2co/bafkreifsi334rpgiboikvyhcv72vdf2hfgr7br2xzstfas2irgvxx3n4gq@jpeg',
      associated: {
        chat: {
          allowIncoming: 'all',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3laldwa3vz42e',
      },
      labels: [],
      createdAt: '2023-07-12T04:33:35.769Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-14T05:33:17.298Z',
      embed: {
        $type: 'app.bsky.embed.video',
        aspectRatio: {
          height: 1024,
          width: 576,
        },
        video: {
          $type: 'blob',
          ref: {
            $link: 'bafkreigzt2z755ikfjka5mywvjh42wpmfo2kikgk3q74d4yh4z2iie6o54',
          },
          mimeType: 'video/mp4',
          size: 1657954,
        },
      },
      langs: ['en'],
      text: 'If you look like this DM me immediately',
    },
    embed: {
      $type: 'app.bsky.embed.video#view',
      cid: 'bafkreigzt2z755ikfjka5mywvjh42wpmfo2kikgk3q74d4yh4z2iie6o54',
      playlist:
        'https://video.bsky.app/watch/did%3Aplc%3Afusfnqwap635b7b56renc2co/bafkreigzt2z755ikfjka5mywvjh42wpmfo2kikgk3q74d4yh4z2iie6o54/playlist.m3u8',
      thumbnail:
        'https://video.bsky.app/watch/did%3Aplc%3Afusfnqwap635b7b56renc2co/bafkreigzt2z755ikfjka5mywvjh42wpmfo2kikgk3q74d4yh4z2iie6o54/thumbnail.jpg',
      aspectRatio: {
        height: 1024,
        width: 576,
      },
    },
    replyCount: 0,
    repostCount: 0,
    likeCount: 1,
    quoteCount: 0,
    indexedAt: '2024-12-14T05:33:19.858Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:w4xbfzo7kqfes5zb7r6qv3rw/app.bsky.feed.post/3ld6tjkcg3k26',
    cid: 'bafyreihczsim4sq4leis5pujjfxe5qdq24eheu3oa7la2skopwnjxxrepy',
    author: {
      did: 'did:plc:w4xbfzo7kqfes5zb7r6qv3rw',
      handle: 'rudyfraser.com',
      displayName: 'Rudy wants revolution.',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:w4xbfzo7kqfes5zb7r6qv3rw/bafkreih6z7pjeuq4bgjechhjpo7zmekkm4cmckgv5whuyg6mdt2gwug55y@jpeg',
      associated: {
        chat: {
          allowIncoming: 'all',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3l7vbr5ppek2c',
      },
      labels: [],
      createdAt: '2023-05-01T03:43:42.434Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-13T12:57:19.870Z',
      embed: {
        $type: 'app.bsky.embed.video',
        alt: '50 cent saying I’m from 134th street and I ain’t got no mf boss. Rudy is also from 134th st and ain’t got no mf boss',
        aspectRatio: {
          height: 1080,
          width: 1440,
        },
        video: {
          $type: 'blob',
          ref: {
            $link: 'bafkreigsmqcg3c6xkgxrkvaw27coy5upyvldh7pe3r64nepb3dsm5dkq5u',
          },
          mimeType: 'video/mp4',
          size: 2100758,
        },
      },
      facets: [
        {
          features: [
            {
              $type: 'app.bsky.richtext.facet#tag',
              tag: 'QGTM',
            },
          ],
          index: {
            byteEnd: 91,
            byteStart: 86,
          },
        },
      ],
      langs: ['en'],
      text: '(I live in Bed Stuy but I’m from Southside Jamaica Queens, off Guy Brewer Blvd, btw #QGTM heavy on it)',
    },
    embed: {
      $type: 'app.bsky.embed.video#view',
      cid: 'bafkreigsmqcg3c6xkgxrkvaw27coy5upyvldh7pe3r64nepb3dsm5dkq5u',
      playlist:
        'https://video.bsky.app/watch/did%3Aplc%3Aw4xbfzo7kqfes5zb7r6qv3rw/bafkreigsmqcg3c6xkgxrkvaw27coy5upyvldh7pe3r64nepb3dsm5dkq5u/playlist.m3u8',
      thumbnail:
        'https://video.bsky.app/watch/did%3Aplc%3Aw4xbfzo7kqfes5zb7r6qv3rw/bafkreigsmqcg3c6xkgxrkvaw27coy5upyvldh7pe3r64nepb3dsm5dkq5u/thumbnail.jpg',
      alt: '50 cent saying I’m from 134th street and I ain’t got no mf boss. Rudy is also from 134th st and ain’t got no mf boss',
      aspectRatio: {
        height: 1080,
        width: 1440,
      },
    },
    replyCount: 9,
    repostCount: 1,
    likeCount: 36,
    quoteCount: 1,
    indexedAt: '2024-12-13T12:57:20.651Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:bktqwjpjnqpoyt6xoxjrcpkm/app.bsky.feed.post/3ldaneslxjc2n',
    cid: 'bafyreibjob2oqkagzytlsii4wpisjj6pwtj3ytkviuv6edh34tqcvwvdjq',
    author: {
      did: 'did:plc:bktqwjpjnqpoyt6xoxjrcpkm',
      handle: 'rabichakra.bsky.social',
      displayName: 'Robi',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:bktqwjpjnqpoyt6xoxjrcpkm/bafkreicu6igc7x66wave5mbesdsglkatgfjqjb77nzfn3svrsvl3coysry@jpeg',
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3lay7pvztvx26',
        followedBy: 'at://did:plc:bktqwjpjnqpoyt6xoxjrcpkm/app.bsky.graph.follow/3layomhjgvm27',
      },
      labels: [],
      createdAt: '2023-08-24T23:49:25.385Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-14T06:12:37.826Z',
      langs: ['en'],
      reply: {
        parent: {
          cid: 'bafyreiflnw3qzqagiyzbxdqvdh4e6vvgm5l6j34fqtqfghckyzxji4zs5m',
          uri: 'at://did:plc:4llrhdclvdlmmynkwsmg5tdc/app.bsky.feed.post/3ld7t3qb3dk2r',
        },
        root: {
          cid: 'bafyreiflnw3qzqagiyzbxdqvdh4e6vvgm5l6j34fqtqfghckyzxji4zs5m',
          uri: 'at://did:plc:4llrhdclvdlmmynkwsmg5tdc/app.bsky.feed.post/3ld7t3qb3dk2r',
        },
      },
      text: 'Drone syndrome vaccine is the need of the hour,\nMass vaccination required.',
    },
    replyCount: 0,
    repostCount: 0,
    likeCount: 0,
    quoteCount: 0,
    indexedAt: '2024-12-14T06:12:38.252Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3ldryjyc36c2l',
    cid: 'bafyreigbhxuvtykfhhwpkt57fymhnmqsv7hhm4yb6ulhvsuyfozofhazhe',
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
      createdAt: '2024-12-21T03:47:38.278Z',
      embed: {
        $type: 'app.bsky.embed.recordWithMedia',
        media: {
          $type: 'app.bsky.embed.external',
          external: {
            description: 'Alt: a cartoon drawing of a deer with the words yep yep yep',
            thumb: {
              $type: 'blob',
              ref: {
                $link: 'bafkreid75vj2le27rvzxvzlduqvmwxy4sfme3yb3zsnh63x5ncgwlfx6aa',
              },
              mimeType: 'image/jpeg',
              size: 523374,
            },
            title: 'a cartoon drawing of a deer with the words yep yep yep',
            uri: 'https://media.tenor.com/wX-YNsvQpLoAAAAC/fawn-cartoon.gif?hh=487&ww=498',
          },
        },
        record: {
          $type: 'app.bsky.embed.record',
          record: {
            cid: 'bafyreiefuwyfagl267sl2cei727ua2htirbnwdrioi3uvzmq7no6yrbsl4',
            uri: 'at://did:plc:64htzccuyxwagilntdxo2ity/app.bsky.feed.post/3ldrvyp6vrs2f',
          },
        },
      },
      langs: ['en'],
      text: 'more buttons = better\n\nthis is a fact!',
    },
    embed: {
      $type: 'app.bsky.embed.recordWithMedia#view',
      media: {
        $type: 'app.bsky.embed.external#view',
        external: {
          uri: 'https://media.tenor.com/wX-YNsvQpLoAAAAC/fawn-cartoon.gif?hh=487&ww=498',
          title: 'a cartoon drawing of a deer with the words yep yep yep',
          description: 'Alt: a cartoon drawing of a deer with the words yep yep yep',
          thumb:
            'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreid75vj2le27rvzxvzlduqvmwxy4sfme3yb3zsnh63x5ncgwlfx6aa@jpeg',
        },
      },
      record: {
        record: {
          $type: 'app.bsky.embed.record#viewRecord',
          uri: 'at://did:plc:64htzccuyxwagilntdxo2ity/app.bsky.feed.post/3ldrvyp6vrs2f',
          cid: 'bafyreiefuwyfagl267sl2cei727ua2htirbnwdrioi3uvzmq7no6yrbsl4',
          author: {
            did: 'did:plc:64htzccuyxwagilntdxo2ity',
            handle: 'userquin.bsky.social',
            displayName: 'Joaquín Sánchez',
            avatar:
              'https://cdn.bsky.app/img/avatar/plain/did:plc:64htzccuyxwagilntdxo2ity/bafkreiedqjh5wuc6gpx7ql2foqgnarfrrttzpuuhrx4yzrjn3f5fhwcbsy@jpeg',
            viewer: {
              muted: false,
              blockedBy: false,
              following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3l7wh6zyuek2o',
              followedBy: 'at://did:plc:64htzccuyxwagilntdxo2ity/app.bsky.graph.follow/3l7uvjlkuxs25',
            },
            labels: [],
            createdAt: '2024-10-26T18:09:14.611Z',
          },
          value: {
            $type: 'app.bsky.feed.post',
            createdAt: '2024-12-21T03:02:10.827Z',
            langs: ['en'],
            reply: {
              parent: {
                cid: 'bafyreif5ehzijfhsmpyubcpp7tu2vatzmtv5bh3tdkrom3rtylgfnjs6im',
                uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3ldrvctjgvc2d',
              },
              root: {
                cid: 'bafyreidb7jl7rbvcn76ttohumcxpq2uyfiusjgm3bh5c6fs6g3strg467e',
                uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3ldrobv64n22d',
              },
            },
            text: 'Ohh sorry luna , you want more buttons... long day 4AM and still working',
          },
          labels: [],
          likeCount: 2,
          replyCount: 1,
          repostCount: 0,
          quoteCount: 1,
          indexedAt: '2024-12-21T03:02:15.547Z',
          embeds: [],
        },
      },
    },
    replyCount: 3,
    repostCount: 1,
    likeCount: 22,
    quoteCount: 0,
    indexedAt: '2024-12-21T03:47:41.447Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
      pinned: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:cqhuivxrwyy6dkbojlh5mgt5/app.bsky.feed.post/3ldwdltlejc2f',
    cid: 'bafyreibdle6swvgxtwfhbf4gvgjkpq3zmhvthmvestl6u6nyubw67pz2mm',
    author: {
      did: 'did:plc:cqhuivxrwyy6dkbojlh5mgt5',
      handle: 'stardustbluepr.com',
      displayName: 'StardustBluePR 🌴🌏🎬',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:cqhuivxrwyy6dkbojlh5mgt5/bafkreiab7wpc347giiznf2wa4rpivv4xq7vnyyqxs3l765qlycrfrv7obm@jpeg',
      associated: {
        chat: {
          allowIncoming: 'following',
        },
      },
      viewer: {
        muted: false,
        blockedBy: false,
      },
      labels: [
        {
          src: 'did:plc:cqhuivxrwyy6dkbojlh5mgt5',
          uri: 'at://did:plc:cqhuivxrwyy6dkbojlh5mgt5/app.bsky.actor.profile/self',
          cid: 'bafyreihbbpf253zoacyq5sgudw6alwm62tn5ks6txrt5x4m7yaczqckf4q',
          val: '!no-unauthenticated',
          cts: '1970-01-01T00:00:00.000Z',
        },
      ],
      createdAt: '2023-06-09T13:55:25.036Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-12-22T21:16:10.561Z',
      embed: {
        $type: 'app.bsky.embed.record',
        record: {
          cid: 'bafyreiculevof2q46b2uuyogb42vvypojns566y5we5yo5dchcdf4oxy3q',
          uri: 'at://did:plc:cqhuivxrwyy6dkbojlh5mgt5/app.bsky.graph.starterpack/3ldwcmu4nli2c',
        },
      },
      facets: [
        {
          features: [
            {
              $type: 'app.bsky.richtext.facet#tag',
              tag: 'StarterPack',
            },
          ],
          index: {
            byteEnd: 76,
            byteStart: 64,
          },
        },
      ],
      langs: ['en'],
      text: "I'm on the search for some brilliant new friends to add to this #StarterPack\nScientists, journalists, climate warriors, womans rights.\nComment for a chance to be added! \n💙🌍",
    },
    embed: {
      $type: 'app.bsky.embed.record#view',
      record: {
        uri: 'at://did:plc:cqhuivxrwyy6dkbojlh5mgt5/app.bsky.graph.starterpack/3ldwcmu4nli2c',
        cid: 'bafyreibfemjeii2zga3tfoe3l627livlmcyhehaeqouzhgeqbohbniqcqq',
        record: {
          $type: 'app.bsky.graph.starterpack',
          createdAt: '2024-12-22T20:58:51.484Z',
          description: 'Connecting with some great new peeps here! Engaging, kind and have important words of wisdom.',
          feeds: [],
          list: 'at://did:plc:cqhuivxrwyy6dkbojlh5mgt5/app.bsky.graph.list/3ldwcmtux2f25',
          name: 'BlueSky Friends & Finds fromStardustBluePR',
          updatedAt: '2024-12-23T07:15:05.442Z',
        },
        creator: {
          did: 'did:plc:cqhuivxrwyy6dkbojlh5mgt5',
          handle: 'stardustbluepr.com',
          displayName: 'StardustBluePR 🌴🌏🎬',
          avatar:
            'https://cdn.bsky.app/img/avatar/plain/did:plc:cqhuivxrwyy6dkbojlh5mgt5/bafkreiab7wpc347giiznf2wa4rpivv4xq7vnyyqxs3l765qlycrfrv7obm@jpeg',
          associated: {
            chat: {
              allowIncoming: 'following',
            },
          },
          viewer: {
            muted: false,
            blockedBy: false,
          },
          labels: [
            {
              src: 'did:plc:cqhuivxrwyy6dkbojlh5mgt5',
              uri: 'at://did:plc:cqhuivxrwyy6dkbojlh5mgt5/app.bsky.actor.profile/self',
              cid: 'bafyreihbbpf253zoacyq5sgudw6alwm62tn5ks6txrt5x4m7yaczqckf4q',
              val: '!no-unauthenticated',
              cts: '1970-01-01T00:00:00.000Z',
            },
          ],
          createdAt: '2023-06-09T13:55:25.036Z',
        },
        joinedAllTimeCount: 0,
        joinedWeekCount: 0,
        labels: [],
        indexedAt: '2024-12-23T07:15:05.650Z',
        $type: 'app.bsky.graph.defs#starterPackViewBasic',
      },
    },
    replyCount: 163,
    repostCount: 137,
    likeCount: 419,
    quoteCount: 22,
    indexedAt: '2024-12-22T21:16:10.348Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lebn4u6c6c2p',
    cid: 'bafyreiclbpkcwamdagmybbhp2rghqdnnxinuun53mzqivxtqyaftc7yfey',
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
      createdAt: '2024-12-27T09:06:02.396Z',
      embed: {
        $type: 'app.bsky.embed.recordWithMedia',
        media: {
          $type: 'app.bsky.embed.images',
          images: [
            {
              alt: 'screenshot of the create a post modal with text and an image added',
              aspectRatio: {
                height: 1868,
                width: 1272,
              },
              image: {
                $type: 'blob',
                ref: {
                  $link: 'bafkreibklravysb7z2z5z2o2vndzo2yjilazvxhkftevkzpbvta6m5qn7i',
                },
                mimeType: 'image/jpeg',
                size: 549814,
              },
            },
            {
              alt: 'a screenshot of bsky-client.imlunahey.com with the create a post text editor showing and below that two sections of JSON.',
              aspectRatio: {
                height: 1157,
                width: 2000,
              },
              image: {
                $type: 'blob',
                ref: {
                  $link: 'bafkreign6s2nbxvcyete5vh33egzq26gkqexwa4donbi53kmum5gzjornq',
                },
                mimeType: 'image/jpeg',
                size: 391879,
              },
            },
          ],
        },
        record: {
          $type: 'app.bsky.embed.record',
          record: {
            cid: 'bafyreihfkkavvml22qlpxvtvr5c6zsooypdqtqa7posqhb3arzeiuwrjva',
            uri: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.feed.post/3lebmeaogd42j',
          },
        },
      },
      langs: ['en'],
      text: 'for those curious this is what the ui looks like while im working on it\n\nalso seems sometimes the official ui locks up when uploading images? no error was ever shown it just got stuck like this.',
    },
    embed: {
      $type: 'app.bsky.embed.recordWithMedia#view',
      media: {
        $type: 'app.bsky.embed.images#view',
        images: [
          {
            thumb:
              'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreibklravysb7z2z5z2o2vndzo2yjilazvxhkftevkzpbvta6m5qn7i@jpeg',
            fullsize:
              'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreibklravysb7z2z5z2o2vndzo2yjilazvxhkftevkzpbvta6m5qn7i@jpeg',
            alt: 'screenshot of the create a post modal with text and an image added',
            aspectRatio: {
              height: 1868,
              width: 1272,
            },
          },
          {
            thumb:
              'https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreign6s2nbxvcyete5vh33egzq26gkqexwa4donbi53kmum5gzjornq@jpeg',
            fullsize:
              'https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:k6acu4chiwkixvdedcmdgmal/bafkreign6s2nbxvcyete5vh33egzq26gkqexwa4donbi53kmum5gzjornq@jpeg',
            alt: 'a screenshot of bsky-client.imlunahey.com with the create a post text editor showing and below that two sections of JSON.',
            aspectRatio: {
              height: 1157,
              width: 2000,
            },
          },
        ],
      },
      record: {
        record: {
          $type: 'app.bsky.embed.record#viewRecord',
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
          value: {
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
          labels: [],
          likeCount: 11,
          replyCount: 2,
          repostCount: 0,
          quoteCount: 1,
          indexedAt: '2024-12-27T08:52:16.852Z',
          embeds: [],
        },
      },
    },
    replyCount: 0,
    repostCount: 2,
    likeCount: 18,
    quoteCount: 0,
    indexedAt: '2024-12-27T09:06:10.850Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
  {
    uri: 'at://did:plc:dh43h45aumaaa4wxzejvfbaj/app.bsky.feed.post/3lawarmyrhk2g',
    cid: 'bafyreihpuwgb4pj6haxlip32lepgykgtbuaw77hc26wjr5r2onb4y6f5fq',
    author: {
      did: 'did:plc:dh43h45aumaaa4wxzejvfbaj',
      handle: 'jessmaddox.bsky.social',
      displayName: 'Jess Maddox',
      avatar:
        'https://cdn.bsky.app/img/avatar/plain/did:plc:dh43h45aumaaa4wxzejvfbaj/bafkreigp2paprvssprmgnwe3ljhsgrp75zmwqhjgjwlprdkaaybefl5q5a@jpeg',
      viewer: {
        muted: false,
        blockedBy: false,
        following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3laq5nnmd732g',
      },
      labels: [],
      createdAt: '2023-04-28T14:18:18.952Z',
    },
    record: {
      $type: 'app.bsky.feed.post',
      createdAt: '2024-11-14T16:10:08.878Z',
      embed: {
        $type: 'app.bsky.embed.record',
        record: {
          cid: 'bafyreibgp27tnvykzoewdep6mjbfq6eun6delhakao5kloqigo5jetzuzu',
          uri: 'at://did:plc:dh43h45aumaaa4wxzejvfbaj/app.bsky.graph.starterpack/3lajeqrmaxo2m',
        },
      },
      facets: [
        {
          features: [
            {
              $type: 'app.bsky.richtext.facet#link',
              uri: 'https://go.bsky.app/LVrPemK',
            },
          ],
          index: {
            byteEnd: 217,
            byteStart: 198,
          },
        },
      ],
      langs: ['en'],
      text: 'New to bluesky and want to follow smart people who study the internet? I made this starter pack to get you going!\n\nThis one is full at the app’s limit, but please make your own and share widely!\n\ngo.bsky.app/LVrPemK',
    },
    embed: {
      $type: 'app.bsky.embed.record#view',
      record: {
        uri: 'at://did:plc:dh43h45aumaaa4wxzejvfbaj/app.bsky.graph.starterpack/3lajeqrmaxo2m',
        cid: 'bafyreibgp27tnvykzoewdep6mjbfq6eun6delhakao5kloqigo5jetzuzu',
        record: {
          $type: 'app.bsky.graph.starterpack',
          createdAt: '2024-11-09T13:16:38.483Z',
          description:
            'Academics focusing on all things Internet. Always updating, let me know if you’d like to be included!',
          feeds: [
            {
              avatar:
                'https://cdn.bsky.app/img/avatar/plain/did:plc:z72i7hdynmk6r22z27h6tvur/bafkreieppnjpayqgjbyqnbeqzwj3pzqtiwbe5a4m6whzqnp3k7gpqs2gai@jpeg',
              cid: 'bafyreigreonzn577vy6i4qh2so7aqfjztqrrj4jpssg2jczc27p6x4y6wi',
              creator: {
                associated: {
                  chat: {
                    allowIncoming: 'none',
                  },
                },
                avatar:
                  'https://cdn.bsky.app/img/avatar/plain/did:plc:z72i7hdynmk6r22z27h6tvur/bafkreihagr2cmvl2jt4mgx3sppwe2it3fwolkrbtjrhcnwjk4jdijhsoze@jpeg',
                createdAt: '2023-04-12T04:53:57.057Z',
                description:
                  'official Bluesky account (check domain👆)\n\nPress: press@blueskyweb.xyz\nSupport: support@bsky.app',
                did: 'did:plc:z72i7hdynmk6r22z27h6tvur',
                displayName: 'Bluesky',
                handle: 'bsky.app',
                indexedAt: '2024-10-17T07:17:00.646Z',
                labels: [],
                viewer: {
                  blockedBy: false,
                  following: 'at://did:plc:dh43h45aumaaa4wxzejvfbaj/app.bsky.graph.follow/3jugt3bejwh2q',
                  muted: false,
                },
              },
              description: 'A mix of popular content from accounts you follow and content that your follows like.',
              did: 'did:web:discover.bsky.app',
              displayName: 'Popular With Friends',
              indexedAt: '2023-05-19T23:19:21.076Z',
              labels: [],
              likeCount: 21112,
              uri: 'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/with-friends',
              viewer: {},
            },
            {
              avatar:
                'https://cdn.bsky.app/img/avatar/plain/did:plc:q6gjnaw2blty4crticxkmujt/bafkreigaqrisa35bofawrhn4jusxqycxa3h7ljl3yyenwgxjkg4dpiv7mi@jpeg',
              cid: 'bafyreiespmx74vkg5idtggq6cyrhrydjc7oxqqgpum6scvwrmswvk2le3u',
              creator: {
                associated: {
                  chat: {
                    allowIncoming: 'following',
                  },
                },
                avatar:
                  'https://cdn.bsky.app/img/avatar/plain/did:plc:q6gjnaw2blty4crticxkmujt/bafkreigio6g2gv3phaprfjukxpwytdyxyic45reldeptypywkt7xrhi3h4@jpeg',
                createdAt: '2023-04-14T05:32:52.328Z',
                description:
                  'Jaz\nGender Nomad\nIRC made me gay\nBackend (Go) & Infra @ Bsky\nDoes musical things and computer things\n27. they/them 🏳️‍⚧️\nBSky Stats- https://bsky.jazco.dev/stats\nhttps://github.com/ericvolp12',
                did: 'did:plc:q6gjnaw2blty4crticxkmujt',
                displayName: 'Jaz',
                handle: 'jaz.bsky.social',
                indexedAt: '2024-11-13T06:59:14.015Z',
                labels: [],
                viewer: {
                  blockedBy: false,
                  muted: false,
                },
              },
              description: 'A feed of cat pictures from the whole network (sometimes not cats)',
              did: 'did:web:feedsky.jazco.io',
              displayName: 'Cat Pics',
              indexedAt: '2024-02-10T21:11:22.458Z',
              labels: [],
              likeCount: 9765,
              uri: 'at://did:plc:q6gjnaw2blty4crticxkmujt/app.bsky.feed.generator/cv:cat',
              viewer: {},
            },
          ],
          list: 'at://did:plc:dh43h45aumaaa4wxzejvfbaj/app.bsky.graph.list/3lajeqrd7ty2l',
          name: 'Internet Studies',
          updatedAt: '2024-11-14T16:07:41.227Z',
        },
        creator: {
          did: 'did:plc:dh43h45aumaaa4wxzejvfbaj',
          handle: 'jessmaddox.bsky.social',
          displayName: 'Jess Maddox',
          avatar:
            'https://cdn.bsky.app/img/avatar/plain/did:plc:dh43h45aumaaa4wxzejvfbaj/bafkreigp2paprvssprmgnwe3ljhsgrp75zmwqhjgjwlprdkaaybefl5q5a@jpeg',
          viewer: {
            muted: false,
            blockedBy: false,
            following: 'at://did:plc:k6acu4chiwkixvdedcmdgmal/app.bsky.graph.follow/3laq5nnmd732g',
          },
          labels: [],
          createdAt: '2023-04-28T14:18:18.952Z',
        },
        joinedAllTimeCount: 0,
        joinedWeekCount: 0,
        labels: [],
        indexedAt: '2024-11-14T16:07:41.440Z',
        $type: 'app.bsky.graph.defs#starterPackViewBasic',
      },
    },
    replyCount: 8,
    repostCount: 11,
    likeCount: 58,
    quoteCount: 2,
    indexedAt: '2024-11-14T16:10:09.129Z',
    viewer: {
      threadMuted: false,
      embeddingDisabled: false,
    },
    labels: [],
  },
] satisfies BSkyPost[];

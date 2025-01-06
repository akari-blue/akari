import { Author } from './Author';
import { BSkyFacet } from './BSkyFacet';
import { BSkyPostLabel } from './BSkyPostLabel';
import { BSkyAuthor } from './BskyAuthor';
import { Static, Type } from '@sinclair/typebox';

export const BSkyPostEmbed = Type.Recursive((Self) => {
  return Type.Union([
    Type.Object({
      $type: Type.Literal('app.bsky.embed.external#view'),
      external: Type.Object({
        uri: Type.String(),
        title: Type.String(),
        description: Type.String(),
        thumb: Type.String(),
      }),
    }),
    Type.Object({
      $type: Type.Literal('app.bsky.embed.images#view'),
      images: Type.Array(
        Type.Object({
          thumb: Type.String(),
          fullsize: Type.String(),
          alt: Type.String(),
          aspectRatio: Type.Optional(
            Type.Object({
              height: Type.Number(),
              width: Type.Number(),
            }),
          ),
        }),
      ),
    }),
    Type.Object({
      $type: Type.Literal('app.bsky.embed.record#view'),
      record: Type.Union([
        Type.Object({
          $type: Type.Literal('app.bsky.embed.record#viewRecord'),
          uri: Type.String(),
          cid: Type.String(),
          author: BSkyAuthor,
          creator: Type.Optional(BSkyAuthor),
          value: Type.Object({
            $type: Type.Literal('app.bsky.feed.post'),
            createdAt: Type.String(),
            embed: Type.Optional(
              Type.Union([
                Type.Object({
                  $type: Type.Literal('app.bsky.embed.images'),
                  images: Type.Array(
                    Type.Object({
                      alt: Type.String(),
                      aspectRatio: Type.Object({
                        height: Type.Number(),
                        width: Type.Number(),
                      }),
                      image: Type.Object({
                        $type: Type.Literal('blob'),
                        ref: Type.Object({
                          $link: Type.String(),
                        }),
                        mimeType: Type.String(),
                        size: Type.Number(),
                      }),
                    }),
                  ),
                }),
                Type.Object({
                  $type: Type.Literal('app.bsky.embed.record'),
                  record: Type.Object({
                    cid: Type.String(),
                    uri: Type.String(),
                  }),
                }),
              ]),
            ),
            langs: Type.Array(Type.String()),
            reply: Type.Optional(
              Type.Object({
                parent: Type.Object({
                  cid: Type.String(),
                  uri: Type.String(),
                }),
                root: Type.Object({
                  cid: Type.String(),
                  uri: Type.String(),
                }),
              }),
            ),
            text: Type.String(),
          }),
          labels: Type.Array(BSkyPostLabel),
          likeCount: Type.Number(),
          repostCount: Type.Number(),
          replyCount: Type.Number(),
          quoteCount: Type.Optional(Type.Number()),
          indexedAt: Type.String(),
          embeds: Type.Optional(Type.Array(Self)),
          text: Type.Optional(Type.String()),
          facets: Type.Optional(Type.Array(BSkyFacet)),
        }),
        Type.Object({
          uri: Type.String(),
          cid: Type.String(),
          record: Type.Object({
            $type: Type.Literal('app.bsky.graph.starterpack'),
            createdAt: Type.String(),
            description: Type.String(),
            feeds: Type.Array(Type.Unknown()),
            list: Type.String(),
            name: Type.String(),
            updatedAt: Type.String(),
          }),
          creator: BSkyAuthor,
          joinedAllTimeCount: Type.Number(),
          joinedWeekCount: Type.Number(),
          labels: Type.Array(BSkyPostLabel),
          indexedAt: Type.String(),
          $type: Type.Literal('app.bsky.graph.defs#starterPackViewBasic'),
        }),
        Type.Object({
          $type: Type.Literal('app.bsky.feed.defs#generatorView'),
          uri: Type.String(),
          cid: Type.String(),
          did: Type.String(),
          creator: Author,
          displayName: Type.String(),
          description: Type.String(),
          avatar: Type.String(),
          likeCount: Type.Number(),
          labels: Type.Array(BSkyPostLabel),
          viewer: Type.Object({}),
          indexedAt: Type.String(),
        }),
        Type.Object({
          $type: Type.Literal('app.bsky.graph.defs#listView'),
          uri: Type.String(),
          cid: Type.String(),
          name: Type.String(),
          purpose: Type.Union([Type.Literal('app.bsky.graph.defs#curatelist'), Type.Literal('app.bsky.graph.defs#modlist')]),
          listItemCount: Type.Number(),
          indexedAt: Type.String(),
          labels: Type.Array(BSkyPostLabel),
          viewer: Type.Object({
            muted: Type.Boolean(),
          }),
          creator: Author,
          description: Type.String(),
          avatar: Type.Optional(Type.String()),
        }),
      ]),
    }),
    Type.Object({
      $type: Type.Literal('app.bsky.embed.recordWithMedia'),
      media: Type.Object({
        $type: Type.Literal('app.bsky.embed.external'),
        external: Type.Object({
          uri: Type.String(),
          title: Type.String(),
          description: Type.String(),
          thumb: Type.Object({
            $type: Type.Literal('blob'),
            ref: Type.Object({
              $link: Type.String(),
            }),
            mimeType: Type.String(),
            size: Type.Number(),
          }),
        }),
      }),
    }),
    Type.Object({
      $type: Type.Literal('app.bsky.embed.recordWithMedia#view'),
      media: Type.Union([
        Type.Object({
          $type: Type.Literal('app.bsky.embed.external#view'),
          external: Type.Optional(
            Type.Object({
              uri: Type.String(),
              title: Type.String(),
              description: Type.String(),
              thumb: Type.Optional(Type.String()),
            }),
          ),
        }),
        Type.Object({
          $type: Type.Literal('app.bsky.embed.images#view'),
          images: Type.Array(
            Type.Object({
              thumb: Type.String(),
              fullsize: Type.String(),
              alt: Type.String(),
              aspectRatio: Type.Object({
                height: Type.Number(),
                width: Type.Number(),
              }),
            }),
          ),
        }),
      ]),
      record: Type.Object({
        record: Type.Object({
          $type: Type.Literal('app.bsky.embed.record#viewRecord'),
          uri: Type.String(),
          cid: Type.String(),
          author: BSkyAuthor,
          value: Type.Object({
            $type: Type.Literal('app.bsky.feed.post'),
            createdAt: Type.String(),
            facets: Type.Optional(Type.Array(BSkyFacet)),
            embed: Type.Optional(
              Type.Union([
                Type.Object({
                  $type: Type.Literal('app.bsky.embed.recordWithMedia'),
                  media: Type.Object({
                    $type: Type.Literal('app.bsky.embed.external'),
                    external: Type.Object({
                      description: Type.String(),
                      thumb: Type.Object({
                        $type: Type.Literal('blob'),
                        ref: Type.Object({
                          $link: Type.String(),
                        }),
                        mimeType: Type.String(),
                        size: Type.Number(),
                      }),
                      title: Type.String(),
                      uri: Type.String(),
                    }),
                  }),
                  record: Type.Object({
                    $type: Type.Literal('app.bsky.embed.record'),
                    record: Type.Object({
                      cid: Type.String(),
                      uri: Type.String(),
                    }),
                  }),
                }),
                Type.Object({
                  $type: Type.Literal('app.bsky.embed.images'),
                  images: Type.Array(
                    Type.Object({
                      alt: Type.String(),
                      aspectRatio: Type.Object({
                        height: Type.Number(),
                        width: Type.Number(),
                      }),
                      image: Type.Object({
                        $type: Type.Literal('blob'),
                        ref: Type.Object({
                          $link: Type.String(),
                        }),
                        mimeType: Type.String(),
                        size: Type.Number(),
                      }),
                    }),
                  ),
                }),
              ]),
            ),
            langs: Type.Optional(Type.Array(Type.String())),
            reply: Type.Optional(
              Type.Object({
                parent: Type.Object({
                  cid: Type.String(),
                  uri: Type.String(),
                }),
                root: Type.Object({
                  cid: Type.String(),
                  uri: Type.String(),
                }),
              }),
            ),
            text: Type.String(),
          }),
          labels: Type.Array(BSkyPostLabel),
          likeCount: Type.Number(),
          replyCount: Type.Number(),
          repostCount: Type.Number(),
          quoteCount: Type.Number(),
          indexedAt: Type.String(),
          embeds: Type.Optional(Type.Array(Self)),
        }),
      }),
    }),
    Type.Object({
      $type: Type.Literal('app.bsky.embed.video#view'),
      cid: Type.String(),
      playlist: Type.String(),
      thumbnail: Type.String(),
      aspectRatio: Type.Object({
        height: Type.Number(),
        width: Type.Number(),
      }),
      alt: Type.Optional(Type.String()),
    }),
  ]);
});

// Type.Union([
//   Type.Object({
//     $type: Type.Literal('app.bsky.embed.record'),
//     record: Type.Object({
//       cid: Type.String(),
//       uri: Type.String(),
//     }),
//   }),
//   Type.Object({
//     $type: Type.Literal('app.bsky.embed.recordWithMedia'),
//     media: Type.Union([
//       Type.Object({
//         $type: Type.Literal('app.bsky.embed.external'),
//         external: Type.Object({
//           description: Type.String(),
//           thumb: Type.Object({
//             $type: Type.Literal('blob'),
//             ref: Type.Object({
//               $link: Type.String(),
//             }),
//             mimeType: Type.String(),
//             size: Type.Number(),
//           }),
//           title: Type.String(),
//           uri: Type.String(),
//         }),
//       }),
//       Type.Object({
//         $type: Type.Literal('app.bsky.embed.images'),
//         images: Type.Array(
//           Type.Object({
//             alt: Type.String(),
//             aspectRatio: Type.Object({
//               height: Type.Number(),
//               width: Type.Number(),
//             }),
//             image: Type.Object({
//               $type: Type.Literal('blob'),
//               ref: Type.Object({
//                 $link: Type.String(),
//               }),
//               mimeType: Type.String(),
//               size: Type.Number(),
//             }),
//           }),
//         ),
//       }),
//     ]),

//     record: Type.Object({
//       $type: Type.Literal('app.bsky.embed.record'),
//       record: Type.Object({
//         cid: Type.String(),
//         uri: Type.String(),
//       }),
//     }),
//   }),
//   Type.Object({
//     $type: Type.Literal('app.bsky.embed.images'),
//     images: Type.Array(
//       Type.Object({
//         alt: Type.String(),
//         aspectRatio: Type.Object({
//           height: Type.Number(),
//           width: Type.Number(),
//         }),
//         image: Type.Object({
//           $type: Type.Literal('blob'),
//           ref: Type.Object({
//             $link: Type.String(),
//           }),
//           mimeType: Type.String(),
//           size: Type.Number(),
//         }),
//       }),
//     ),
//   }),
//   Type.Object({
//     $type: Type.Literal('app.bsky.embed.video'),
//     alt: Type.Optional(Type.String()),
//     aspectRatio: Type.Object({
//       height: Type.Number(),
//       width: Type.Number(),
//     }),
//     video: Type.Object({
//       $type: Type.Literal('blob'),
//       ref: Type.Object({
//         $link: Type.String(),
//       }),
//       mimeType: Type.String(),
//       size: Type.Number(),
//     }),
//   }),
//   Type.Object({
//     $type: Type.Literal('app.bsky.embed.external'),
//     external: Type.Object({
//       description: Type.String(),
//       thumb: Type.Object({
//         $type: Type.Literal('blob'),
//         ref: Type.Object({
//           $link: Type.String(),
//         }),
//         mimeType: Type.String(),
//         size: Type.Number(),
//       }),

//       title: Type.String(),
//       uri: Type.String(),
//     }),
//   }),
// ]),

export type BSkyPostEmbed = Static<typeof BSkyPostEmbed>;

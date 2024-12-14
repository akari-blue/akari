import { BskyAgent } from "@atproto/api";
import { BlueskyProfile, TimelinePage } from "./types_old";

const PUBLIC_API = "https://public.api.bsky.app";

export const searchProfiles = async (
  query: string
): Promise<BlueskyProfile[]> => {
  if (query.length < 1) return [];

  try {
    const response = await fetch(
      `${PUBLIC_API}/xrpc/app.bsky.actor.searchActorsTypeahead?term=${encodeURIComponent(
        query
      )}&limit=5`
    );
    if (!response.ok) throw new Error("Failed to search profiles");

    const data = await response.json();
    return data.actors;
  } catch (error) {
    console.error("Failed to search profiles:", error);
    return [];
  }
};

export const getTimeline = async (
  agent: BskyAgent,
  cursor?: string
): Promise<TimelinePage> => {
  if (!agent) throw new Error("Agent is required");

  try {
    const response = await agent.app.bsky.feed.getTimeline({
      limit: 20,
      cursor,
    });
    return {
      posts:
        response.data.feed.map((item: any) => ({
          uri: item.post.uri,
          cid: item.post.cid,
          author: {
            did: item.post.author.did,
            handle: item.post.author.handle,
            displayName: item.post.author.displayName,
            avatar: item.post.author.avatar,
          },
          record: {
            text: item.post.record.text,
            createdAt: item.post.record.createdAt,
          },
          reply: item.reply && {
            parent: {
              uri: item.reply.parent.uri,
              cid: item.reply.parent.cid,
              author: {
                did: item.reply.parent.author.did,
                handle: item.reply.parent.author.handle,
                displayName: item.reply.parent.author.displayName,
              },
              text: item.reply.parent.record.text,
            },
          },
          embed: item.post.embed,
          replyCount: item.post.replyCount,
          repostCount: item.post.repostCount,
          likeCount: item.post.likeCount,
          viewer: {
            like: item.post.viewer?.like,
          },
          indexedAt: item.post.indexedAt,
        })) ?? [],
      cursor: response.data.cursor,
    };
  } catch (error) {
    console.error("Failed to fetch timeline:", error);
    throw error;
  }
};

export const getDiscoverFeed = async (
  agent: BskyAgent,
  cursor?: string
): Promise<TimelinePage> => {
  if (!agent) throw new Error("Agent is required");

  try {
    const response = await agent.app.bsky.feed.getTimeline({
      algorithm: "reverse-chronological",
      limit: 20,
      cursor,
    });

    return {
      posts: response.data.feed.map((item: any) => ({
        uri: item.post.uri,
        cid: item.post.cid,
        author: {
          did: item.post.author.did,
          handle: item.post.author.handle,
          displayName: item.post.author.displayName,
          avatar: item.post.author.avatar,
        },
        record: {
          text: item.post.record.text,
          createdAt: item.post.record.createdAt,
        },
        reply: item.reply && {
          parent: {
            uri: item.reply.parent.uri,
            cid: item.reply.parent.cid,
            author: {
              did: item.reply.parent.author.did,
              handle: item.reply.parent.author.handle,
              displayName: item.reply.parent.author.displayName,
            },
            text: item.reply.parent.record.text,
          },
        },
        embed: item.post.embed,
        replyCount: item.post.replyCount,
        repostCount: item.post.repostCount,
        likeCount: item.post.likeCount,
        viewer: {
          like: item.post.viewer?.like,
        },
        indexedAt: item.post.indexedAt,
      })),
      cursor: response.data.cursor,
    };
  } catch (error) {
    console.error("Failed to fetch discover feed:", error);
    throw error;
  }
};

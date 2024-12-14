import { BskyAgent } from "@atproto/api";

export type BlueskyCredentials = {
  handle: string;
  password: string;
};

export type BlueskyProfile = {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
};

export type BlueskyReply = {
  parent: {
    uri: string;
    cid: string;
    author: {
      did: string;
      handle: string;
      displayName?: string;
    };
    text: string;
  };
};

export type BlueskyPost = {
  uri: string;
  cid: string;
  author: BlueskyProfile;
  record: {
    text: string;
    createdAt: string;
  };
  reply?: BlueskyReply;
  embed?: {
    images?: Array<{
      thumb: string;
      fullsize: string;
      alt: string;
    }>;
  };
  replyCount: number;
  repostCount: number;
  likeCount: number;
  viewer?: {
    like?: string;
  };
  indexedAt: string;
};

export type TimelinePage = {
  posts: BlueskyPost[];
  cursor?: string;
};

export type BlueskyState = {
  agent: BskyAgent | null;
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  login: (credentials: BlueskyCredentials) => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;
};

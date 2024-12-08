import { BskyAgent } from '@atproto/api';

export interface BlueskyCredentials {
  handle: string;
  password: string;
}

export interface BlueskyProfile {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

export interface BlueskyReply {
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
}

export interface BlueskyPost {
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
}

export interface TimelinePage {
  posts: BlueskyPost[];
  cursor?: string;
}

export interface BlueskyState {
  agent: BskyAgent | null;
  isAuthenticated: boolean;
  session: any;
  login: (credentials: BlueskyCredentials) => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;
}
export const Handle = ({ handle }: { handle: string }) => {
  return `@${handle.replace('.bsky.social', '')}`;
};

type Events = {
  translate: { language: string };
  copyToClipboard: { type: 'post-text' | 'post-link' };
};

declare global {
  interface Window {
    plausible: {
      (...args: unknown[]): void;
      q: unknown[];
    };
  }
}
const plausible = (window.plausible =
  window.plausible ||
  function (...args: unknown[]) {
    (window.plausible.q = window.plausible.q || []).push(args);
  });

function trackEvent<EventType extends keyof Events>(
  eventType: EventType,
  ...args: Events[EventType] extends never ? [] : [Events[EventType]]
) {
  if (args.length > 0) {
    plausible(eventType, { props: args[0] });
  } else {
    plausible(eventType);
  }
}

export const usePlausible = () => {
  return {
    trackEvent,
  };
};

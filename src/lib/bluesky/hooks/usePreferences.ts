import { useQuery } from "@tanstack/react-query";
import { useBlueskyStore } from "../store";

export function usePreferences() {
  const { agent } = useBlueskyStore();

  return useQuery({
    queryKey: ["preferences"],
    queryFn: async () => {
      if (!agent) {
        throw new Error("Not authenticated");
      }
      const response = await agent.app.bsky.actor.getPreferences();
      return response.data.preferences;
    },
    enabled: !!agent,
  });
}

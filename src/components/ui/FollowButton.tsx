export function FollowButton({ following }: { handle: string; following: boolean }) {
  return (
    <div className="flex items-center">
      <button className="bg-neutral-200 text-black p-1 text-xs rounded-md">{following ? 'unfollow' : 'follow'}</button>
    </div>
  );
}

import { useForm } from 'react-hook-form';
import { useCreatePost } from '../lib/bluesky/hooks/useCreatePost';
import { Button } from './ui/Button';

interface PostFormData {
  text: string;
}

export function CreatePost() {
  const createPost = useCreatePost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>();

  const onSubmit = (data: PostFormData) => {
    createPost.mutate(data.text, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-black p-4 rounded-lg shadow mb-4">
      <textarea
        {...register('text', { required: 'Post content is required' })}
        placeholder="What's on your mind?"
        className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
        rows={3}
      />
      {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text.message}</p>}
      <div className="mt-2 flex justify-end">
        <Button type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? 'Posting...' : 'Post'}
        </Button>
      </div>
      {createPost.error && <p className="mt-2 text-red-500 text-sm">{createPost.error.message}</p>}
    </form>
  );
}

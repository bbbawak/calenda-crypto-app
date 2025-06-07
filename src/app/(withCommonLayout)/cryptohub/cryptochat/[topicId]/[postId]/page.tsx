import PostDetailsPage from '@/components/Post/PostDetailsPage';
import React from 'react'

export async function generateStaticParams() {
  return [
    { topicId: '1', postId: '1' },
    { topicId: '2', postId: '1' },
    { topicId: '3', postId: '1' },
    { topicId: 'dummy-1', postId: '1' },
    { topicId: 'dummy-2', postId: '1' }
  ];
}

interface PageProps {
  params: {
    postId: string;
  }
}

const PostPage = ({ params: { postId } }: PageProps) => {
  return (
    <div>
      <PostDetailsPage postId={postId} />
    </div>
  )
}

export default PostPage

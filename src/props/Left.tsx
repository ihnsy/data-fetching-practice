import React from 'react';

import { Post } from '../interface';

interface PostListProps {
  posts: Post[];
  selectedPostId: number | null;
  onSelectPost: (id: number) => void;
}

const Left: React.FC<PostListProps> = ({
  posts,
  selectedPostId,
  onSelectPost,
}) => {
  return (
    <div>
      <h2>포스트 목록</h2>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => {
              onSelectPost(post.id);
            }}
            style={{
              cursor: 'pointer',
              fontWeight: post.id === selectedPostId ? 'bold' : 'normal',
            }}
          >
            {post.id}.&nbsp{post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Left;

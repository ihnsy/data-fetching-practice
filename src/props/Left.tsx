import '../App.css';

import type { Post } from '../interface';

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
    <>
      <h2>포스트 목록</h2>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => {
              onSelectPost(post.id);
            }}
            className={`postItem ${post.id === selectedPostId ? 'selected' : ''}`}
          >
            {post.id}.&nbsp;{post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Left;

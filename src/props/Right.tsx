import React, { useEffect, useState } from 'react';

import { Comment, Post } from '../interface';

interface PostDetailProps {
  postId: number;
}

const Right: React.FC<PostDetailProps> = ({ postId }) => {
  const [post, setPost] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const [postResponse, commentsResponse] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`),
      ]);

      const postData = await postResponse.json();
      const commentsData = await commentsResponse.json();

      setPost(postData);
      setComments(commentsData);
    };

    fetchPostAndComments();
  }, [postId]);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h3>댓글</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default Right;

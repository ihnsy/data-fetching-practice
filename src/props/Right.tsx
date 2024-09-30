import '../App.css';

import React, { useEffect, useState } from 'react';

import type { Comment, Post } from '../interface';

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
    <>
      <h2>내용</h2>
      <p>{post.body}</p>
      <h2>댓글</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <b>
              작성자: {comment.name} ({comment.email})
            </b>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Right;

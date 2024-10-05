import '../App.css';

import React, { useEffect, useState } from 'react';

import type { Comment, Post } from '../interface';

interface PostDetailProps {
  postId: number;
}

const Right: React.FC<PostDetailProps> = ({ postId }) => {
  // 1. post를 배열이 아닌 단일 객체로 설정 (Post | null)
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const [postResponse, commentsResponse] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`),
      ]);

      const postData = (await postResponse.json()) as Post;
      const commentsData = (await commentsResponse.json()) as Comment[];
      setPost(postData); // 2. postData를 단일 객체로 저장
      setComments(commentsData);
    };

    void fetchPostAndComments();
  }, [postId]);

  return (
    <>
      <h2>내용</h2>
      {post != null ? <p>{post.body}</p> : <p>Loading...</p>}

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

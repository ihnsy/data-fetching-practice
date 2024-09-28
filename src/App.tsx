import './App.css';

import React, { useEffect, useState } from 'react';

import { Post } from './interface';
import Left from './props/Left';
import Right from './props/Right';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    // 포스트 목록을 가져오는 함수
    const fetchPosts = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const data = await response.json();
      setPosts(data);
      setSelectedPostId(data[0]?.id || null);
    };

    fetchPosts();
  }, []);

  return (
    <div className='wrapper'>
      <div className='leftPane'>
        <Left
          posts={posts}
          selectedPostId={selectedPostId}
          onSelectPost={setSelectedPostId}
        />
      </div>
      <div className='rightPane'>
        {selectedPostId && <Right postId={selectedPostId} />}
      </div>
    </div>
  );
};

export default App;

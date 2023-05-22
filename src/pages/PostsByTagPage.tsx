import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CommunityData } from '../types/communityData';
import PostItem from 'components/common/PostMainItem';

const PostsByTagPage = () => {
  const { tag } = useParams<{ tag?: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [posts, setPosts] = useState<CommunityData[]>([]);
  console.log('tag: ', tag); // tag 확인

  useEffect(() => {
    const fetchPosts = async () => {
      if (!tag) {
        return; // tag이 undefined일 경우 요청을 보내지 않음
      }
      try {
        const response = await axios.get(`http://3.39.153.141/search?hashtagName=${tag}`);
        setPosts(response?.data?.result?.content);
        console.log('Posts: ', response.data); // posts 확인
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, [tag]);

  return (
    <div>
      {posts.map((data) => (
        <PostItem
          recordedId={data?.recordedId}
          title={data?.title}
          bookMarkStatus={data?.bookMarkStatus}
          likeCnt={data?.likeCnt}
          bookmarkCnt={data?.bookMarkCnt}
          vibeTag={data?.vibeTags}
          activityTag={data?.activityTags}
          place={data?.recordedPlaces}
          key={data?.recordedId}></PostItem>
      ))}
    </div>
  );
};

export default PostsByTagPage;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CommunityData } from '../types/communityData';
import PostItem from 'components/common/PostMainItem';

async function fetchPostsByTag(tag: string) {
  try {
    // API에서 태그에 해당하는 게시물들을 가져옵니다.
    const response = await axios.get(`http://3.39.153.141/posts?tag=${tag}`);
    // 가져온 데이터를 CommunityData 타입으로 변환합니다.
    return response.data as CommunityData[];
  } catch (error) {
    console.error('Failed to get posts: ', error);
    return [];
  }
}

const PostsByTagPage = () => {
  const { tag } = useParams<{ tag?: string }>();
  // 가져온 게시물들을 상태로 관리하기 위한 state를 선언합니다.
  const [filteredPosts, setFilteredPosts] = useState<CommunityData[]>([]);

  // 컴포넌트가 마운트되거나 tag가 변경될 때마다, 게시물을 새로 가져옵니다.
  useEffect(() => {
    if (tag) {
      fetchPostsByTag(tag).then((posts) => {
        // 가져온 게시물들을 저장합니다.
        setFilteredPosts(posts);
      });
    }
  }, [tag]);

  return (
    <div>
      {filteredPosts.map((data: CommunityData, index: number) => (
        <PostItem
          key={index}
          recordedId={data.recordedId}
          title={data.title}
          bookMarkStatus={data.bookMarkStatus}
          likeCnt={data.likeCnt}
          bookmarkCnt={data.bookMarkCnt}
          vibeTag={data.vibeTags}
          activityTag={data.activityTags}
          place={data.recordedPlaces}
        />
      ))}
    </div>
  );
};

export default PostsByTagPage;

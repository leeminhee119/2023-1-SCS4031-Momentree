import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CommunityData } from '../types/communityData';
import PostItem from 'components/common/PostMainItem';

async function fetchPostsByTag(tag: string) {
  const response = await axios.get(`http://3.39.153.141/posts?tag=${tag}`);
  return response.data as CommunityData[];
}

const PostsByTagPage = () => {
  const { tag } = useParams<{ tag?: string }>();
  const [filteredPosts, setFilteredPosts] = useState<CommunityData[]>([]);

  useEffect(() => {
    if (tag) {
      fetchPostsByTag(tag).then((posts) => {
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

import styled from 'styled-components';
import filterIcon from '../../assets/icons/filter.svg';
import { useNavigate } from 'react-router-dom';
import { CommunityData } from '../../types/communityData';
import PostItem from 'components/common/PostMainItem';

interface CommunityDataProps {
  communityData: CommunityData[];
}

const Community = ({ communityData }: CommunityDataProps) => {
  const navigate = useNavigate();

  return (
    <CommunityContainer>
      <Label>
        <img src={filterIcon} alt="필터 아이콘"></img>
        <Filter>
          <option>최신순</option>
          <option>인기순</option>
        </Filter>
      </Label>
      <CommunityList>
        {communityData?.map((data: CommunityData, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`/post/${data?.recordedId}`);
                window.location.reload();
              }}>
              <PostItem
                title={data?.title}
                bookMarkStatus={data?.bookMarkStatus}
                likeCnt={data?.likeCnt}
                bookmarkCnt={data?.bookMarkCnt}
                vibeTag={data?.vibeTags}
                activityTag={data?.activityTags}
                place={data?.recordedPlaces}
                key={index}></PostItem>
            </div>
          );
        })}
      </CommunityList>
    </CommunityContainer>
  );
};

export default Community;

const CommunityContainer = styled.section`
  margin: 1.6rem 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray500};

  img {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const Filter = styled.select`
  outline: none;
  border: none;
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray500};

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #fff;
`;

const CommunityList = styled.section`
  margin-top: 1.6rem;
`;

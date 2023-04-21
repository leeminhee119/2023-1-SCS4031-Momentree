import styled from 'styled-components';
import filterIcon from '../../assets/icons/filter.svg';
import CommunityItem from './CommunityItem';

const Community = () => {
  const CommunityData = [
    {
      record_id: 1,
      title: '즐거운 여행',
      record_content: '너무 즐거웠어요',
      bookMarkStatus: true,
      likeStatus: false,
      likeCnt: 134,
      bookmarkCnt: 13,
      place: ['강남구', '서초구'],
      tags: ['편안함', '신나는', '즐거운'],
    },
    {
      record_id: 2,
      title: '남산 데이트 코스',
      record_content: '너무 즐거웠어요',
      bookMarkStatus: false,
      likeStatus: false,
      likeCnt: 203,
      bookmarkCnt: 34,
      place: ['중구'],
      tags: ['활동적인', '액티비티', '등산', '활기찬'],
    },
  ];

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
        {CommunityData.map((data, index) => {
          return (
            <CommunityItem
              title={data.title}
              bookMarkStatus={data.bookMarkStatus}
              likeCnt={data.likeCnt}
              bookmarkCnt={data.bookmarkCnt}
              tags={data.tags}
              place={data.place}
              key={index}></CommunityItem>
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

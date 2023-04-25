import styled from 'styled-components';

const WriterInfo = () => {
  return (
    <WriterInfoContatiner>
      <div>
        <img src="https://user-images.githubusercontent.com/62867581/234172890-03b605e4-9e8d-4661-8142-cb94bae8e3a4.png"></img>
        <Info>
          <h1>모멘트리</h1>
          <p>글 119 · 팔로워 33</p>
        </Info>
      </div>
      <AddFollowerButton type="button"> + 팔로우 </AddFollowerButton>
    </WriterInfoContatiner>
  );
};
export default WriterInfo;

const WriterInfoContatiner = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  height: 5.8rem;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Info = styled.article`
  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.suubtitle2};
  }

  p {
    color: ${({ theme }) => theme.colors.gray400};
    ${({ theme }) => theme.fonts.caption2};
  }
`;

const AddFollowerButton = styled.button`
  width: 65px;
  height: 26px;

  border-radius: 99px;
  color: ${({ theme }) => theme.colors.gray900};
  background-color: ${({ theme }) => theme.colors.gray300};
  ${({ theme }) => theme.fonts.caption1};

  cursor: pointer;
`;

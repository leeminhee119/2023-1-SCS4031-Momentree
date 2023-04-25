import styled from 'styled-components';
import { useState } from 'react';
import { atom, useRecoilState } from 'recoil';

const moodTagsState = atom<string[]>({
  key: 'moodTagsState',
  default: [],
});
const activityTagsState = atom<string[]>({
  key: 'activityTagsState',
  default: [],
});
const userMoodTagsState = atom<string[]>({
  key: 'userMoodTagsState',
  default: [],
});
const userActivityTagsState = atom<string[]>({
  key: 'userActivityTagsState',
  default: [],
});
const SelectTags = () => {
  const moodTagsData = ['편안한', '따뜻한', '로맨틱한', '맛있는', '신나는', '힐링', '조용한', '힙한'];
  const activityTagsData = ['영화', '맛집투어', '레저', '휴식', '산책', '운동', '게임', '체험'];

  const [moodTags, setMoodTags] = useRecoilState(moodTagsState);
  const [activityTags, setActivityTags] = useRecoilState(activityTagsState);
  const [userMoodTags, setUserMoodTags] = useRecoilState(userMoodTagsState);
  const [userActivityTags, setUserActivityTags] = useRecoilState(userActivityTagsState);
  const [inputTag, setInputTag] = useState({
    moodInput: '',
    activityInput: '',
  });
  const { moodInput, activityInput } = inputTag;

  // recoil atom에 선택한 태그들을 저장해줍니다.
  const handleSelectTagMood = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedTagName = event.currentTarget.innerHTML;
    if (moodTags.includes(selectedTagName)) {
      setMoodTags(moodTags.filter((tag) => tag != selectedTagName));
    } else {
      setMoodTags([...moodTags, selectedTagName]);
    }
  };
  const handleSelectTagActivity = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedTagName = event.currentTarget.innerHTML;
    if (activityTags.includes(selectedTagName)) {
      setActivityTags(activityTags.filter((tag) => tag != selectedTagName));
    } else {
      setActivityTags([...activityTags, selectedTagName]);
    }
  };

  // input 입력 시 스페이스바를 눌렀을 때의 이벤트 핸들러
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      const target = event.target as HTMLInputElement;
      const name = target.name;
      if (name === 'moodInput') {
        setUserMoodTags([...userMoodTags, moodInput]);
      } else {
        setUserActivityTags([...userActivityTags, activityInput]);
      }

      // 다음 태그 입력을 위해 input을 초기화해줍니다.
      setInputTag({
        ...inputTag,
        [name]: '',
      });
    }
  };
  const handleInputTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    // 스페이스 키를 입력하지 않는 동안만 state를 업데이트 해줍니다.
    if (value.substring(value.length - 1) != ' ') {
      setInputTag({
        ...inputTag,
        [name]: value,
      });
    }
  };

  // 삭제 대상인 태그의 인덱스를 통해 삭제를 해줍니다.
  const handleDelete = (targetIndex: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = event.target as HTMLInputElement;
    const id = target.id;
    if (id === 'mood') {
      const newMoodArray = [...userMoodTags.slice(0, targetIndex), ...userMoodTags.slice(targetIndex + 1)];
      setUserMoodTags(newMoodArray);
    } else {
      const newActivityArray = [...userActivityTags.slice(0, targetIndex), ...userActivityTags.slice(targetIndex + 1)];
      setUserActivityTags(newActivityArray);
    }
  };
  console.log('moodTags', moodTags);
  console.log('activityTags', activityTags);
  console.log('userMoodTags', userMoodTags);
  console.log('userActivityTags', userActivityTags);
  return (
    <>
      <SelectTagsLayout>
        <TitleBox>
          데이트의 <strong>분위기</strong>를<br />
          모두 선택해주세요!
        </TitleBox>
        <TagsRow>
          {moodTagsData.map((tag: string, index: number) => {
            return (
              <TagButton key={index} onClick={handleSelectTagMood} className={moodTags.includes(tag) ? 'selected' : ''}>
                {tag}
              </TagButton>
            );
          })}
        </TagsRow>
        <TitleBox>
          데이트가 <strong>어떤 활동</strong>으로 이루어져 있는지
          <br />
          모두 선택해주세요!
        </TitleBox>
        <TagsRow>
          {activityTagsData.map((tag: string, index: number) => {
            return (
              <TagButton
                key={index}
                onClick={handleSelectTagActivity}
                className={activityTags.includes(tag) ? 'selected' : ''}>
                {tag}
              </TagButton>
            );
          })}
        </TagsRow>
        <UserTagsRow>
          <h1>분위기 태그</h1>
          <CreateTagsRow>
            {userMoodTags.map((tag: string, index: number) => {
              return (
                <CreatedTagBox key={index}>
                  <div>#</div>
                  <div>{tag}</div>
                  <DeleteButton id="mood" onClick={(event) => handleDelete(index, event)}>
                    x
                  </DeleteButton>
                </CreatedTagBox>
              );
            })}
            <CreateTagBox>
              <div>#</div>
              <input
                value={moodInput}
                name="moodInput"
                placeholder="태그 입력"
                onChange={handleInputTag}
                onKeyDown={handleKeyDown}
              />
            </CreateTagBox>
          </CreateTagsRow>
        </UserTagsRow>
        <UserTagsRow>
          <h1>활동 태그</h1>
          <CreateTagsRow>
            {userActivityTags.map((tag: string, index: number) => {
              return (
                <CreatedTagBox key={index}>
                  <div>#</div>
                  <div>{tag}</div>
                  <DeleteButton id="activity" onClick={(event) => handleDelete(index, event)}>
                    x
                  </DeleteButton>
                </CreatedTagBox>
              );
            })}
            <CreateTagBox>
              <div>#</div>
              <input
                value={activityInput}
                name="activityInput"
                placeholder="태그 입력"
                onChange={handleInputTag}
                onKeyDown={handleKeyDown}
              />
            </CreateTagBox>
          </CreateTagsRow>
        </UserTagsRow>
      </SelectTagsLayout>
    </>
  );
};

// 해시태그 버튼 선택
const SelectTagsLayout = styled.div`
  padding: 1.5rem;
`;
const TitleBox = styled.div`
  ${({ theme }) => theme.fonts.suubtitle1};
  strong {
    color: ${({ theme }) => theme.colors.mainDark};
  }
`;
const TagsRow = styled.div`
  margin: 2rem -3px 4rem;
`;
const TagButton = styled.button`
  ${({ theme }) => theme.fonts.suubtitle2};
  border: 1.5px solid;
  border-radius: 99px;
  border-color: ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray700};
  display: inline-block;
  margin: 2px 3px;
  padding: 0.5rem 0.8rem;
  &.selected {
    color: ${({ theme }) => theme.colors.main900};
    border-color: ${({ theme }) => theme.colors.main900};
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

// 해시태그 직접 입력
const UserTagsRow = styled.div`
  h1 {
    ${({ theme }) => theme.fonts.suubtitle1};
  }
`;
const CreateTagsRow = styled.div`
  display: flex;
`;
const CreateTagBox = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.body2};
  input {
    ${({ theme }) => theme.fonts.body2};
    border: none;
  }
`;
const CreatedTagBox = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.body2};
`;
const DeleteButton = styled.button``;
export default SelectTags;

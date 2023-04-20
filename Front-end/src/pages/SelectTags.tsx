import styled from 'styled-components';
import { atom, useRecoilState } from 'recoil';

const moodTagsState = atom<string[]>({
    key: 'moodTagsState',
    default: [],
})
const activityTagsState = atom<string[]>({
    key: 'activityTagsState',
    default: [],
})
const SelectTags = () => {
    const moodTagsData = ['편안한', '따뜻한', '로맨틱한', '맛있는', '신나는', '힐링', '조용한', '힙한']
    const activityTagsData = ['영화', '맛집투어', '레저', '휴식', '산책', '운동', '게임', '체험']

    const [moodTags, setMoodTags] = useRecoilState(moodTagsState);
    const [activityTags, setActivityTags] = useRecoilState(activityTagsState);

    
    // recoil atom에 선택한 태그들을 저장해줍니다.
    const handleSelectTagMood = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selectedTagName = event.currentTarget.innerHTML;
        if (moodTags.includes(selectedTagName)) {
            setMoodTags(moodTags.filter(tag => tag != selectedTagName));
        } else {
            setMoodTags([...moodTags, selectedTagName]);
        }
    }
    const handleSelectTagActivity = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selectedTagName = event.currentTarget.innerHTML;
        if (activityTags.includes(selectedTagName)) {
            setActivityTags(activityTags.filter(tag => tag != selectedTagName));
        } else {
            setActivityTags([...activityTags, selectedTagName]);
        }
    }
    return (
        <SelectTagsLayout>
            <TitleBox>데이트의 <strong>분위기</strong>를<br/>모두 선택해주세요!</TitleBox>
            <TagsRow>
                {
                    moodTagsData.map((tag:string, index:number) => {
                        return (
                            <TagButton key={index}
                            onClick={handleSelectTagMood}
                            className={(moodTags.includes(tag)) ? 'selected' : ''}
                            >{tag}</TagButton>
                        )
                    })
                }
            </TagsRow>
            <TitleBox>데이트가 <strong>어떤 활동</strong>으로 이루어져 있는지<br/>모두 선택해주세요!</TitleBox>
            <TagsRow>
                {
                    activityTagsData.map((tag:string, index:number) => {
                        return (
                            <TagButton key={index}
                            onClick={handleSelectTagActivity}
                            className={(activityTags.includes(tag)) ? 'selected' : ''}
                            >{tag}</TagButton>
                        )
                    })
                }
            </TagsRow>
        </SelectTagsLayout>
    );
};

const SelectTagsLayout = styled.div`
    padding: 1.5rem;
`
const TitleBox = styled.div`
    font-size: 2rem;
    strong {
        font-weight: 900;
    }
`
const TagsRow = styled.div`
    margin: 2rem -3px 4rem;
`
const TagButton = styled.button`
    display: inline-block;
    margin: 2px 3px;
    font-size: 1.2rem;
    padding: 0.5rem 0.8rem;
    border: 1px solid #000;
    border-radius: 2rem;
    &.selected {
        background-color: #000;
        color: #fff;
    }
`

export default SelectTags;

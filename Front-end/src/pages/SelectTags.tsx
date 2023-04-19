import styled from 'styled-components';


const SelectTags = () => {
    const tagsMood = ['편안한', '따뜻한', '로맨틱한', '맛있는', '신나는', '힐링', '조용한', '힙한']
    const tagsActivity = ['영화', '맛집투어', '레저', '휴식', '산책', '운동', '게임', '체험']
    return (
        <SelectTagsLayout>
            <TitleBox>데이트의 <strong>분위기</strong>를<br/>모두 선택해주세요!</TitleBox>
            <TagsRow>
                {
                    tagsMood.map((tag:string) => {
                        return (
                            <TagBox>{tag}</TagBox>
                        )
                    })
                }
            </TagsRow>
            <TitleBox>데이트가 <strong>어떤 활동</strong>으로 이루어져 있는지<br/>모두 선택해주세요!</TitleBox>
            <TagsRow>
                {
                    tagsActivity.map((tag:string) => {
                        return (
                            <TagBox>{tag}</TagBox>
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
const TagBox = styled.div`
    display: inline-block;
    margin: 2px 3px;
    font-size: 1.2rem;
    padding: 0.5rem 0.8rem;
    border: 1px solid #000;
    border-radius: 2rem;
`

export default SelectTags;

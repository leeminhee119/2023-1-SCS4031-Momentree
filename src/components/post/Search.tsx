import styled from 'styled-components';
import searchIcon from '../../assets/icons/search.svg';

interface ISearch {
  placeholder: string;
  onChange: (value: string) => void;
}

const Search = (props: ISearch) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };
  return (
    <SearchContainer>
      <SearchContainder placeholder={props.placeholder} onChange={handleChange} />
      <SearchIcon src={searchIcon} alt="검색 아이콘" />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.section`
  position: relative;
`;

const SearchContainder = styled.input`
  width: 100%;
  height: 4.6rem;
  padding: 1.5rem;
  padding-left: 3.6rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.body2};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 1.4rem;
  margin-top: 1.6rem;
  z-index: 1;
  color: rgb(79, 91, 102);
`;

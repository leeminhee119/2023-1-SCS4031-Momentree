import styled from 'styled-components';

interface ISaveButton {
  isActive: boolean;
  label?: string;
  handleClickSave: () => void;
}
const SaveButton = (props: ISaveButton) => {
  return (
    <ButtonLayout>
      <Button
        onClick={props.isActive ? props.handleClickSave : () => console.log('Inactive Button')}
        isActive={props.isActive}>
        {props.label === undefined ? '저장' : props.label}
      </Button>
    </ButtonLayout>
  );
};

const ButtonLayout = styled.div`
  height: 5.2rem;
  margin-top: auto;
  width: 100%;
`;
const Button = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.mainDark : theme.colors.gray300)};
  color: ${({ theme }) => theme.colors.gray100};
  border-radius: 8px;
  ${({ theme }) => theme.fonts.body1}
`;

export default SaveButton;

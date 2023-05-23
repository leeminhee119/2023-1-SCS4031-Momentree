import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Loader = () => {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#F8DB99" />
    </LoaderWrap>
  );
};

const LoaderWrap = styled.section`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

export default Loader;

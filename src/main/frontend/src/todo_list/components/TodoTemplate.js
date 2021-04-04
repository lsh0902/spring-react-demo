import React, {useState} from 'react';
import styled, {css} from 'styled-components';

const TodoButton = styled.button`
  width : 200px;
  font-size : 20px;
  font-weight : bold;
  color : #444;
  outline : none;
  border : 3px solid #888;
  border-radius:20px;
  position : relative;
  top : 10px;
  left : 10px;
  cursor:pointer;
  box-sizing : border-box;

  ${props => 
    props.show &&
      css`
      background-color : black;
      color : white;
      border : 3px solid black;
      box-sizing : border-box;
      `
}
`

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  opacity : 0;
  transition : 0.1s ease-in;
  ${props => 
      props.show &&
        css`
        opacity : 1;
        `
  }
`;

function TodoTemplate({children}) {
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(!show);
  }

  return (
    <>
      <TodoButton onClick={onClick} show={show}>Show me</TodoButton>
      <TodoTemplateBlock show={show}>
        {children}
      </TodoTemplateBlock>
    </>
  );
}

export default TodoTemplate;
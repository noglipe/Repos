import styled, { keyframes } from "styled-components";


export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px;
  padding: 30px;
  margin: 80px auto;

  h1{
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
`

interface FormProps {
    error?: boolean;
}

export const Form = styled.form<FormProps>`
  margin-top: 30px;
  display:flex;
  flex-direction:row;

  input{
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff0000' : '#ddd')};
    color: ${props => (props.error ? '#ff0000' : '#ddd')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`

const animate = keyframes`
    form{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`

export const Rotate = styled.div`
    svg{
        animation: ${animate} 2s linear infinite;
    }
`

export const SubmitButton = styled.button.attrs({
    type: 'submit',
})`
  background: #0D2636;
  border: 0;
  border-radius: 4px;
  margin-left: 5px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & + li{
            border-top: 1px solid #383636;
        }

        a{
            color: #0D2636;
            text-decoration: none;
        }
    }
`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`

margin-left: 16px;
background: transparent;
color: #0d2636;
border: 0;
padding: 8px 7px;
outline: 0;
border-radius: 4px;
`
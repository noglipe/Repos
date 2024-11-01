import Link from "next/link";
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
    $error?: boolean;
    alert?: boolean;
}

export const Form = styled.form<FormProps>`
  margin-top: 30px;
  display:flex;
  flex-direction:row;

  input{
    flex: 1;
    border: 1px solid ${(props) => (props.$error ? '#ff0000' : '#ddd')};
    color: ${(props) => (props.$error ? '#ff0000' : '#ddd')};
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
export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.div`
display: flex;
flex-direction: column;
align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0d2636;
    }

    p{
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;

    }
`;
export const BackButton = styled.div`
    border:0;
    outline:0;
    background: transparent;
    
`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display:flex;
        padding: 15px, 10px;
        
        & + li{
            margin-top:12px;
        }

        img{
            width:36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #0d2636;
        }

        div{
            flex: 1;
            margin-left: 12px;
        }

        p{
            margin-top: 10px;
            font-size: 12px;
        }
        strong{
            font-size: 15px;

            a{
                color: #222;
                transition: 0.3s;

                &:hover{
                    color: #0071db;
                }
            }

            span{
                background: #222;
                color: #fff;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                padding: 4px;
                margin-left: 10px;
            }
        }

    }
`

export const PageAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        outline: 0;
        border: 0;
        background: #222;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;

        &:disabled{
            cursor: not-allowed;
            opacity:0.5;

        }
    }
`


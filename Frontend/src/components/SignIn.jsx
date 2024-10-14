import React from 'react'
import styled from 'styled-components'
import TextInput from './TextInput'
import Button from './Button'
import { UserSignIn } from '../api/index'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../Redux/reducer/snackbarSlice'
import { loginSuccess } from '../Redux/reducer/userSlice'
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({theme}) => theme.primary};
`
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.text_secondary + 90};
`
const TextButton = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: right;
  color: ${({theme}) => theme.text_secondary + 90};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
function Signin({setOpenAuth}) {
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false); ``
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const validateInputs = () => {
    if(email === "" || password === ""){
      alert("please fill all the fields");
      return false;
    }
    return true;
  }

  const handelSignIn = async () => {
    setButtonLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Login Successful",
              severity: "success",
            })
          );
          setButtonLoading(false);
          setButtonDisabled(false);
          setOpenAuth(false);
        })
        .catch((err) => {
          if (err.response) {
            setButtonLoading(false);
            setButtonDisabled(false);
            alert(err.response.data.message);
            dispatch(
              openSnackbar({
                message: err.response.data.message,
                severity: "error",
              })
            );
          } else {
            setButtonLoading(false);
            setButtonDisabled(false);
            dispatch(
              openSnackbar({
                message: err.message,
                severity: "error",
              })
            );
          }
        });
    }
    setButtonDisabled(false);
    setButtonLoading(false);
  };
  return (
    <Container>
      <div>
        <Title>
            Welcome to UrbanVibes
        </Title>
        <Span>
            Sign in to continue
        </Span>
      </div>
      <div style={{display:"flex", gap:"20px", flexDirection:"column"}}>
      <TextInput
            label = "Email Address"
            placeholder = "Enter your email address"
            value={email}
            handelChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label = "Password"
            placeholder = "Enter your password" 
            password
            value={password}
           handelChange={(e) => setPassword(e.target.value)}
          />

          <TextButton>Forgot Password?</TextButton>
          <Button onClick={handelSignIn} text="Login" isLoading={buttonLoading} isDisabled={buttonDisabled} />
      </div>
    </Container>
  )
}

export default Signin

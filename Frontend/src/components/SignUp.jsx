import React from 'react'
import styled from 'styled-components'
import TextInput from './TextInput'
import Button from './Button'
import { UserSignUp, uploadImage } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/reducer/userSlice";
import { openSnackbar } from "../Redux/reducer/snackbarSlice";
import { useState } from "react";
import { CloudUpload } from "@mui/icons-material";


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
  color: ${({ theme }) => theme.primary};
`
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`
const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
`;

const ImageUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  border: 2px dashed ${({ theme }) => theme.primary};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary + '10'};
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const UploadIcon = styled(CloudUpload)`
  font-size: 48px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
`;

const UploadText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
`;

const SelectedFileName = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

function SignUp({ setOpenAuth, setLogin }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setSelectedFileName(file ? file.name : '');
  };

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      let imageUrl = null;
      if (image) {
        try {
          imageUrl = await uploadImage(image);
        } catch (error) {
          console.error("Error uploading image:", error);
          dispatch(
            openSnackbar({
              message: "Error uploading image. Please try again.",
              severity: "error",
            })
          );
          setLoading(false);
          setButtonDisabled(false);
          return;
        }
      }

      const userData = {
        name,
        email,
        password,
        imageUrl
      };

      await UserSignUp(userData)
        .then((res) => {
          dispatch(loginSuccess(res.data.user));
          dispatch(
            openSnackbar({
              message: "Sign Up Successful",
              severity: "success",
            })
          );
          setLoading(false);
          setButtonDisabled(false);
          // setOpenAuth(false);
          setLogin(true); // Switch to login view
        })
        .catch((err) => {
          console.error("Sign up error:", err);
          dispatch(
            openSnackbar({
              message: err.response?.data?.message || "Sign up failed. Please try again.",
              severity: "error",
            })
          );
          setLoading(false);
          setButtonDisabled(false);
        });
    }
    setButtonDisabled(false);
    setLoading(false);
  };


  return (
    <Container>
      <div>
        <Title>
          Create New Account
        </Title>
        <Span>
          Sign up to continue
        </Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Name"
          type="text"
          placeholder="Enter your Name"
          value={name}
          handelChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <ImageUploadContainer>
          <ImageUploadLabel htmlFor="image-upload">
            <UploadIcon />
            {selectedFileName ? (
              <UploadText>{selectedFileName}</UploadText>
            ) : (
              <UploadText>Upload Profile Image (optional)</UploadText>
            )}
            <ImageUploadInput
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageUploadLabel>
        </ImageUploadContainer>
        <Button
          text="Create Account"
          onClick={handleSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  )
}

export default SignUp

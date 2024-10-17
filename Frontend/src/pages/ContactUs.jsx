import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../Redux/reducer/snackbarSlice'

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.bg};
`;

const Section = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:3000/api/send-email', formData);
      dispatch(openSnackbar({
        message: "Message sent successfully!",
        severity: "success",
      }));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      dispatch(openSnackbar({
        message: "Failed to send message. Please try again.",
        severity: "error",
      }));
    } finally {
      setLoading(false);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Container>
      <Section
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <Title>Contact Us</Title>
        <Subtitle>
          Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <TextInput label="First Name" name="firstName" placeholder="Enter your first name" value={formData.firstName} handelChange={handleChange} />
            <TextInput label="Last Name" name="lastName" placeholder="Enter your last name" value={formData.lastName} handelChange={handleChange} />
          </InputGroup>
          <TextInput label="Email" name="email" placeholder="Enter your email address" type="email" value={formData.email} handelChange={handleChange} />
          <TextInput label="Subject" name="subject" placeholder="What is this regarding?" value={formData.subject} handelChange={handleChange} />
          <TextInput label="Message" name="message" placeholder="Your message here..." textArea rows={5} value={formData.message} handelChange={handleChange} />
          <Button text="Send Message" isLoading={loading} />
        </Form>
      </Section>
    </Container>
  )
}

export default ContactUs

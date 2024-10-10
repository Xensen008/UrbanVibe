import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

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
        <Form>
          <InputGroup>
            <TextInput label="First Name" placeholder="Enter your first name" />
            <TextInput label="Last Name" placeholder="Enter your last name" />
          </InputGroup>
          <TextInput label="Email" placeholder="Enter your email address" type="email" />
          <TextInput label="Subject" placeholder="What is this regarding?" />
          <TextInput label="Message" placeholder="Your message here..." textArea rows={5} />
          <Button text="Send Message" />
        </Form>
      </Section>
    </Container>
  )
}

export default ContactUs
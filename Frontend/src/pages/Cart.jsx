import React from 'react'
import styled from 'styled-components'
import TextInput from '../components/TextInput'
import Button from '../components/Button'


// Styled components
const Container = styled.div`
  padding: 2px 44px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  overflow-x: hidden;
  @media (max-width: 768px) {
    padding: 2px 20px;
    height: auto;
    gap: 10px;
    min-height: 100%;
    overflow-x: hidden; // Prevent horizontal scrolling
  }
`;
const Section = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 10px 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  gap: 18px;
  @media (max-width: 750px) {
    margin-bottom: 100px;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 12px;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 750px) {
    flex: 1.2;
  }
`;

const Table = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: ${({ head }) => head && '22px'};
  @media (max-width: 750px) {
    gap: 25px;
    flex-wrap: wrap; 
    justify-content: space-between;
  }
`;

const TableItem = styled.div`
${({ flex }) => flex && 'flex: 1;'}
${({ bold }) =>
  bold &&
  `
  font-weight: 600;
  font-size: 17px;
`}
@media (max-width: 750px) {
  ${({ flex }) => flex && 'align-items: flex-start;'}
}
`;

const Counter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.text_secondary + '40'};
  border-radius: 8px;
  padding: 4px 12px;
`;

const Product = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const Img = styled.img`
  height: 80px;
  @media (max-width: 750px) {
    height: 60px;
    margin-bottom: 8px;
  }
`;

const Details = styled.div`
  @media (max-width: 750px) {
    text-align: start;
    padding-left: 10px;
    width: 100%;
  }
`;

const ProTitle = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 500;
`;

const ProDesc = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 750px) {
    white-space: normal;
    max-width: 100%;
  }
`;

const ProSize = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 750px) {
    flex: 0.8;
  }
`;

const Subtotal = styled.div`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const Delivery = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  gap: 6px;
  flex-direction: column;
`;


function Cart() {
  return (
    <Container>
      <Section>
        <Title>Your Shopping Cart</Title>
        <Wrapper>
          <Left>
            <Table>
              <TableItem bold flex >Product</TableItem>
              <TableItem bold>Price</TableItem>
              <TableItem bold>Quantity</TableItem>
              <TableItem bold>Total</TableItem>
            </Table>
            <Table>
              <TableItem flex >
                <Product>
                  <Img src="https://imgs.search.brave.com/TrXeyDd0RYEa0b-z2DYAilCj0KHMzFrFoQCYCZGDuT4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDU5/MjI4MDkxL3Bob3Rv/L2R1cmV4LWNvbmRv/bXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWR3LXhkeXVx/VWpuTG1PcWFFV2Zs/UnpIT2VJc1FoVkdN/UEtJc1RBaUZfSDQ9" />
                  <Details>
                  <ProTitle>Condom</ProTitle>
                  <ProSize>Size: M</ProSize>
                  <ProDesc>Lorem ipsum dolor sit amet</ProDesc>
                  </Details>
                </Product>
              </TableItem> 
              <TableItem >$30</TableItem>
              <TableItem >
                <Counter>
                  <div>-</div>2<div>+</div>
                </Counter>  
              </TableItem>
              <TableItem >$60</TableItem>
            </Table>
            <Table>
              <TableItem flex >
                <Product>
                  <Img src="https://imgs.search.brave.com/TrXeyDd0RYEa0b-z2DYAilCj0KHMzFrFoQCYCZGDuT4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDU5/MjI4MDkxL3Bob3Rv/L2R1cmV4LWNvbmRv/bXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWR3LXhkeXVx/VWpuTG1PcWFFV2Zs/UnpIT2VJc1FoVkdN/UEtJc1RBaUZfSDQ9" />
                  <Details>
                  <ProTitle>Condom</ProTitle>
                  <ProSize>Size: M</ProSize>
                  <ProDesc>Lorem ipsum dolor sit amet</ProDesc>
                  </Details>
                </Product>
              </TableItem> 
              <TableItem >$30</TableItem>
              <TableItem >
                <Counter>
                  <div>-</div>2<div>+</div>
                </Counter>  
              </TableItem>
              <TableItem >$60</TableItem>
            </Table>
            <Table>
              <TableItem flex >
                <Product>
                  <Img src="https://imgs.search.brave.com/TrXeyDd0RYEa0b-z2DYAilCj0KHMzFrFoQCYCZGDuT4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDU5/MjI4MDkxL3Bob3Rv/L2R1cmV4LWNvbmRv/bXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWR3LXhkeXVx/VWpuTG1PcWFFV2Zs/UnpIT2VJc1FoVkdN/UEtJc1RBaUZfSDQ9" />
                  <Details>
                  <ProTitle>Condom</ProTitle>
                  <ProSize>Size: M</ProSize>
                  <ProDesc>Lorem ipsum dolor sit amet</ProDesc>
                  </Details>
                </Product>
              </TableItem> 
              <TableItem >$30</TableItem>
              <TableItem >
                <Counter>
                  <div>-</div>2<div>+</div>
                </Counter>  
              </TableItem>
              <TableItem >$60</TableItem>
            </Table>
          </Left>
          <Right>
          <Subtotal>Subtotal : $50</Subtotal>
          <Delivery>Payment Details
            <div>
            <TextInput small placeholder='Card Number'/>
              <div style={{display: 'flex', gap: '10px'}}>
                <TextInput small placeholder='Exp date'/>
                <TextInput small placeholder='CVV'/>
              </div>
             
              <TextInput small placeholder='Card Holder Name'/>
            </div>
          </Delivery>
          <Delivery>Delivery Details
            <div>
              <div style={{display: 'flex', gap: '10px'}}>
                <TextInput small placeholder='Enter your First Name'/>
                <TextInput small placeholder='Enter your Last Name'/>
              </div>
              <TextInput small placeholder='Enter Email Address'/>
              <TextInput small placeholder='Phone number +91 xxxxx xxxxx'/>
              <TextInput small textArea row placeholder='Complete Address '/>
            </div>
          </Delivery>
          
            <Button small text="Place Order"/>
          </Right>
        </Wrapper>
      </Section>
    </Container>
  )
}

export default Cart
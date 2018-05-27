import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

class SamplePage extends Component {
  render(){
    return (
      <Container>
        <Header>
          <Body>
            <Title>Header</Title>
          </Body>
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>
      </Container>
    )
  }
}


export default SamplePage;

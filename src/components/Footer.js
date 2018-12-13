import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';
import logo from '../assets/images/oracle/csh-logo-1.png';


const Footer = () => (
  <Container fluid className="App-footer" textAlign="center">
    <Segment vertical>
      <Grid divided stackable>
        <Grid.Column width={8}>
          <Header as="h4" content="Look out for these upcomming features:" />
          <List link>
            <List.Item as="a">Role Based Access</List.Item>
            <List.Item as="a">Draft/Publish Assets</List.Item>
            <List.Item as="a">Single Sign On Integration</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={8}>
          <Header
            as="h4"
            content="Release version 1.0"
            className="footer-text"
          />
          <p>
            <a href="mailto:portal_feedback@cloudsolutionhubs.com?subject=Asset%20Portal%20Feedback&body=Please%20tell%20us%20about%20your%20experience%20using%20the%20portal:">
              Have some feedback? We'd love to hear it
            </a>
          </p>
        </Grid.Column>
      </Grid>
      <Divider section />
      <Image centered size="medium" src={logo} />
      <List horizontal divided link size="small">
        <List.Item as="a" href="#" className="footer-text">
          Site Map
        </List.Item>
        <List.Item as="a" href="#" className="footer-text">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#" className="footer-text">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#" className="footer-text">
          Privacy Policy
        </List.Item>
      </List>
    </Segment>
  </Container>
);

export default Footer;

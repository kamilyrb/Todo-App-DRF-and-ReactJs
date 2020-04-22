import React, { Component } from "react";
import {
  Container, Row, Col, Button,
} from "reactstrap";
import TaskList from "./task/TaskList";
import {userService} from '../_services/userServices'

class Main extends Component {
  

  render() {
    return (
      <Container className="mt-5">
         <Row>
         <Col lg={{ size: 2, order: 1}} className="mt-5 mb-3">
            <Button color="warning"  onClick={() => userService.logout()}>Logout</Button>
          </Col>

          <Col lg={{ size: 2, order: 2, offset: 7 }} className="mt-5 mb-3">
            <Button href="/new-task">Add Task</Button>
          </Col>
        </Row>
        <TaskList/>
      </Container>
    );
  }
}
export default Main;

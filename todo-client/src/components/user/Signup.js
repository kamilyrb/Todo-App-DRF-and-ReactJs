import React, { Component } from "react";
import {
  Container,
  Form,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/actions/user.actions";
import { connect } from "react-redux";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { first_name, last_name, email, username, password } = this.state;
    if (first_name && last_name && email && username && password) {
      this.props.register(this.state);
    }
  }

  render() {
    return (
      <div className="vertical-center">
        <Container>
          <Row>
            <Col />
            <Col lg="5">
              <Card>
                <CardBody>
                  <p className="text-center fs-24">Sign Up</p>
                  <hr />
                  <Container>
                    {/* <h2 className="headerTitle">Sign Up</h2> */}
                    <Form className="form" onSubmit={this.handleSubmit}>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input
                              type="text"
                              name="first_name"
                              id="first_name"
                              required
                              onChange={(event) =>
                                this.handleInputChange(event)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input
                              type="text"
                              name="last_name"
                              id="last_name"
                              required
                              onChange={(event) =>
                                this.handleInputChange(event)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          required
                          onChange={(event) => this.handleInputChange(event)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          required
                          onChange={(event) => this.handleInputChange(event)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          required
                          onChange={(event) => this.handleInputChange(event)}
                        />
                      </FormGroup>

                      <Button type="submit" className="btn-block">
                        Sign Up
                      </Button>
                      <Row>
                        <Label className="text-center btn-block mt-3">
                          Already registered?<Link to="/login"> Login</Link>
                        </Label>
                      </Row>
                    </Form>
                  </Container>
                </CardBody>
              </Card>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register,
};

export default connect(mapState, actionCreators)(Signup);

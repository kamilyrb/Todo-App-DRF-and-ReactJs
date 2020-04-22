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
import { connect } from "react-redux";
import { userActions } from "../../redux/actions/user.actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: "",
      },

      password: {
        value: "",
      },
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
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
        this.props.login(username, password);
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
                <p className="text-center fs-24">Login</p>
                  <hr />
                  <Container>
                    <Form className="form" onSubmit={(event) => this.handleSubmit(event)}>
                      <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          className="opacity-input"
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
                        Login
                      </Button>
                      <Label className="text-center btn-block mt-3">
                        Not registered?<Link to="/signup"> Sign Up</Link>
                      </Label>
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
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

export default connect(mapState, actionCreators)(Login);

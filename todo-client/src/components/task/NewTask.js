import React, { Component } from "react";
import {
  FormGroup,
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  CardBody,
  Card,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { taskActions } from "../../redux/actions/task.actions";

class NewTask extends Component {
  state = {
    tags: [{ name: "", color: "primary" }],
  };

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue,
    });
  }

  handleTagInputChange(event, index) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    let tags = this.state.tags;
    tags[index][inputName] = inputValue;
    this.setState({
      tags: tags,
    });
  }

  addNewTag = (event, index) => {
    let tags = this.state.tags;
    tags.push({ name: "", color: "primary" });
    this.setState({
      tags,
    });
  };
  removeTag = (event, index) => {
    let tags = this.state.tags;
    tags.splice(index, 1);
    this.setState({
      tags,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTask(this.state);
  };

  render() {
    const tags = this.state.tags;
    return (
      <div className="vertical-center">
        <Container>
          <Row>
          <Col lg={{ size: 2, order: 1 }} className="mt-5 mb-3">
            <Button href="/">Back To List</Button>
          </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Container>
                    <Form
                      onSubmit={(event) => {
                        this.handleSubmit(event);
                      }}
                    >
                      <FormGroup>
                        <Label for="title">Task Title</Label>
                        <Input
                          type="text"
                          maxLength="64"
                          name="title"
                          id="title"
                          required
                          onChange={(event) => this.handleInputChange(event)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="description">Task Description</Label>
                        <Input
                          type="textarea"
                          name="description"
                          required
                          rows={5}
                          onChange={(event) => this.handleInputChange(event)}
                        />
                      </FormGroup>
                      {tags.map((tag, index) => (
                        <Row key={index}>
                          <Col lg="5">
                            <FormGroup>
                              <Label for="name">Tag Name</Label>
                              <Input
                                type="text"
                                maxLength="64"
                                name="name"
                                id="name"
                                value={tag.name ? tag.name : ""}
                                required
                                onChange={(event) => {
                                  this.handleTagInputChange(event, index);
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="5">
                            <FormGroup>
                              <Label for="color">Tag Color</Label>
                              <Input
                                type="select"
                                maxLength="15"
                                name="color"
                                id="color"
                                value={tag.color ? tag.color : "primary"}
                                required
                                onChange={(event) => {
                                  this.handleTagInputChange(event, index);
                                }}
                              >
                                <option value="primary" >Blue</option>
                                <option value="info">Light Blue</option>
                                <option value="warning">Yellow</option>
                                <option value="success">Green</option>
                                <option value="secondary">Gray</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col lg="2" className="pt-1">
                            {index + 1 === tags.length ? (
                              <Button
                                color="info"
                                className="mt-4"
                                onClick={(event) =>
                                  this.addNewTag(event, index)
                                }
                              >
                                Add New
                              </Button>
                            ) : (
                              <Button
                                color="danger"
                                className="mt-4"
                                onClick={(event) =>
                                  this.removeTag(event, index)
                                }
                              >
                                Remove
                              </Button>
                            )}
                          </Col>
                        </Row>
                      ))}
                      <hr />
                      <Button color="primary" className="float-right">
                        Save
                      </Button>
                    </Form>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapState(state) {
  const tasks = state.taskReducer;
  return { tasks };
}

const actionCreators = {
  addTask: taskActions.addTask,
};

export default connect(mapState, actionCreators)(NewTask);

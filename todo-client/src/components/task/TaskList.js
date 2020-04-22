import React, { Component } from "react";
import { taskActions } from "../../redux/actions/task.actions";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import TaskItem from "./TaskItem";
class TaskList extends Component {
  componentDidMount() {
    this.props.getTasks();
  }

  state = {
    tasks: [],
  };
  render() {
    const { tasks } = this.props;
    let taskContent = "";
    console.log("tasks",tasks)
    if (tasks.items) {
      if (tasks.items.length > 0) {
        console.log("second");
        taskContent = tasks.items.map((task, index) => (
          <TaskItem task={task} key={task.id} />
        ));
      } else if (tasks.items.length === 0) {
        console.log("third");
        taskContent = <p>You haven't any task yet, you can add new tasks with add button.</p>;
      }
    }

    return (
      <Row>
        <Col lg="10">
          <Card>
            <CardBody>
              <Container>
                {tasks.loading && <em>Loading tasks...</em>}
                {tasks.error && (
                  <span className="text-danger">ERROR: {tasks.error}</span>
                )}
                {taskContent}
              </Container>
            </CardBody>
          </Card>
        </Col>
        <Col />
      </Row>
    );
  }
}

function mapState(state) {
  const tasks = state.taskReducer;
  return { tasks };
}

const actionCreators = {
  getTasks: taskActions.getTasks,
};

export default connect(mapState, actionCreators)(TaskList);

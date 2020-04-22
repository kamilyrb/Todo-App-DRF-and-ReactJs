import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse,
  Badge,
} from "reactstrap";
import { taskActions } from "../../redux/actions/task.actions";
import { connect } from "react-redux";

class TaskItem extends Component {
  render() {
    const { task } = this.props;
    let tagsElement = "";
    if (task.tags.length !== 0) {
      tagsElement = (
        <div>
          <p>
            <b>Tags:</b>
          </p>
         
            {task.tags.map((tag) => (
              <p key={tag.id}>
                <Badge color="danger" style={{cursor:"pointer"}} onClick={()=>this.props.deleteTag(tag.id,task.id) }>X</Badge> <Badge color={tag.color}>{tag.name}</Badge>
              </p>
            ))}
       
          <hr />
        </div>
      );
    }
    return (
      <div className="mt-4">
        <Button
          color={`${task.is_completed ? "success" : "info"}`}
          className="text-uppercase text-left"
          id={`collapse-${task.id}`}
          style={{ marginBottom: "1rem" }}
          block
        >
          {task.title}
        </Button>
        <UncontrolledCollapse toggler={`collapse-${task.id}`}>
          <Card>
            <CardBody>
              <p>
                <b>Description: </b>
                {task.description}
              </p>
              <hr />
              <p>
                <b>Created Date: </b>
                {task.created_at}
              </p>
              <hr />
              {tagsElement}
              <p>
                <b>Actions: </b>
                <Button
                  className="btn-sm mr-3"
                  color="danger"
                  onClick={() => this.props.deleteTask(task.id)}
                >
                  Delete
                </Button>
                {task.is_completed ? (
                  <Button
                    className="btn-sm"
                    color="warning"
                    onClick={() => this.props.changeTaskStatus(task.id, false)}
                  >
                    Revert Done
                  </Button>
                ) : (
                  <Button
                    className="btn-sm"
                    color="primary"
                    onClick={() => this.props.changeTaskStatus(task.id, true)}
                  >
                    Mark Done
                  </Button>
                )}
              </p>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </div>
    );
  }
}

function mapState(state) {
  const tasks = state.taskReducer;
  return { tasks };
}

const actionCreators = {
  deleteTask: taskActions.deleteTask,
  changeTaskStatus: taskActions.changeTaskStatus,
  deleteTag: taskActions.deleteTag
};

export default connect(mapState, actionCreators)(TaskItem);

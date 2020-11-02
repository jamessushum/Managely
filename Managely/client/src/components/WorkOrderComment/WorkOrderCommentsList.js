import React from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import { FaUserAlt, FaClock } from "react-icons/fa";

const WorkOrderCommentsList = ({ workOrderComments }) => {

  return (
    <div>
      {workOrderComments.length === 0 ? <h4>No comments currently...</h4> : workOrderComments.map(comment => (
        <Card key={comment.id} className="workOrderComment-card">
          <CardHeader><FaUserAlt /> &nbsp;{comment.userProfile.fullName} &nbsp;<FaClock /> &nbsp;{comment.createDateTime}</CardHeader>
          <CardBody>
            <CardText>{comment.content}</CardText>
            <div>
              {comment.imageLocation === null || comment.imageLocation === "" ? null : <img src={comment.imageLocation} alt="comment-img" className="workOrderComment-img" />}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default WorkOrderCommentsList;
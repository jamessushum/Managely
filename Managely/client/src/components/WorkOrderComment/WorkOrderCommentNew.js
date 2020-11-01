import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button, FormGroup, Label, Col } from 'reactstrap';

const WorkOrderCommentNew = () => {

  return (
    <div className="workOrderComment-new-container">
      <div>
        <InputGroup>
          <Input placeholder="enter a comment" />
          <InputGroupAddon addonType="append">
            <Button>Send</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="workOrderComment-new-attachments">
        <FormGroup row>
          <Label for="exampleFile" sm={2}>Attachments:</Label>
          <Col sm={10}>
            <Input type="file" name="file" id="exampleFile" />
          </Col>
        </FormGroup>
      </div>
    </div>
  )
}

export default WorkOrderCommentNew;
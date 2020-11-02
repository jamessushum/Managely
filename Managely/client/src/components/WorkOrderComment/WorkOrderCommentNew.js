import React, { useContext, useState } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import { InputGroup, InputGroupAddon, Input, Button, FormGroup, Label, Col, Spinner } from 'reactstrap';

const WorkOrderCommentNew = ({ workOrderId, getComments }) => {
  const { addWorkOrderComment } = useContext(WorkOrderContext);

  const loggedInUser = JSON.parse(sessionStorage.userProfile);

  const [content, setContent] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleImageField = async (e) => {
    const files = e.target.files
    setIsImageLoading(true)
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'flyingboar')
    const res = await fetch('https://api.cloudinary.com/v1_1/diswqnkzl/image/upload', {
      method: "POST",
      body: data
    })
    const file = await res.json()
    setImageLocation(file.secure_url)
    setIsImageLoading(false)
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newWorkOrderComment = {
      content: content,
      imageLocation: imageLocation,
      createDateTime: new Date(),
      userProfileId: loggedInUser.id,
      workOrderId: parseInt(workOrderId)
    }

    if (content === "") {
      alert("Can't send an empty comment");
    } else {
      addWorkOrderComment(newWorkOrderComment).then(() => {
        setContent("");
        setImageLocation("");
        document.getElementById('content').value = "";
        document.getElementById('imageLocation').value = "";
        getComments();
      })
    }
  }

  return (
    <div className="workOrderComment-new-container">
      <div>
        <InputGroup>
          <Input id="content" placeholder="enter a comment" onChange={(e) => setContent(e.target.value)} />
          <InputGroupAddon addonType="append">
            <Button onClick={handleCommentSubmit}>Send</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="workOrderComment-new-attachments">
        <FormGroup row>
          <Label for="imageLocation" sm={2}>Attachments:</Label>
          <Col sm={10}>
            <Input type="file" id="imageLocation" onChange={handleImageField} />
            {isImageLoading ? <Spinner size="sm" color="warning" /> : null}
          </Col>
        </FormGroup>
      </div>
    </div>
  )
}

export default WorkOrderCommentNew;
import React, { useState } from "react";
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import SingleComment from './SingleComment.js';
import Moment from 'react-moment';
import 'semantic-ui-css/semantic.min.css'
import styles from '.././popup.module.css' 

function CommentsBlock(props) {
  
  return (
    <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>

    <div>
		{props.comments.map((c) => {
			return <SingleComment comment={c} />;
				})}
	</div>

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
  );
}

export default CommentsBlock;

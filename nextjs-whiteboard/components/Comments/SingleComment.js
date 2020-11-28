import React, { useState } from "react";
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import 'semantic-ui-css/semantic.min.css'
import styles from '.././popup.module.css' 

function SingleComment(props) {
  

  return (
    <Comment>
      <Comment.Content>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/veronika.jpg' />
        <Comment.Author as='a'>{props.comment.authorName}</Comment.Author>
        <Comment.Metadata>
          <Moment fromNow>{props.comment.createdAt}</Moment>
        </Comment.Metadata>
          <Comment.Text>{props.comment.text}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}

export default SingleComment;

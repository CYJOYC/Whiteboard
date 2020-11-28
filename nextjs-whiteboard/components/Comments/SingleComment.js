import React, { useState } from "react";
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import 'semantic-ui-css/semantic.min.css'
import styles from '.././popup.module.css' 

function SingleComment(props) {
  

  return (
    <Comment>
      <Comment.Content>
        <Comment.Author as='a'>{props.comment.authorName}</Comment.Author>
        <Comment.Metadata>
          <Moment fromNow>{props.comment.createdAt}</Moment>
        </Comment.Metadata>
          <Comment.Text>{props.comment.text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
}

export default SingleComment;

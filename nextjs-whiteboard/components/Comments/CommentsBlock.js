import React, { useState } from "react";
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import SingleComment from './SingleComment.js';
import Moment from 'react-moment';
import 'semantic-ui-css/semantic.min.css'
import styles from '.././popup.module.css' 

function CommentsBlock(props) {
    const[comments, setComments] = useState(props.comments);

    function commentSubmit() {
		// TODO: use real users
        const user = props.user;

		var text = document.getElementById('comment-box').value;
		var timenow = Date.now();
		var comment_element = {
			authorName: user,
			createdAt: timenow,
			text: text
        };
        
		if (text.length > 0) {
			console.log('new comment:', comment_element);
            // TODO: update comment info in database
            setComments(comments.concat(comment_element));
		}
	};
  
  return (
    <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>

    <div>
		{comments.map((c) => { // TODO: read from props.comments instead
			return <SingleComment comment={c} />;
				})}
	</div>

    <Form reply>
      <Form.TextArea id='comment-box'/>
      <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={commentSubmit}/>
    </Form>
  </Comment.Group>
  );
}

export default CommentsBlock;

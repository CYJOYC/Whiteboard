import React, { useState } from "react";
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import 'semantic-ui-css/semantic.min.css';
import styles from '.././popup.module.css';
import { auth, db } from '../../config/firebase'; 
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";


function CommentsBlock(props) {
    const[comments, setComments] = useState(props.comments);

    console.log('comments', comments);
    function commentsSubmit() {
      const user = props.user;
      console.log("gallery:", props.gallery, " picID:", props.picId)
      var commentsRef = db.ref("galleries/" + props.gallery + "/pictures/" + props.picId + "/comments");

      var text = document.getElementById(props.picId).value;
      console.log('new text: ', text);
      var timenow = Date.now();
      
		  var comment_element = {
			  authorName: user,
			  createdAt: timenow,
			  text: text
        };
        
		if (text.length > 0) {
			console.log('new comment:', comment_element);
      // TODO: update comment info in database
      //setComments(comments.concat(comment_element));
      //console.log('updated comments:', comments.concat(comment_element));
      var newPushKey = commentsRef.push(comment_element).key; 
      console.log(newPushKey);
      var commentsCopy = comments? {...comments} : {};
      commentsCopy[newPushKey] = comment_element;
      console.log(commentsCopy);
      setComments(commentsCopy);
		}
  };
  
  if(comments){
  return (
    <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>

    <div>
		{Object.values(comments).map((c) => { 
			return(<Comment>
        <Comment.Content>
        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/veronika.jpg' />
          <Comment.Author as='a'>{c.authorName}</Comment.Author>
          <Comment.Metadata>
            <Moment fromNow>{c.createdAt}</Moment>
          </Comment.Metadata>
            <Comment.Text>{c.text}</Comment.Text>
        </Comment.Content>
      </Comment>);
				})}
	</div>

    <Form reply>
      <Form.TextArea id={props.picId}/>
      <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={commentsSubmit}/>
    </Form>
  </Comment.Group>
  );
      } else {
        
        return(
        <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>
        <Form reply>
          <Form.TextArea id={props.picId}/>
          <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={commentsSubmit}/>
        </Form>
      </Comment.Group>
      );}
}

export default CommentsBlock;

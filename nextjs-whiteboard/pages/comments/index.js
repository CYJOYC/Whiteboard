import React from 'react';
import ReactDOM from 'react-dom';
import CommentsBlock from '../../components/Comments/CommentsBlock.js';

import SingleComment from '../../components/Comments/SingleComment.js';
let testComments = [
    {
        authorName: 'Ryan',
        createdAt: '2020-11-28T12:59-0500',
        text: 'How artistic!'
    },
    {
        authorName: 'Joy',
        createdAt:'2020-11-27T06:28-0500',
        text:'Great job!'
    }
]
export default function Project() {
  return  <CommentsBlock comments={testComments} user={'Test User'}/>
}


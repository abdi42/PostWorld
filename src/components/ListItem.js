import React from 'react';
import {
  Text
} from 'react-native';

export default function ListItem(props) {
  const {post} = props;
  
  return (
    <Text>{post.content}</Text>
  )
}

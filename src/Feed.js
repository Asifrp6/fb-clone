import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "./App";
import "./Feed.css";
import StoryReal from "./StoryReal";
import MassegeSender from "./MassegeSender";
import Post from "./Post"
import db from "./firebase";
function Feed() {
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
    return (
        <div className="feed">
      <StoryReal />
      <MassegeSender />
      {posts.map((post) => (
        <Post
          key={post.data.id}
          profilePic={post.data.profilePic}
          image={post.data.image}
          timestamp={post.data.timestamp}
          username={post.data.username}
          message={post.data.message}
        />
      ))}
        </div>
    );
}

export default Feed

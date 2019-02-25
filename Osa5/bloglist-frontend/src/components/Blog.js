import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
const baseUrl = "/api/blogs";

const Blog = ({ blog, refresher, user, setNotification }) => {
  const [showAll, setShowAll] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const handleLike = async event => {
    event.preventDefault();
    const likedBlog = blog;
    likedBlog.likes = blog.likes + 1;
    await axios.put(baseUrl + "/" + likedBlog.id, likedBlog);
    refresher();
  };

  const handleRemove = async event => {
    event.preventDefault();
    if (blog.user.name === user.name) {
      await axios.delete(baseUrl + "/" + blog.id, blog);
      setNotification({
        message: "Blog removed successfully",
        type: "ok"
      });
      setTimeout(() => {
        setNotification({ message: null });
      }, 5000);
      refresher();
    }
  };

  const RemoveButton = () => {
    if (blog.user.name === user.name) {
      return (
        <div>
          <button onClick={handleRemove}>remove</button>
        </div>
      );
    }
    return <div />;
  };

  if (showAll) {
    return (
      <div style={blogStyle}>
        <div>
          <div onClick={() => setShowAll(!showAll)}>
            <b>
              {blog.title} {blog.author}
            </b>
          </div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          {blog.likes} likes <button onClick={handleLike}>like</button>
          <br />
          added by {blog.user.name} <br />
          <RemoveButton />
        </div>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setShowAll(!showAll)}>
        {blog.title} {blog.author}
      </div>
    </div>
  );
};

Blog.propTypes = {
  setNotification: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  refresher: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
};

export default Blog;

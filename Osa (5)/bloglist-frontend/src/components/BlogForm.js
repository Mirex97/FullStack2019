import React, { useState } from "react";
import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;
let refresh = false;

const getRefresh = () => (refresh);

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const submit = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const form = props => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogSumbit = async event => {
    event.preventDefault();
    try {
      await submit({ title, author, url });
      
      props.refresher();
      props.setNotification({ message: `a new blog ${title} by ${author} added` , type: "ok" });
      setTimeout(() => {
        props.setNotification({ message: null });
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
        props.setNotification({ message: `Found empty field(s) while creating blog` , type: "error" });
        setTimeout(() => {
          props.setNotification({ message: null });
        }, 5000);
    }
  };

  return (
    <form onSubmit={handleBlogSumbit}>
      <div>
        title:{" "}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{" "}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{" "}
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default { form, setToken, getRefresh};

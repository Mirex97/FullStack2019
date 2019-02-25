import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useField } from "../hooks";

const baseUrl = "/api/blogs";

let token = null;

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
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleBlogSumbit = async event => {
    event.preventDefault();
    try {
      await submit({
        title: title.value,
        author: author.value,
        url: url.value
      });

      props.refresher();
      props.setNotification({
        message: `a new blog ${title.value} by ${author.value} added`,
        type: "ok"
      });
      setTimeout(() => {
        props.setNotification({ message: null });
      }, 5000);
      title.reset();
      author.reset();
      url.reset();
    } catch (exception) {
      props.setNotification({
        message: "Found empty field(s) while creating blog",
        type: "error"
      });
      setTimeout(() => {
        props.setNotification({ message: null });
      }, 5000);
    }
  };

  if (!props.visible) {
    return <div />;
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogSumbit}>
        <div>
          title:{" "}
          <input
            type={title.type}
            value={title.value}
            name="Title"
            onChange={title.onChange}
          />
        </div>
        <div>
          author:{" "}
          <input
            type={author.type}
            value={author.value}
            name="Author"
            onChange={author.onChange}
          />
        </div>
        <div>
          url:{" "}
          <input
            type={url.type}
            value={url.value}
            name="Url"
            onChange={url.onChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

form.propTypes = {
  setNotification: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  refresher: PropTypes.func.isRequired
};

export default { form, setToken };

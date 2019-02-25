import React, { useState, useEffect } from "react";
import { useField } from "./hooks";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import PropTypes from "prop-types";

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }

  const style = {
    color: notification.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return <div style={style}>{notification.message}</div>;
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const username = useField("text");
  const password = useField("password");
  const [hideButton, setHideButton] = useState("create new");
  const [notification, setNotification] = useState({
    message: null
  });
  const [newBlogVisible, setNewBlogVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort(function(a, b) {
          return b.likes - a.likes;
        })
      )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      BlogForm.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      BlogForm.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
      setNotification({ message: "Logged in!", type: "good" });
      setTimeout(() => {
        setNotification({ message: null });
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setNotification({ message: "wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification({ message: null });
      }, 2500);
    }
  };
  const handleLogout = event => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedBlogUser");
  };

  const refresher = () => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort(function(a, b) {
          return b.likes - a.likes;
        })
      )
    );
  };

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <div>
        <button type="submit">logout</button>
      </div>
    </form>
  );

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
      </div>
      <div>
        salasana
        <input
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {<Notification notification={notification} />}
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {<Notification notification={notification} />}
      {user.name} logged in
      <br />
      <br />
      {logoutForm()}
      {
        <BlogForm.form
          visible={newBlogVisible}
          refresher={refresher}
          setNotification={setNotification}
        />
      }
      <button
        onClick={() => {
          setNewBlogVisible(!newBlogVisible);
          if (!newBlogVisible) {
            setHideButton("cancel");
          } else {
            setHideButton("create new");
          }
        }}
      >
        {hideButton}
      </button>
      {blogs.map(blog => (
        <Blog
          setNotification={setNotification}
          user={user}
          refresher={refresher}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;

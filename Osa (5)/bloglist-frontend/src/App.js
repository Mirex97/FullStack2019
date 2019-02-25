import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

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

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({
    message: null
  });

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
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
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      console.log("tokeeen???" + user.token);
      BlogForm.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({ message: "Logged in!", type: "good" });
      setTimeout(() => {
        setNotification({ message: null });
      }, 5000);
    } catch (exception) {
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

  const refresher = event => {
    blogService.getAll().then(blogs => setBlogs(blogs));
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
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
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
      <h2>create new</h2>
      {<BlogForm.form refresher={refresher} setNotification={setNotification} />}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

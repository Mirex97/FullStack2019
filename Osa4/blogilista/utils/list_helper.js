const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  let x = 0;
  for (y = 0; y < blogs.length; y++) {
    x += blogs[y].likes;
  }
  return x;
};

const favoriteBlog = blogs => {
  let location = 0;
  let mostLikes = 0;
  for (y = 0; y < blogs.length; y++) {
    if (blogs[y].likes >= mostLikes) {
      mostLikes = blogs[y].likes;
      location = y;
    }
  }

  return blogs[location];
};

const mostBlogs = blogs => {
  let foundBlogs = [];
  for (x = 0; x < blogs.length; x++) {
    found = false;
    let location = 0;
    for (y = 0; y < foundBlogs.length; y++) {
      if (foundBlogs[y].author == blogs[x].author) {
        location = y;
        found = true;
        break;
      }
    }
    if (found) {
      foundBlogs[location].blogs = foundBlogs[location].blogs + 1;
    } else {
      foundBlogs.push({ author: `${blogs[x].author}`, blogs: 1 });
    }
  }

  let most = 0;
  let location = 0;
  for (x = 0; x < foundBlogs.length; x++) {
    if (foundBlogs[x].blogs > most) {
      location = x;
      most = foundBlogs[x].blogs;
    }
  }
  return foundBlogs[location];
};

const mostLikes = blogs => {
  let foundBlogs = [];
  for (x = 0; x < blogs.length; x++) {
    found = false;
    let location = 0;
    for (y = 0; y < foundBlogs.length; y++) {
      if (foundBlogs[y].author == blogs[x].author) {
        location = y;
        found = true;
        break;
      }
    }
    if (found) {
      foundBlogs[location].likes = foundBlogs[location].likes + blogs[x].likes;
    } else {
      foundBlogs.push({ author: `${blogs[x].author}`, likes: blogs[x].likes });
    }
  }

  let most = 0;
  let location = 0;
  for (x = 0; x < foundBlogs.length; x++) {
    if (foundBlogs[x].likes > most) {
      location = x;
      most = foundBlogs[x].likes;
    }
  }
  return foundBlogs[location];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

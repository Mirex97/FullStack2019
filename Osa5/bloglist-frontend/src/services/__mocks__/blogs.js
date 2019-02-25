const blogs = [
  {
    title: "okei",
    author: "okei",
    url: "okei",
    likes: 8,
    user: {
      username: "test",
      name: "test",
      id: "5c6af962b8a1121b840de0b0"
    },
    id: "5c73c74a9dd9b41c487feb1a"
  },
  {
    title: "okei",
    author: "okei",
    url: "okei",
    likes: 8,
    user: {
      username: "test",
      name: "test",
      id: "5c6af962b8a1121b840de0b0"
    },
    id: "5c73c76e9dd9b41c487feb1b"
  },
  {
    title: "test",
    author: "test",
    url: "test",
    likes: 0,
    user: {
      username: "test",
      name: "test",
      id: "5c6af962b8a1121b840de0b0"
    },
    id: "5c73cb239dd9b41c487feb1f"
  },
  {
    title: "test",
    author: "test",
    url: "test",
    likes: 0,
    user: {
      username: "test",
      name: "test",
      id: "5c6af962b8a1121b840de0b0"
    },
    id: "5c73ccba9dd9b41c487feb22"
  },
  {
    title: "wat",
    author: "wat",
    url: "wat",
    likes: 0,
    user: {
      username: "test",
      name: "test",
      id: "5c6af962b8a1121b840de0b0"
    },
    id: "5c73d4129dd9b41c487feb2a"
  },
  {
    title: "test",
    author: "test",
    url: "test",
    likes: 0,
    user: {
      username: "test",
      name: "test",
      id: "5c6af962b8a1121b840de0b0"
    },
    id: "5c73da729dd9b41c487feb37"
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll };

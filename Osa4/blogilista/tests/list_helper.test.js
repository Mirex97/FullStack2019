const listHelper = require("../utils/list_helper");
const listWithThreeBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5b422aa71b54a676234d17f8",
    title: "Help Statement Considered Helpful",
    author: "Kukkis",
    url: "",
    likes: 1,
    __v: 0
  },
  {
    _id: "5c422aa71b54a676234d17f8",
    title: "Echo Statement Considered Echoing",
    author: "Kukkis",
    url: "",
    likes: 0,
    __v: 0
  }
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only three blogs equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithThreeBlogs);
    expect(result).toBe(6);
  });
});

describe("favorite blog", () => {
  test("when list has three blogs most liked blog will be", () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs);
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    });
  });
});

describe("most blogs", () => {
  test("when list has three blogs, author with most blogs will be", () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs);
    expect(result).toEqual({
      author: "Kukkis",
      blogs: 2
    });
  });
});

describe("most likes", () => {
  test("when list has three blogs, author with most likes will be", () => {
    const result = listHelper.mostLikes(listWithThreeBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5
    });
  })
})

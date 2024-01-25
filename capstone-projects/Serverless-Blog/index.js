import express from 'express';
import bodyParser from 'body-parser';
import { BlogPost, BlogDatabase } from './Middleware/posts.js';
const users = [];
const app = express();
const port = 3000;

const userID = 110;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const allBlogPosts = BlogDatabase.getAllBlogPosts();
  if (req.header('Accept').includes('application/json')) {
    res.send(allBlogPosts);
  } else {
    res.render('index.ejs', { pageTitle: 'Home of our blog', blogs: allBlogPosts });
  }
});

app.get('/new-post', (req, res) => {
  res.render('add-edit-post.ejs', { pageTitle: 'New blog post' });
});

app.get('/edit-post/:id', (req, res) => {
  const postData = BlogDatabase.getBlogPostById(Number(req.params.id));
  res.render('add-edit-post.ejs', { pageTitle: 'Edit blog post', postData: postData });
});

app.post('/add-edit-post', (req, res) => {
  const action = req.body.action;
  if (action == 'new') {
    const theNewPost = BlogDatabase.createNewPost(userID, req.body);
  } else if (action == 'edit') {
    const theEditedPost = BlogDatabase.editBlogPost(userID, req.body);
  }
  res.redirect('/');
});

app.delete('/post/delete/', (req, res) => {
  const postId = Number(req.body.postId);
  const userId = Number(req.body.userId);
  if (BlogDatabase.doesPostExist(postId)) {
    if (BlogDatabase.doesPostBelongToAuthor(postId, userId)) {
      BlogDatabase.deleteBlogPostById(postId);
      res.status(200).send(`The post with id ${postId} has been deleted`);
    } else {
      res.send("User isn't authorized to delete another users post");
    }
  } else {
    res.status(200).send('That post does not exist');
  }
});

app.get('/blog/:slug', (req, res) => {
  const slug = req.params.slug;
  const blogPost = BlogDatabase.getBlogPostBySlug(slug);

  if (blogPost) {
    res.render('view-post.ejs', { pageTitle: blogPost.title, post: blogPost });
  } else {
    res.status(404).json({ error: 'Blog post not found' });
  }
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
  res.status(404).send(`You've reached which space`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

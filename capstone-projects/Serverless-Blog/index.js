// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import { BlogPost, BlogDatabase } from './Middleware/posts.js';

// Array to store user data (currently not used)
const users = [];
// Create an instance of the Express application
const app = express();
// Set the port for the server
const port = 3000;

// A constant user ID used for creating blog posts (dummy value)
const userID = 110;

// Serve static files from the 'public' directory
app.use(express.static('public'));
// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the home page
app.get('/', (req, res) => {
  // Get all blog posts from the database
  const allBlogPosts = BlogDatabase.getAllBlogPosts();

  // Check the 'Accept' header to determine the response type
  if (req.header('Accept').includes('application/json')) {
    // If JSON is requested, send the blog posts as JSON
    res.send(allBlogPosts);
  } else {
    // If HTML is requested, render the home page with the blog posts
    res.render('index.ejs', { pageTitle: 'Home of our blog', blogs: allBlogPosts });
  }
});

// Route for creating a new blog post
app.get('/new-post', (req, res) => {
  // Render the add-edit-post page for creating a new post
  res.render('add-edit-post.ejs', { pageTitle: 'New blog post' });
});

// Route for editing an existing blog post
app.get('/edit-post/:id', (req, res) => {
  // Get the data of the blog post to be edited
  const postData = BlogDatabase.getBlogPostById(Number(req.params.id));
  // Render the add-edit-post page for editing the post
  res.render('add-edit-post.ejs', { pageTitle: 'Edit blog post', postData: postData });
});

// Route for handling the creation or editing of a blog post
app.post('/add-edit-post', (req, res) => {
  // Get the action type from the request body
  const action = req.body.action;

  // Check the action type and perform the corresponding action
  if (action == 'new') {
    // Create a new blog post
    const theNewPost = BlogDatabase.createNewPost(userID, req.body);
  } else if (action == 'edit') {
    // Edit an existing blog post
    const theEditedPost = BlogDatabase.editBlogPost(userID, req.body);
  }

  // Redirect to the home page after the action is complete
  res.redirect('/');
});

// Route for deleting a blog post
app.delete('/post/delete/', (req, res) => {
  // Get post ID and user ID from the request body
  const postId = Number(req.body.postId);
  const userId = Number(req.body.userId);

  // Check if the post exists and if the user is authorized to delete it
  if (BlogDatabase.doesPostExist(postId)) {
    if (BlogDatabase.doesPostBelongToAuthor(postId, userId)) {
      // Delete the blog post and send a success message
      BlogDatabase.deleteBlogPostById(postId);
      res.status(200).send(`The post with id ${postId} has been deleted`);
    } else {
      // Send a message indicating that the user is not authorized
      res.send("User isn't authorized to delete another user's post");
    }
  } else {
    // Send a message indicating that the post does not exist
    res.status(200).send('That post does not exist');
  }
});

// Route for viewing a blog post by slug
app.get('/blog/:slug', (req, res) => {
  // Get the slug from the URL parameters
  const slug = req.params.slug;
  // Get the blog post data by slug from the database
  const blogPost = BlogDatabase.getBlogPostBySlug(slug);

  // Check if the blog post exists
  if (blogPost) {
    // Render the view-post page with the blog post details
    res.render('view-post.ejs', { pageTitle: blogPost.title, post: blogPost });
  } else {
    // If the blog post is not found, send a 404 JSON response
    res.status(404).json({ error: 'Blog post not found' });
  }
});

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
  res.status(404).send(`You've reached which space`);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

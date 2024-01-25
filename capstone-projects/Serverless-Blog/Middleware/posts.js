// blogPostModule.js

// Simulating a database object
const BlogDatabase = {
  blogPosts: [],

  // Method to save a new BlogPost to the database
  saveBlogPost(blogPost) {
    this.blogPosts.push(blogPost);
  },

  // Method to fetch all BlogPosts from the database
  getAllBlogPosts() {
    return this.blogPosts;
  },

  // Method to retrieve a BlogPost by slug
  getBlogPostBySlug(slug) {
    return this.blogPosts.find((post) => post.slug === slug);
  },

  // Method to retrieve a BlogPost by ID
  getBlogPostById(blogPostId) {
    return this.blogPosts.find((post) => post.id === blogPostId);
  },

  // Method to delete a BlogPost by ID
  deleteBlogPostById(blogPostId) {
    const index = this.blogPosts.findIndex((post) => post.id === blogPostId);
    if (index !== -1) {
      this.blogPosts.splice(index, 1);
      return true; // Indicates successful deletion
    }
    return false; // Indicates failure (post not found)
  },

  // Method to check if a post belongs to a specific author
  doesPostBelongToAuthor(postId, authorId) {
    const post = this.getBlogPostById(postId);
    return post && post.authorId === authorId;
  },

  // Method to check if a post with the given ID exists
  doesPostExist(postId) {
    return this.blogPosts.some((post) => post.id === postId);
  },

  // Method to edit a BlogPost by ID
  editBlogPost(userID, data) {
    const postId = Number(data.postId);
    const updatedProperties = {};
    const post = this.getBlogPostById(postId);

    if (post.authorId === userID) {
      post.title == data.title ? data.title : (updatedProperties.title = data.title);
      'title' in updatedProperties ? (updatedProperties.slug = data.title.toLowerCase().replaceAll(' ', '-')) : post.slug;
      post.metaTitle == data.metaTitle ? data.metaTitle : (updatedProperties.metaTitle = data.metaTitle);
      post.summary == data.summary ? data.summary : (updatedProperties.summary = data.summary);
      post.content == data.content ? data.content : (updatedProperties.content = data.content);
      post.published == data.published ? data.published : (updatedProperties.published = Number(data.published) == 1 ? true : false);
      'published' in updatedProperties && updatedProperties.published ? (updatedProperties.publishedAt = new Date()) : post.published;
      updatedProperties.updatedAt = new Date();
      if (post) {
        // Update the properties if they are provided in the updatedProperties object
        Object.keys(updatedProperties).forEach((key) => {
          if (key in post) {
            post[key] = updatedProperties[key];
          }
        });
        return this.getBlogPostById(postId); // Indicates successful edit
      }
    }
    return 'Error: User is not the owner of this post'; // Indicates failure (post not found)
  },

  // Method to check if a post with the given ID was previously published
  wasPostPublished(postId) {
    const post = this.getBlogPostById(postId);
    return post && post.published;
  },

  // A method to create blog posts
  createNewPost(userID, postData) {
    const id = this.getAllBlogPosts().length + 1;
    const parentID = null;
    const title = postData.title;
    const metaTitle = postData.metaTitle;
    const slug = title.toLowerCase().replaceAll(' ', '-');
    const summary = postData.summary;
    const published = postData.published == '1' ? true : false;
    const publishedAt = published === true ? new Date() : null;
    const content = postData.content;
    const createdAt = new Date();
    const updatedAt = null;
    return new BlogPost(id, userID, parentID, title, metaTitle, slug, summary, published, createdAt, updatedAt, publishedAt, content);
  },
};

// Constructor for creating a BlogPost object
function BlogPost(id, authorId, parentId, title, metaTitle, slug, summary, published, createdAt, updatedAt, publishedAt, content) {
  this.id = id;
  this.authorId = authorId;
  this.parentId = parentId;
  this.title = title;
  this.metaTitle = metaTitle;
  this.slug = slug;
  this.summary = summary;
  this.published = published;
  this.createdAt = createdAt;
  this.updatedAt = updatedAt;
  this.publishedAt = publishedAt;
  this.content = content;

  // Save the new BlogPost to the database upon creation
  BlogDatabase.saveBlogPost(this);
}

// Adding sample database entries
new BlogPost(
  1,
  101,
  null,
  'Introduction to JavaScript Modules',
  'JS Modules Intro',
  'javascript-modules-intro',
  'This is a brief introduction to JavaScript modules.',
  true,
  new Date('2024-01-24T12:00:00Z'),
  new Date('2024-01-24T14:30:00Z'),
  new Date('2024-01-24T13:15:00Z'),
  'This is the content of the blog post.'
);
new BlogPost(
  2,
  102,
  null,
  'Working with Node.js',
  'Node.js Guide',
  'node-js-guide',
  'Exploring Node.js and its features.',
  true,
  new Date('2024-01-25T10:00:00Z'),
  new Date('2024-01-25T12:45:00Z'),
  new Date('2024-01-25T11:30:00Z'),
  'This post covers the basics of working with Node.js.'
);
new BlogPost(
  3,
  103,
  null,
  'CSS Flexbox Tutorial',
  'Flexbox Basics',
  'css-flexbox-tutorial',
  'Learn how to use CSS Flexbox for layout design.',
  true,
  new Date('2024-01-26T09:30:00Z'),
  new Date('2024-01-26T11:15:00Z'),
  new Date('2024-01-26T10:00:00Z'),
  'A step-by-step guide to CSS Flexbox.'
);
new BlogPost(
  4,
  104,
  null,
  'React.js Fundamentals',
  'React Basics',
  'react-js-fundamentals',
  'Understanding the fundamentals of React.js.',
  true,
  new Date('2024-01-27T08:45:00Z'),
  new Date('2024-01-27T10:30:00Z'),
  new Date('2024-01-27T09:15:00Z'),
  'Exploring the core concepts of React.js.'
);
new BlogPost(
  5,
  105,
  null,
  'Python Web Development with Flask',
  'Flask Web Dev',
  'python-flask-web-dev',
  'Building web applications with Python and Flask.',
  true,
  new Date('2024-01-28T14:00:00Z'),
  new Date('2024-01-28T16:00:00Z'),
  new Date('2024-01-28T15:15:00Z'),
  'A hands-on guide to Flask web development.'
);
new BlogPost(
  6,
  106,
  null,
  'HTML and CSS Best Practices',
  'Web Dev Tips',
  'html-css-best-practices',
  'Best practices for writing clean and maintainable HTML and CSS.',
  true,
  new Date('2024-01-29T11:30:00Z'),
  new Date('2024-01-29T13:15:00Z'),
  new Date('2024-01-29T12:00:00Z'),
  'Tips for improving your HTML and CSS code.'
);
new BlogPost(
  7,
  107,
  null,
  'MongoDB Basics for Beginners',
  'MongoDB Intro',
  'mongodb-basics',
  'Getting started with MongoDB for database beginners.',
  true,
  new Date('2024-01-30T09:00:00Z'),
  new Date('2024-01-30T11:00:00Z'),
  new Date('2024-01-30T10:15:00Z'),
  'An introduction to MongoDB and its features.'
);
new BlogPost(
  8,
  108,
  null,
  'Angular.js Crash Course',
  'Angular Intro',
  'angular-js-crash-course',
  'A quick crash course on Angular.js framework.',
  true,
  new Date('2024-01-31T13:30:00Z'),
  new Date('2024-01-31T15:30:00Z'),
  new Date('2024-01-31T14:45:00Z'),
  'Learn the basics of Angular.js in a short timeframe.'
);
new BlogPost(
  9,
  109,
  null,
  'SASS Styling Guide',
  'SASS Styling',
  'sass-styling-guide',
  'Styling web applications with SASS preprocessor.',
  true,
  new Date('2024-02-01T10:45:00Z'),
  new Date('2024-02-01T12:30:00Z'),
  new Date('2024-02-01T11:15:00Z'),
  'A comprehensive guide to SASS styling.'
);
new BlogPost(
  10,
  110,
  null,
  'Docker for Developers',
  'Docker Intro',
  'docker-for-developers',
  'Using Docker for containerized application development.',
  true,
  new Date('2024-02-02T14:30:00Z'),
  new Date('2024-02-02T16:00:00Z'),
  new Date('2024-02-02T15:15:00Z'),
  'An overview of Docker and its benefits for developers.'
);

// Exporting the BlogPost constructor and BlogDatabase as part of the module
export { BlogPost, BlogDatabase };

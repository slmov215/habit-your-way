const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cloudinary = require('./config/cloudinaryConfig');
const multer = require('multer');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // app.use((err, req, res, next) => {
  //   console.error(err.stack);
  //   res.status(500).json({ message: 'Something went wrong' });
  // });
  // Serve up static assets
  // app.use('/images', express.static(path.join(__dirname, '../client/images')));

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // Set up multer middleware
  // const storage = multer.memoryStorage();
  // const upload = multer({ storage });

  // app.post('/upload', upload.single('image'), async (req, res) => {
  //   try {
  //     const file = req.file;
  
  //     if (!file) {
  //       return res.status(400).json({ message: 'No image uploaded' });
  //     }
  
  //     const result = await cloudinary.uploader.upload(file.buffer);
  
  //     res.json(result);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Image upload failed' });
  //   }
  // });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();

const express = require('express');
const app = express();
const port = process.env.PORT || 3003; 

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const contentRoutes = require('./routes/contentRoutes');



app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/content', contentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

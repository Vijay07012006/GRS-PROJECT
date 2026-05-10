const dotenv = require('dotenv');
dotenv.config(); // ← PEHLE environment variables load karo

const app = require('./index'); // ← AB index.js load hoga, MONGO_URI available hoga

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
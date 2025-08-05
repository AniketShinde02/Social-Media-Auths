# Project 2 (social media project) - Log

## 2024-09-11

### Initial Debugging Session

The server was failing to start due to a `MODULE_NOT_FOUND` error.

**Error:**
```
Error: Cannot find module '..models/user.model'
Require stack:
- E:\AI Cohort\Backend\Project 2 (social media project)\src\routes\post.routes.js
- E:\AI Cohort\Backend\Project 2 (social media project)\src\app.js
- E:\AI Cohort\Backend\Project 2 (social media project)\server.js
```

This indicated a series of issues that were resolved.

#### 1. Fixed Module Import Path and Database Query

The root cause of the crash was a typo in `src/routes/post.routes.js`. The path `require('..models/user.model')` was missing a slash. Additionally, the Mongoose `findById` method was being called incorrectly, which would have caused a `TypeError`. Both issues were corrected.

```diff
--- a/e:\AI Cohort\Backend\Project 2 (social media project)\src\routes\post.routes.js
+++ b/e:\AI Cohort\Backend\Project 2 (social media project)\src\routes\post.routes.js
@@ -1,25 +1,23 @@
 const express = require('express');
 const jwt = require('jsonwebtoken');
 const router = express.Router();
-const userModel = require('..models/user.model');
+const userModel = require('../models/user.model');
 
 
 // Post api / post / protected hai 
 router.post('/',async (req, res) => {
     const token = req.cookies.token;
     if (!token) {
         return res.status(401).json({
             message: "Unauthorized access, please login first"
 
         });
     }
     try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
-        const user = await userModel.findById(decoded.id)({
-            _id: decoded.id,
-        })
+        const user = await userModel.findById(decoded.id);
         req.user = user;
         
     } catch (err) {
         return res.status(401).json({
             message: "Unauthorized access, please login again !"
 
         });
     }
 });
 
 module.exports = router;

```

#### 2. Registered Unused Post Routes

The `postRoutes` were imported in `src/app.js` but never used by the Express app, which would have made the post-related API endpoints unreachable.

```diff
--- a/e:\AI Cohort\Backend\Project 2 (social media project)\src\app.js
+++ b/e:\AI Cohort\Backend\Project 2 (social media project)\src\app.js
@@ -8,6 +8,7 @@
 app.use(cookieParser());
 app.use(express.json());
 app.use('/api/auth', authRoutes);//prefix
+app.use('/api/posts', postRoutes);
 
 
 module.exports = app;
```

With these fixes, the server should start correctly.
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const rescues = require('./routes/rescue');
const adopts = require('./routes/adopt');
const petcareRoute = require('./routes/petcare');
const MongoStore = require('connect-mongo');

const app = express();
// if (process.env.NODE_ENV !== "production") {
//     app.use(express.static('client/build'));
//     app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
// }
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5050

// const dbUrl = 'mongodb://localhost:27017/chetty'
const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


// const secret = process.env.SECRET || 'chettyshavenssecret!'
// const store = new MongoStore({
//     mongoUrl: dbUrl,
//     touchAfter: 24 * 60 * 60,
//     secret
// });
// store.on("error", function () {
//     console.log("SESSION STORE ERROR!", e)
// });
// const sessionConfig = {
//     store,
//     name: 'chet',
//     secret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//     }
// }
// app.use(session(sessionConfig));
// app.use(flash());


// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// });

app.use('/rescue', rescues);
app.use('/adopt', adopts);
// app.use('/user', usersRoute);
app.use('/petcare', petcareRoute);

app.get('/', (req, res) => {
    res.send('home')
})

// app.all('*', (req, res, next) => {
//     next(new ExpressError('page not Found', 404))
// })

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something wrong happened'
    // res.status(statusCode).render('error', { err })
    res.status(err.status || 500);
res.json({
  message: err.message,
  error: err
});
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})
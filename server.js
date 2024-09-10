const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 5001;

const Event = require("./models/event");
const User = require("./models/user");

mongoose.connect('mongodb://127.0.0.1:27017/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Express Session Middleware
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    })
  );

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
    console.log(`Server started running! (PORT: ${PORT})`);
});

// passport local strategy for handling authentication of user
passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          console.log('User does not exist');
          return done(null, false, { message: 'User does not exist. Please create an account.' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          console.log('Password matched');
          return done(null, user);
        } else {
          console.log('Incorrect password');
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (err) {
        console.error('Error in LocalStrategy:', err);
        return done(err);
      }
    })
  );
  

// Serializing and Deserializing User for session management
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// API for submitting user details into database whenever a new user is created
app.post('/signup', async (req, res) => {
    const { name, email, password, bio } = req.body;
    
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user = new User({
        name,
        email,
        password: hashedPassword,
        bio,
      });
  
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// API for updating user profile whenever user makes any edits to their profile
app.put('/updateuser', async (req, res) => {
    const { email, name, bio } = req.body;
    const user = await User.findOneAndUpdate({ email: email }, { name: name, bio: bio }, { new: true });

    // Handling case if user is not present
    if (!user) {
        return res.status(404).send("User not found!");
    }
    res.json({ message: "Profile successfully updated", user });
});

// API to create a new event
app.post('/events', async (req, res) => {
    req.body["members"] = [];
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json(newEvent);
});

// API to update members of an event
app.patch('/events', async (req, res) => {
    let event = await Event.findById(req.body._id);
    event.set({ 'members': req.body.members });
    await event.save();
    res.json(event);
});

// API to get all events
app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

//API to handle login requests 
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Authentication error:', err); // Log detailed error
        return res.status(500).json({ message: 'Server error' });
      }
      if (!user) {
        console.warn('Authentication failed:', info ? info.message : 'No user found');
        return res.status(401).json({ success: false, message: info ? info.message : 'Authentication failed' });
      }
      req.login(user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ message: 'Server error during login' });
        }
  
        return res.json({
          success: true,
          message: 'Login successful',
          user: {
            name: user.name,
            email: user.email,
            bio: user.bio,
            events: user.events,
            friends: user.friends
          }
        });
      });
    })(req, res, next);
  });
  
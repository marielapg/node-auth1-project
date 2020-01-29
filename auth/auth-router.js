const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.get("/users", (req, res, next) => {

  if(req.headers.authorization){
    bcrypt.hash(req.headers.authorization, 10, (err, hash) => { 
      if (err) {
      res.status(500).json({message: 'You shall not pass!'});
    } else {
      res.status(200).json({ hash });
    }
      });
      } else {
      res.status(400).json({error: "missing header"});
    }

});

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
        console.log(error);
      res.status(500).json(error);
    });

});


router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bc.compareSync(password, user.password)) {
        req.session.loggedIn = true;
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({
                    you:
                        "can checkout any time you like, but you can never leave!",
                });
            } else {
                res.status(200).json({ bye: "thanks for playing" });
            }
        });
    } else {
        res.status(204);
    }
  });

module.exports = router;
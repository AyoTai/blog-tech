const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Post Route when Logged in
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
     const posts = dbPostData.map(post => post.get({ plain: true }));
     res.render('dashboard', { 
         posts, 
         loggedIn: true 
    });
    })
    .catch(err => {
    console.log(err);
     res.status(500).json(err);
    });
});

router.get('/add-new', (req, res) => {
  res.render('add-new');
});

router.get('/edit-post/:id', withAuth, (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
       }
      const post = dbPostData.get({ plain: true });
        res.render('edit-post', {
         post,
         loggedIn: true
      });
    })
    .catch(err => {
         console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
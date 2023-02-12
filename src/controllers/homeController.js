const router = require('express').Router();
const Book = require('../models/Book');
const User = require('../models/User');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/', (req, res) => {
   res.render('home')
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/catalog', async(req, res) => {
   const books = await Book.find().lean();

   res.render('catalog', {books});
});

router.get('/create', (req, res)=> {
     res.render('create');
});

router.post('/create', async(req, res) => {
    const {title, author, genre, stars, imageUrl, review} = req.body;

    try {
       const booki = new Book({title, author, genre, stars, imageUrl, review, owner: req.user._id});
       await booki.save();
       res.redirect('/catalog');
    } catch(err){
        return res.status(404).render('create', {err: getErrorMessage(err)});
    }

});

router.get('/profile', async(req, res) => {

    if (!req.user) {
        return res.render('404');
    }

    const usera = await User.findById(req.user._id).populate('wish').lean();

    res.render('profile', {usera});
});

router.get('/details/:bookId', async (req, res) => {
    const booking = await Book.findById(req.params.bookId).lean();
    let isOwner = false;
    let logged = false;
    let inList = false;
    if (req.user) {
        let wishList = booking.wishingList;
        wishList = wishList.filter(x => x._id == req.user._id);
        isOwner = (booking.owner == req.user._id);
        logged = true;
        if (wishList.length != 0){
            inList = true;
        }
        res.render('details', { booking, isOwner, logged, inList });
    } else {
        res.render('details', { booking, logged });
    }

});


router.get('/edit/:bookId', async(req, res)=> {
    const booker = await Book.findById(req.params.bookId).lean();
     
    if (!req.user){
      return res.redirect('/404');
    }

    if (req.user._id != booker.owner){
        return res.redirect('/404');
    }
    res.render('edit', {booker});
  });

router.post('/edit/:bookId', async(req, res) => {
    const {title, author, genre, stars, imageUrl, review} = req.body;
    try{
       await Book.findByIdAndUpdate(req.params.bookId, {title, author, genre, stars, imageUrl, review}, {runValidators: true});
        res.redirect('/catalog');
    } catch(err){
        return res.status(404).render('create', {err: getErrorMessage(err)});
    }
});

router.get('/delete/:bookId', async(req, res) => {
    const booke = await Book.findByIdAndDelete(req.params.bookId);

    if (req.user._id != booke.owner){
        throw Error('You are not owner of that book!');
    }
    res.redirect('/catalog');
});

router.get('/save/:bookId', async(req, res) => {
   const bookl = await Book.findById(req.params.bookId);
   const usero = await User.findById(req.user._id);
   bookl.wishingList.push(req.user._id);
   bookl.save();
   usero.wish.push(req.params.bookId);
   usero.save();
   res.redirect('/catalog');

});


module.exports = router;
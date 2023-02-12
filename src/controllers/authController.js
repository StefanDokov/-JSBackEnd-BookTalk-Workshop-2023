const router = require('express').Router();
const authManager = require('../managers/authManager');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('auth/login');
});


router.post('/login', async(req, res) => {
     const {email, password} = req.body
     
     try{

     const token = await authManager.login(email, password);
     res.cookie('auth', token);
     res.redirect('/');

     }catch(err) {
       return res.status(404).render('auth/login', {err: getErrorMessage(err)});
     }
    
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

   const {email, username, password, rePassword} = req.body;
  try{
  const token = await authManager.register(username, email, password, rePassword);

     res.cookie('auth', token);
     res.redirect('/');

  } catch(err) {
      res.status(400).render('auth/register', {err: getErrorMessage(err)});
  }
   
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;
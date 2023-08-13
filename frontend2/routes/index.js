const express = require('express')
const router = express.Router()
var article = require('/Users/Apisorn62070218/Desktop/SHIRT_SOCCER_SHOP/article-db.json')

router.get('/', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('LoginPage', data)
})
router.get('/Landing_Page', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('Landing_Page')
})
router.get('/RegisterPage', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('RegisterPage', data)
})
router.get('/PremierLeuge', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('PremierLeuge', data)
})
router.get('/LaLiga', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('LaLiga', data)
})
router.get('/Bundesliga', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('Bundesliga', data)
})
router.get('/ManageProduct', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('ManageProduct', data)
})
router.get('/addProductPre', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('addProductPre', data)
})
router.get('/addProductLa', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('addProductLa', data)
})
router.get('/addProductBun', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('addProductBun', data)
})
router.get('/Cart', function(req, res, next) {
    var data = { title: 'Express', article }
    res.render('Cart', data)
})
module.exports = router
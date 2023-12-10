class homeControllers {
    //GET /home
    show(req, res) {
        res.render('home');
    }
}

module.exports = new homeControllers();

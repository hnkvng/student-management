class homeControllers {
    //GET /home
    show(rep, res) {
        res.render('home');
    }
}

module.exports = new homeControllers();

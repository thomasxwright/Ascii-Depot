/*
Home Controller:
    - Contains one function: getIndex(), renders the view "index.ejs"
*/


module.exports = {
    getIndex: (req, res) => {
        res.render('index.ejs');
    }
}

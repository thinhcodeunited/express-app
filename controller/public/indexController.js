const {getsessiondata} = require('../../utils/getsessiondata');
module.exports.action = (req, res) => {
    const obj = {
        title : 'Front end'
    }
    const indexobj = getsessiondata(req, obj);
    res.render('public/index', indexobj);
}
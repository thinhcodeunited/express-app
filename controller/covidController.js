const fetch = require('node-fetch');
const {getsessiondata} = require('../utils/getsessiondata');

module.exports.action = async (req, res) => {
    try {
        const response = await fetch(`https://static.pipezero.com/covid/data.json`);
        let data = await response.json();
        let obj = {
            title : 'Covid today',
            covidLocations : data.locations,
            covidToday : data.today.internal,
            covidTotal : data.total.internal,
        }
        obj = getsessiondata(req, obj);
        res.render('covid/display', obj);
    } catch (e) {
        console.log(e);
        res.send('loi roi');
    }
}
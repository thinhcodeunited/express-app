const {getsessiondata} = require('../utils/getsessiondata');
const fs = require('fs');
const fetch = require('node-fetch');
const api_key = 'd2446af8dd6262f9b2a93b709387eb73';
const translate = require('translatte');

const convertWeatherData = async (data) => {
    return {
        description: await toTranslate(data.weather[0].description),
        temp : convertTemp(data.main.temp),
        humidity: data.main.humidity + "%",
        wind_speed : data.wind.speed + "m/s",
        clouds : data.clouds.all + "%",
        rain : (data.rain? data.rain['1h'] + "mm" : null),
        visibility : data.visibility/1000 + "Km",
        sunrise : new Date(data.sys.sunrise*1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset*1000).toLocaleTimeString(),
    };
}

const toTranslate = async (text) => {
    try {
        const translation = await translate(text, {to : 'vi'});
        return translation.text;
    } catch (e) {
        return 'Translate error!';
    }

}

const convertTemp = (temp) => {
    return (temp - 273.15).toFixed(2) + "℃";
}

module.exports.display = async (req, res) => {
    try {
        let content = await fs.readFileSync('bin/city.list.json', 'utf-8');
        content = JSON.parse(content)
        let weatherData = null;
        let city_checked = (req.query.city) ? req.query.city : null;
        if (req.query.city) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${req.query.city}&appid=${api_key}`);
            let data = await response.json();
            weatherData = await convertWeatherData(data);
        }
        let obj = {
            title : 'Weather display',
            city : content,
            weatherData : weatherData,
            city_checked : city_checked
        }
        obj = getsessiondata(req, obj);
        res.render('weather/display', obj);
    } catch (e) {
        console.log(e);
        res.send('loi roi');
    }
}
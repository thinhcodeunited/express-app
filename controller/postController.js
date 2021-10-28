const {getsessiondata} = require('../utils/getsessiondata');
const fetch = require('node-fetch');
const postModel = require('../model/postModel');
const {ghostapi} = require('../utils/ghostapi');


module.exports.list = async (req, res) => {
    try {
        let obj = {
            title : 'Posts',
            posts : [{
                name : 'Post1',
                content : 'Post1'
            },{
                name : 'Post2',
                content : 'Post2'
            }]
        }
        obj = getsessiondata(req, obj);
        res.render('post/list', obj);
    } catch (e) {
        console.log(e);
        res.send('loi roi');
    }

}

module.exports.syncGhost = async (req, res) => {
    try {
        const posts = await ghostapi.posts.browse();
        let obj = [];
        posts.forEach(v => {
            const newuser = {
                username : v.primary_author.email,
                password : 'password',
                email : v.primary_author.email
            };
            console.log(newuser);
            const reg = await userModel.register(userinfo);



        });
        // posts.forEach(v => {
        //     const newuser = {
        //         username : v.primary_author.email,
        //         password : 'password',
        //         email : v.primary_author.email
        //     };
        //     console.log(newuser);
        //     // const reg = await userModel.register(userinfo);
        //
        //
        //     const childobj = {
        //         _id : v.id,
        //         title : v.title,
        //         content : v.excerpt,
        //         slug : v.slug,
        //         status : v.status,
        //         feature_image : v.feature_image,
        //         author : 'test',
        //         created_at : v.created_at,
        //         updated_at : v.updated_at,
        //         internal : false
        //     }
        // });

    } catch (e) {

    }


    return res.redirect('/post');
}
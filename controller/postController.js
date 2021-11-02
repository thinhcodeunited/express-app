const {getsessiondata} = require('../utils/getsessiondata');
const mongoose =  require('mongoose');
const fetch = require('node-fetch');
const postModel = require('../model/postModel');
const {ghostapi} = require('../utils/ghostapi');
const userModel = require('../model/userModel');
const fs = require('fs');

const get_time_ago = (time) => {
    const ago = Date.now() - (new Date(time).getTime());
    const seconds = Math.floor(ago / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

module.exports.list = async (req, res) => {
    try {
        let posts = await postModel.getAll();
        posts = posts.map(ele => {
            ele.timeago = get_time_ago(ele.created_at);
            return ele;
        });
        let obj = {
            title : 'Posts',
            posts : posts
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
        let arr = [];
        posts.forEach((value, index) => {
            const newuser = {
                username : value.primary_author.email,
                password : 'password',
                email : value.primary_author.email
            };
            const isExist = arr.some((ele) => {
                return JSON.stringify(ele) === JSON.stringify(newuser);
            });
            if (!isExist) {
                arr.push(newuser);
            }
        });
        
        const reg = await userModel.register(arr);
        if (reg._message) {
            // If user exist then skip and do nothing
        }

        //Get all user
        const users = await userModel.get();
        let listu = [];
        users.forEach(ele => listu[ele.email] = ele._id);
        
        // Store posts
        let posttosave = [];
        posts.forEach(v => {
            posttosave.push({
                _id : v.id,
                title : v.title,
                content : v.excerpt,
                slug : v.slug,
                status : v.status,
                feature_image : v.feature_image,
                author : listu[v.primary_author.email],
                created_at : new Date(v.created_at).toLocaleString(),
                updated_at : new Date(v.updated_at).toLocaleString(),
                internal : false
            })
        });
        const savePost = await postModel.create(posttosave);

        if (savePost._message) {
            // Error when save post, only warning thow console
            console.log(savePost);
        }

        res.redirect('/post');
    } catch (e) {
        console.log(e);
    }


    return res.redirect('/post');
}

module.exports.addPostView = (req, res) => {
    const obj = {
        type : 'new',
        title : "New post",
        post : {
            title : '',
            content : '',
            status : 'published',
            feature_image : '',
            slug : ''
        }
    }
    res.render('post/edit', obj);   
}

module.exports.addPost = async (req, res) => {
    if (req.body.title === '') {
        return res.redirect('/post/new');
    }   
   
    let slug = req.body.title.trim().replace(/\s+/g, '-');
    if (req.body.slug) {
        slug = req.body.slug;        
    }
    let feature_image = '';
    if (req.file) {
        feature_image = req.headers.origin + '/uploads/' + req.file.filename;
    }

    const session = req.session.Userinfo;
    if (!session) {
        return res.redirect('/post/new');
    }  

    const posttosave =  {
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title,
        content : req.body.content,
        slug : slug,
        status : req.body.poststatus,
        feature_image : feature_image,
        author : session.user._id,
        created_at : new Date(Date.now()).toLocaleString(),
        updated_at : new Date(Date.now()).toLocaleString(),
        internal : true
    }
    try {
        const savePost = await postModel.create(posttosave);
        if (savePost._message) {
            // Error when save post, only warning thow console
            console.log(savePost);
        }
        res.redirect('/post');
    } catch (e) {
        console.log(e);
    }

}

module.exports.editPostView = async (req, res) => {
    const post_id = req.params.id;
    if (!post_id) {
        return res.redirect('/post');
    }

    try {
        const post = await postModel.getOne({_id : post_id});

        const obj = {
            type : 'edit',
            title : "Edit post",
            post : {
                title : post.title,
                content : post.content,
                status : post.status,
                feature_image : post.feature_image,
                slug : post.slug
            }
        }
   
        res.render('post/edit', obj); 
    } catch(e) {
        return res.render('/post');
    }
     
}
const get_capability = (user) => {
    const cap = {
        manage_user : {
            create_user : true,
            edit_user : true,
            remove_user : true
        },
        manage_post : {
            create_post : true,
            edit_post : true,
            remove_post : true,
        }
    }
    if (user.role_id.role !== 'admin') {
        cap.manage_user = false;
        cap.manage_post.remove_post = false;
    }
    return {user, ...cap};
}

module.exports = {get_capability}
exports.find_user = (_req, res) => {
    axios.get('http://localhost:3000/api/users%27)
        .then(function(userdata){
            res.render('index', { users : userdata.data });
        })
        .catch(err =>{
            res.send(err);
        })


}

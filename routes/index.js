
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'The Wonderful Christopher Chat Experience' });
};
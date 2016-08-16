exports.findAll = function(req, res) {
    res.send([{name:'bin1'}, {name:'bin2'}, {name:'bin3'}]);
};
 
exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};

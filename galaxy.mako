galaxyMenu = document.createElement("div");
galaxyMain = document.createElement("div");
galaxyDiv.appendChild(galaxyMenu);
galaxyDiv.appendChild(galaxyMain);

var xhr = require("nets");
xhr(url, function(err, response,text){
	
	if(dataType == "galaxy.datatypes.sequence.Fasta"){
		var seqs = require("biojs-io-fasta").parse.parse(response);
	}else{
		// it could be clustal
		var seqs = require("biojs-io-clustal").parse(response); 
	}
	
	var msa = require("biojs-vis-msa");
	
	var opts = {};
	
	opts.el = galaxyMain; 
	opts.seqs = seqs;
	
	//opts.zoomer = { textVisible: false};
	opts.vis = {overviewbox: true};
	//opts.columns = {hidden: [1,2,3]};
	opts.zoomer = {labelWidth: 200};
	var m = new msa.msa(opts);
	
	// the menu is independent to the MSA container
	var menuOpts = {};
	menuOpts.el = galaxyMenu;
	menuOpts.msa = m;
	var defMenu = new msa.menu.defaultmenu(menuOpts);
	m.addView("menu", defMenu);
	
	m.render();
});
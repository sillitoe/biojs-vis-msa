/* global rootDiv */
// set your custom properties

var opts = {};

// set your custom properties
// @see: https://github.com/wilzbach/biojs-vis-msa/tree/master/src/g
opts.el = rootDiv;
opts.vis = {
    conserv: false,
    overviewbox: false,
    seqlogo: true
};
opts.conf = {
    dropImport: true
};
opts.zoomer = {
    menuFontsize: "12px",
    autoResize: true
};

// init msa
var m = new msa.msa(opts);

var defaultURL = "./data/fer1.clustal";
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

var url = getURLParameter('seq') || defaultURL;
m.u.file.importURL(url, renderMSA);

function renderMSA() {

    // the menu is independent to the MSA container
    var menuOpts = {};
    menuOpts.el = document.getElementById('div');
    menuOpts.msa = m;
    menuOpts.menu = "small";
    var defMenu = new msa.menu.defaultmenu(menuOpts);
    m.addView("menu", defMenu);

    // call render at the end to display the whole MSA
    m.render();
}

//@biojs-instance=m.g

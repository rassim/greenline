Ext.BLANK_IMAGE_URL = '/extjs/resources/images/default/s.gif';
Ext.ns('Exchange');

function callToRemote(url) {
  new Ajax.Request(url, {asynchronous:true, evalScripts:true});
}

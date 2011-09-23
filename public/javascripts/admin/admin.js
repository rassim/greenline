// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

Ext.BLANK_IMAGE_URL = '/extjs/resources/images/default/s.gif';
Ext.ns('Admin');

function callToRemote(url) {
  new Ajax.Request(url, {asynchronous:true, evalScripts:true});
} 
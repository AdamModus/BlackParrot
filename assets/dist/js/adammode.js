/*! fluidvids.js v2.4.1 | (c) 2014 @toddmotto | https://github.com/toddmotto/fluidvids */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.fluidvids = factory();
  }
})(this, function () {

  'use strict';

  var fluidvids = {
    selector: ['iframe', 'object'],
    players: ['www.youtube.com', 'player.vimeo.com']
  };

  var css = [
    '.fluidvids {',
      'width: 100%; max-width: 100%; position: relative;',
    '}',
    '.fluidvids-item {',
      'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;',
    '}'
  ].join('');

  var head = document.head || document.getElementsByTagName('head')[0];

  function matches (src) {
    return new RegExp('^(https?:)?\/\/(?:' + fluidvids.players.join('|') + ').*$', 'i').test(src);
  }

  function getRatio (height, width) {
    return ((parseInt(height, 10) / parseInt(width, 10)) * 100) + '%';
  }

  function fluid (elem) {
    if (!matches(elem.src) && !matches(elem.data) || !!elem.getAttribute('data-fluidvids')) return;
    var wrap = document.createElement('div');
    elem.parentNode.insertBefore(wrap, elem);
    elem.className += (elem.className ? ' ' : '') + 'fluidvids-item';
    elem.setAttribute('data-fluidvids', 'loaded');
    wrap.className += 'fluidvids';
    wrap.style.paddingTop = getRatio(elem.height, elem.width);
    wrap.appendChild(elem);
  }

  function addStyles () {
    var div = document.createElement('div');
    div.innerHTML = '<p>x</p><style>' + css + '</style>';
    head.appendChild(div.childNodes[1]);
  }

  fluidvids.render = function () {
    var nodes = document.querySelectorAll(fluidvids.selector.join());
    var i = nodes.length;
    while (i--) {
      fluid(nodes[i]);
    }
  };

  fluidvids.init = function (obj) {
    for (var key in obj) {
      fluidvids[key] = obj[key];
    }
    fluidvids.render();
    addStyles();
  };

  return fluidvids;

});

/*
 * xmToJSON 1.3 - https://github.com/metatribal/xmlToJSON
 * Copyright 2015 William Summers, MetaTribal LLC
 */
var xmlToJSON=function(){this.version="1.3";var e={mergeCDATA:!0,grokAttr:!0,grokText:!0,normalize:!0,xmlns:!0,namespaceKey:"_ns",textKey:"_text",valueKey:"_value",attrKey:"_attr",cdataKey:"_cdata",attrsAsObject:!0,stripAttrPrefix:!0,stripElemPrefix:!0,childrenAsArray:!0},t=new RegExp(/(?!xmlns)^.*:/),r=new RegExp(/^\s+|\s+$/g);return this.grokType=function(e){return/^\s*$/.test(e)?null:/^(?:true|false)$/i.test(e)?"true"===e.toLowerCase():isFinite(e)?parseFloat(e):e},this.parseString=function(e,t){return this.parseXML(this.stringToXML(e),t)},this.parseXML=function(a,n){for(var s in n)e[s]=n[s];var l={},i=0,o="";if(e.xmlns&&a.namespaceURI&&(l[e.namespaceKey]=a.namespaceURI),a.attributes&&a.attributes.length>0){var c={};for(i;i<a.attributes.length;i++){var u=a.attributes.item(i);m={};var p="";p=e.stripAttrPrefix?u.name.replace(t,""):u.name,e.grokAttr?m[e.valueKey]=this.grokType(u.value.replace(r,"")):m[e.valueKey]=u.value.replace(r,""),e.xmlns&&u.namespaceURI&&(m[e.namespaceKey]=u.namespaceURI),e.attrsAsObject?c[p]=m:l[e.attrKey+p]=m}e.attrsAsObject&&(l[e.attrKey]=c)}if(a.hasChildNodes())for(var y,d,m,h=0;h<a.childNodes.length;h++)y=a.childNodes.item(h),4===y.nodeType?e.mergeCDATA?o+=y.nodeValue:l.hasOwnProperty(e.cdataKey)?(l[e.cdataKey].constructor!==Array&&(l[e.cdataKey]=[l[e.cdataKey]]),l[e.cdataKey].push(y.nodeValue)):e.childrenAsArray?(l[e.cdataKey]=[],l[e.cdataKey].push(y.nodeValue)):l[e.cdataKey]=y.nodeValue:3===y.nodeType?o+=y.nodeValue:1===y.nodeType&&(0===i&&(l={}),d=e.stripElemPrefix?y.nodeName.replace(t,""):y.nodeName,m=xmlToJSON.parseXML(y),l.hasOwnProperty(d)?(l[d].constructor!==Array&&(l[d]=[l[d]]),l[d].push(m)):(e.childrenAsArray?(l[d]=[],l[d].push(m)):l[d]=m,i++));else o||(e.childrenAsArray?(l[e.textKey]=[],l[e.textKey].push(null)):l[e.textKey]=null);if(o)if(e.grokText){var x=this.grokType(o.replace(r,""));null!==x&&void 0!==x&&(l[e.textKey]=x)}else e.normalize?l[e.textKey]=o.replace(r,"").replace(/\s+/g," "):l[e.textKey]=o.replace(r,"");return l},this.xmlToString=function(e){try{var t=e.xml?e.xml:(new XMLSerializer).serializeToString(e);return t}catch(r){return null}},this.stringToXML=function(e){try{var t=null;if(window.DOMParser){var r=new DOMParser;return t=r.parseFromString(e,"text/xml")}return t=new ActiveXObject("Microsoft.XMLDOM"),t.async=!1,t.loadXML(e),t}catch(a){return null}},this}.call({});"undefined"!=typeof module&&null!==module&&module.exports?module.exports=xmlToJSON:"function"==typeof define&&define.amd&&define(function(){return xmlToJSON});


/* Ghost Macaws Search '' */
var searchBtn = document.getElementById('searchBtn');
var searchInput = document.getElementById('searchInput');
var listsResults = document.getElementById('listsResults');

var searchPosts = function () {

  listsResults.innerHTML = '';

  var request = new XMLHttpRequest();
  var posts = {};

  request.open('GET', '/sitemap-posts.xml', true);
  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  //request.responseType = 'json';
  //request.withCredentials = true;

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var xmlText = new XMLSerializer().serializeToString(this.responseXML);
      var result = xmlToJSON.parseString(xmlText).urlset[0].url;
      var postList = [];

      result.forEach(function(item, i) {

          var postName = '';
          var getTS = item.loc[0]._text.split('/')[3];
          var spTS  = getTS.split('-');

          for(var x = 0; x < spTS.length; x++) {
              postName += spTS[x] + ' ';
          }

          postList[i] = { title: postName, url: item.loc[0]._text };

      });

      //////
      //console.log(postList);

      var searchResults = [];
      var index = 0;

      var searchKey = searchInput.value;
      searchKey = searchKey.replace(' ', '|'); // "black|palm"
      searchKey = new RegExp(searchKey);

      for(var y=0; y < postList.length; y++) {
          if(searchKey.test(postList[y].title)) {
              searchResults[index++] = postList[y];
          }
      }

      if(searchResults.length) {

          listsResults.innerHTML = '<h5>('+searchResults.length+') Results Found:</h5>';

          window.setTimeout(function() {
              searchResults.forEach(function(item, i) {

                  listsResults.innerHTML += '<a href="'+item.url+'" class="list-group-item list-group-item-action internal-link">' +
                  '<h5 class="m-b-0 text-primary text-muted col-12">'+item.title+'</h3>' +
                  '<small class="text-muted text-muted col-12"><strong>Last Mod:</strong> 05/27/2016</small>' +
                  '</a>';


              });

          }, 100);


      } else {
          listsResults.innerHTML = '<h5><em>No Results Found!</em></h5>';
      }

      ///



      ////

    } else {
      // We reached our target server, but it returned an error
      console.log(this);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log(this);
  };

  request.send(null);

};

if (searchBtn) {
	searchBtn.addEventListener('click', searchPosts, false);
}

;(function () {

	//*** Init Configs

	//* FormSpree
	var contactform =  document.getElementById('contactform');
	if(contactform) {
		contactform.setAttribute('action', '//formspree.io/' + 'macaw' + '@' + 'macaw' + '.' + 'ws');
	}
	////

	//*** Init Plug-ins

	//* FluidVids
	fluidvids.init({
		selector: ['iframe', 'object'],
		players: ['player.youtube.com', 'www.youtube.com']
	});

	//*** Events After DOM Content Loaded
	document.addEventListener('DOMContentLoaded', function(e) {

		//* offSetMenu
    	var btnMenu = document.querySelectorAll('.offsetMenu');

	    for(var x = 0; x < btnMenu.length; x++) {
	      btnMenu[x].addEventListener('click', function () {
	      	document.body.classList.toggle('nav-opened');
	      }, false);
	    }

		//* offSetSearch
    	var btnMenu = document.querySelectorAll('.offsetSearch');

	    for(var x = 0; x < btnMenu.length; x++) {
	      btnMenu[x].addEventListener('click', function () {
	      	document.body.classList.toggle('search-opened');
	      }, false);
	    }


		//* MagicLinks
		var navLinks = document.getElementsByClassName('internal-link');
		var outEff = document.getElementById('bWrapper');


	  	window.addEventListener("scroll", function(event) {

	    	if(this.scrollY > 1) {
	    		outEff.classList.remove('fadeIn');
	    	}

		}, false);

		// Set special anim internal click events
		for(var i = 0; i < navLinks.length; i++) {

			navLinks[i].addEventListener('click', function(e) {

		  		//e.preventDefault();
		  		var self = this;

		  		outEff.classList.add('fadeOut');

		  		window.setTimeout(function() {
		  			var trigg = document.createEvent('HTMLEvents');
					trigg.initEvent('click', true, false);
					self.dispatchEvent(trigg);
		  		}, 500);

			}, false);

		}

	}, false);
	////

  	//*** Service Worker (PWA Cache)

    //* Register the service worker if available.
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('/sw.js').then(function(reg) {
    //         console.log('Successfully registered service worker', reg);
    //     }).catch(function(err) {
    //         console.warn('Error whilst registering service worker', err);
    //     });
    // }

    window.addEventListener('online', function(e) {
        // Resync data with server.
        console.log("You are online");
        // Page.hideOfflineWarning();
        //Arrivals.loadData();
    }, false);

    window.addEventListener('offline', function(e) {
        // Queue up events for server.
        console.log("You are offline");
        // Page.showOfflineWarning();
    }, false);

	////
})();

//# sourceMappingURL=adammode.js.map

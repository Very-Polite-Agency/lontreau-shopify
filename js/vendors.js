// @codekit-prepend quiet "../node_modules/lazysizes/lazysizes.min.js";
// @codekit-prepend quiet "../node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.min.js";
// @codekit-prepend quiet "../node_modules/lazysizes/plugins/attrchange/ls.attrchange.min.js";

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.lazyClass = 'lazyload';
lazySizesConfig.loadMode = 1;

document.addEventListener('lazybeforeunveil', function(e){
	var bg = e.target.getAttribute('data-bg');
	if(bg){
		e.target.style.backgroundImage = 'url(' + bg + ')';
	}
});

document.addEventListener('lazyloaded', function(e){
  e.target.parentNode.classList.add('lazyloaded');
});

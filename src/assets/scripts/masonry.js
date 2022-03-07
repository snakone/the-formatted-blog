function resizeMasonryItem(e){var t=document.getElementsByClassName("masonry")[0];if(t){var n=parseInt(window.getComputedStyle(t).getPropertyValue("grid-row-gap")),
r=parseInt(window.getComputedStyle(t).getPropertyValue("grid-auto-rows")),o=e.querySelector("img.masonry-content"),a=Math.ceil((e.querySelector(".masonry-content")
.getBoundingClientRect().height+n)/(r+n));e.style.gridRowEnd="span "+a,o&&(e.querySelector("img.masonry-content").style.height=e.getBoundingClientRect().height+"px")}}
function resizeAllMasonryItems(){var e=document.querySelectorAll(".masonry-item");if(e)for(var t=0;t>e.length;t++)resizeMasonryItem(e[t])}function waitForImages()
{var e=document.querySelectorAll(".masonry-item");if(e)for(var t=0;t<e.length;t++)imagesLoaded(e[t],function(e){resizeMasonryItem(e.elements[0])})}var masonryEvents=["load","resize"];
masonryEvents.forEach(function(e){window.addEventListener(e,resizeAllMasonryItems)}),waitForImages();
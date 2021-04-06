!function(t){"use strict";var e=function(i,n,s){s&&(s.stopPropagation(),s.preventDefault()),this.$element=t(i),this.$newElement=null,this.$button=null,this.$menu=null,this.options=t.extend({},t.fn.selectpicker.defaults,this.$element.data(),"object"==typeof n&&n),null==this.options.title&&(this.options.title=this.$element.attr("title")),this.val=e.prototype.val,this.render=e.prototype.render,this.refresh=e.prototype.refresh,this.setStyle=e.prototype.setStyle,this.selectAll=e.prototype.selectAll,this.deselectAll=e.prototype.deselectAll,this.init()};e.prototype={constructor:e,init:function(e){this.$element.hide(),this.multiple=this.$element.prop("multiple");var i=this.$element.attr("id");if(this.$newElement=this.createView(),this.$element.after(this.$newElement),this.$menu=this.$newElement.find("> .dropdown-menu"),this.$button=this.$newElement.find("> button"),void 0!==i){var n=this;this.$button.attr("data-id",i),t('label[for="'+i+'"]').click(function(){n.$button.focus()})}this.checkDisabled(),this.checkTabIndex(),this.clickListener(),this.render(),this.liHeight(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",this),this.$newElement.data("this",this)},createDropdown:function(){var e=this.multiple?" show-tick":"";return t("<div class='btn-group bootstrap-select"+e+"'><button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown'><div class='filter-option pull-left'></div>&nbsp;<div class='caret'></div></button><div class='dropdown-menu open'><ul class='dropdown-menu inner' role='menu'></ul></div></div>")},createView:function(){var t=this.createDropdown(),e=this.createLi();return t.find("ul").append(e),t},reloadLi:function(){this.destroyLi();var t=this.createLi();this.$menu.find("ul").append(t)},destroyLi:function(){this.$menu.find("li").remove()},createLi:function(){var e=this,i=[],n="";return this.$element.find("option").each(function(n){var s=t(this),o=s.attr("class")||"",l=s.attr("style")||"",a=s.data("content")?s.data("content"):s.html(),d=void 0!==s.data("subtext")?'<small class="muted">'+s.data("subtext")+"</small>":"",h=void 0!==s.data("icon")?'<i class="glyphicon '+s.data("icon")+'"></i> ':"";if(""!==h&&(s.is(":disabled")||s.parent().is(":disabled"))&&(h="<span>"+h+"</span>"),s.data("content")||(a=h+'<span class="text">'+a+d+"</span>"),e.options.hideDisabled&&(s.is(":disabled")||s.parent().is(":disabled")))i.push('<a style="min-height: 0; padding: 0"></a>');else if(s.parent().is("optgroup")&&1!=s.data("divider"))if(0==s.index()){var r=s.parent().attr("label"),c=void 0!==s.parent().data("subtext")?'<small class="muted">'+s.parent().data("subtext")+"</small>":"";r=(s.parent().data("icon")?'<i class="'+s.parent().data("icon")+'"></i> ':"")+'<span class="text">'+r+c+"</span>",0!=s[0].index?i.push('<div class="div-contain"><div class="divider"></div></div><dt>'+r+"</dt>"+e.createA(a,"opt "+o,l)):i.push("<dt>"+r+"</dt>"+e.createA(a,"opt "+o,l))}else i.push(e.createA(a,"opt "+o,l));else 1==s.data("divider")?i.push('<div class="div-contain"><div class="divider"></div></div>'):1==t(this).data("hidden")?i.push(""):i.push(e.createA(a,o,l))}),t.each(i,function(t,e){n+="<li rel="+t+">"+e+"</li>"}),this.multiple||0!=this.$element.find("option:selected").length||e.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),t(n)},createA:function(t,e,i){return'<a tabindex="0" class="'+e+'" style="'+i+'">'+t+'<i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a>'},render:function(){var e=this;this.$element.find("option").each(function(i){e.setDisabled(i,t(this).is(":disabled")||t(this).parent().is(":disabled")),e.setSelected(i,t(this).is(":selected"))});var i=this.$element.find("option:selected").map(function(i,n){var s,o=t(this),l=o.data("icon")&&e.options.showIcon?'<i class="glyphicon '+o.data("icon")+'"></i> ':"";return s=e.options.showSubtext&&o.attr("data-subtext")&&!e.multiple?' <small class="muted">'+o.data("subtext")+"</small>":"",o.data("content")&&e.options.showContent?o.data("content"):void 0!=o.attr("title")?o.attr("title"):l+o.html()+s}).toArray(),n=this.multiple?i.join(", "):i[0];if(e.multiple&&e.options.selectedTextFormat.indexOf("count")>-1){var s=e.options.selectedTextFormat.split(">"),o=this.options.hideDisabled?":not([disabled])":"";(s.length>1&&i.length>s[1]||1==s.length&&i.length>=2)&&(n=e.options.countSelectedText.replace("{0}",i.length).replace("{1}",this.$element.find('option:not([data-divider="true"]):not([data-hidden="true"])'+o).length))}n||(n=void 0!=e.options.title?e.options.title:e.options.noneSelectedText),e.$newElement.find(".filter-option").html(n)},setStyle:function(t,e){this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device/gi,""));var i=t||this.options.style;"add"==e?this.$button.addClass(i):"remove"==e?this.$button.removeClass(i):(this.$button.removeClass(this.options.style),this.$button.addClass(i))},liHeight:function(){var t=this.$newElement.clone();t.appendTo("body");var e=t.addClass("open").find(".dropdown-menu li > a").outerHeight();t.remove(),this.$newElement.data("liHeight",e)},setSize:function(){var e,i,n,s=this,o=this.$menu,l=o.find(".inner"),a=(l.find("li > a"),this.$newElement.outerHeight()),d=this.$newElement.data("liHeight"),h=o.find("li .divider").outerHeight(!0),r=parseInt(o.css("padding-top"))+parseInt(o.css("padding-bottom"))+parseInt(o.css("border-top-width"))+parseInt(o.css("border-bottom-width")),c=this.options.hideDisabled?":not(.disabled)":"",p=t(window),u=r+parseInt(o.css("margin-top"))+parseInt(o.css("margin-bottom"))+2,m=function(){i=s.$newElement.offset().top-p.scrollTop(),n=p.height()-i-a};if(m(),"auto"==this.options.size){var f=function(){var t;m(),e=n-u,s.$newElement.toggleClass("dropup",i>n&&e-u<o.height()&&s.options.dropupAuto),s.$newElement.hasClass("dropup")&&(e=i-u),t=o.find("li").length+o.find("dt").length>3?3*d+u-2:0,o.css({"max-height":e+"px",overflow:"hidden","min-height":t+"px"}),l.css({"max-height":e-r+"px","overflow-y":"auto","min-height":t-r+"px"})};f(),t(window).resize(f),t(window).scroll(f)}else if(this.options.size&&"auto"!=this.options.size&&o.find("li"+c).length>this.options.size){var v=o.find("li"+c+" > *").filter(":not(.div-contain)").slice(0,this.options.size).last().parent().index(),b=o.find("li").slice(0,v+1).find(".div-contain").length;e=d*this.options.size+b*h+r,this.$newElement.toggleClass("dropup",i>n&&e<o.height()&&this.options.dropupAuto),o.css({"max-height":e+"px",overflow:"hidden"}),l.css({"max-height":e-r+"px","overflow-y":"auto"})}},setWidth:function(){if("auto"==this.options.width){this.$menu.css("min-width","0");var t=this.$newElement.clone().appendTo("body"),e=t.find("> .dropdown-menu").css("width");t.remove(),this.$newElement.css("width",e)}else"fit"==this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width",""));this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement.removeClass("fit-width")},selectPosition:function(){var e,i,n=this,s=t("<div />"),o=function(t){s.addClass(t.attr("class")).toggleClass("dropup",t.hasClass("dropup")),e=t.offset(),i=t.hasClass("dropup")?0:t[0].offsetHeight,s.css({top:e.top+i,left:e.left,width:t[0].offsetWidth,position:"absolute"})};this.$newElement.on("click",function(e){o(t(this)),s.appendTo(n.options.container),s.toggleClass("open",!t(this).hasClass("open")),s.append(n.$menu)}),t(window).resize(function(){o(n.$newElement)}),t(window).on("scroll",function(t){o(n.$newElement)}),t("html").on("click",function(e){t(e.target).closest(n.$newElement).length<1&&s.removeClass("open")})},mobile:function(){this.$element.addClass("mobile-device").appendTo(this.$newElement),this.options.container&&this.$menu.hide()},refresh:function(){this.reloadLi(),this.render(),this.setWidth(),this.setStyle(),this.checkDisabled()},setSelected:function(t,e){this.$menu.find("li").eq(t).toggleClass("selected",e)},setDisabled:function(t,e){e?this.$menu.find("li").eq(t).addClass("disabled").find("a").attr("href","#").attr("tabindex",-1):this.$menu.find("li").eq(t).removeClass("disabled").find("a").removeAttr("href").attr("tabindex",0)},isDisabled:function(){return this.$element.is(":disabled")},checkDisabled:function(){var t=this;this.isDisabled()?(this.$button.addClass("disabled"),this.$button.attr("tabindex","-1")):this.$button.hasClass("disabled")&&(this.$button.removeClass("disabled"),this.$button.removeAttr("tabindex")),this.$button.click(function(){return!t.isDisabled()})},checkTabIndex:function(){if(this.$element.is("[tabindex]")){var t=this.$element.attr("tabindex");this.$button.attr("tabindex",t)}},clickListener:function(){var e=this;t("body").on("touchstart.dropdown",".dropdown-menu",function(t){t.stopPropagation()}),this.$newElement.on("click",function(){e.setSize()}),this.$menu.on("click","li a",function(i){var n=t(this).parent().index(),s=(t(this).parent(),e.$element.val());if(e.multiple&&i.stopPropagation(),i.preventDefault(),!e.isDisabled()&&!t(this).parent().hasClass("disabled")){var o=e.$element.find("option"),l=o.eq(n);if(e.multiple){var a=l.prop("selected");l.prop("selected",!a)}else o.prop("selected",!1),l.prop("selected",!0);e.$button.focus(),s!=e.$element.val()&&e.$element.change()}}),this.$menu.on("click","li.disabled a, li dt, li .div-contain",function(t){t.preventDefault(),t.stopPropagation(),e.$button.focus()}),this.$element.change(function(){e.render()})},val:function(t){return void 0!=t?(this.$element.val(t),this.$element.change(),this.$element):this.$element.val()},selectAll:function(){this.$element.find("option").prop("selected",!0).attr("selected","selected"),this.render()},deselectAll:function(){this.$element.find("option").prop("selected",!1).removeAttr("selected"),this.render()},keydown:function(e){var i,n,s,o,l,a,d,h,r,c;if(i=t(this),s=i.parent(),(c=s.data("this")).options.container&&(s=c.$menu),(n=t("[role=menu] li:not(.divider):visible a",s)).length){if(/(38|40)/.test(e.keyCode))o=n.index(n.filter(":focus")),a=n.parent(":not(.disabled)").first().index(),d=n.parent(":not(.disabled)").last().index(),l=n.eq(o).parent().nextAll(":not(.disabled)").eq(0).index(),h=n.eq(o).parent().prevAll(":not(.disabled)").eq(0).index(),r=n.eq(l).parent().prevAll(":not(.disabled)").eq(0).index(),38==e.keyCode&&(o!=r&&o>h&&(o=h),o<a&&(o=a)),40==e.keyCode&&(o!=r&&o<l&&(o=l),o>d&&(o=d),-1==o&&(o=0)),n.eq(o).focus();else{var p={48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"},u=[];n.each(function(){t(this).parent().is(":not(.disabled)")&&t.trim(t(this).text().toLowerCase()).substring(0,1)==p[e.keyCode]&&u.push(t(this).parent().index())});var m=t(document).data("keycount");m++,t(document).data("keycount",m),t.trim(t(":focus").text().toLowerCase()).substring(0,1)!=p[e.keyCode]?(m=1,t(document).data("keycount",m)):m>=u.length&&t(document).data("keycount",0),n.eq(u[m-1]).focus()}/(13|32)/.test(e.keyCode)&&(e.preventDefault(),t(":focus").click(),t(document).data("keycount",0))}},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},destroy:function(){this.$newElement.remove(),this.$element.remove()}},t.fn.selectpicker=function(i,n){var s,o=arguments,l=this.each(function(){if(t(this).is("select")){var l=t(this),a=l.data("selectpicker"),d="object"==typeof i&&i;if(a){if(d)for(var h in d)a.options[h]=d[h]}else l.data("selectpicker",a=new e(this,d,n));if("string"==typeof i){var r=i;a[r]instanceof Function?([].shift.apply(o),s=a[r].apply(a,o)):s=a.options[r]}}});return void 0!=s?s:l},t.fn.selectpicker.defaults={style:null,size:"auto",title:null,selectedTextFormat:"values",noneSelectedText:"Nothing selected",countSelectedText:"{0} of {1} selected",width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0},t(document).data("keycount",0).on("keydown","[data-toggle=dropdown], [role=menu]",e.prototype.keydown)}(window.jQuery);
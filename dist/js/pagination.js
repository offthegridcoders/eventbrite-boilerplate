function setPagination(a){function e(e){function n(){var a="/index.html?"+$.param(t),n=i.clone().addClass(e+"-page").html($("<i/>").addClass("fa fa-caret-"+e)).attr("href",a);PaginationElm.append(n)}var t=jQuery.extend(!0,{},params);"left"==e&&1!=t.page&&(t.page=a.page_number-1,n()),"right"==e&&a.page_number!=a.page_count&&(t.page=a.page_number+1,n())}function n(e){function n(){var a="/index.html?"+$.param(t),n=i.clone().addClass(e+"-elipsis").text("...").attr("href",a);PaginationElm.append(n)}var t=jQuery.extend(!0,{},params);"left"==e&&t.page>o-4&&(t.page=a.page_number-10,n()),"right"==e&&t.page<a.page_count-4&&(t.page=a.page_number+10,t.page>=a.page_count&&(t.page=s+1),n())}function t(){var e;if(1==a.page_number)e=g.clone().text("1").addClass("first-page");else{e=i.clone();var n=jQuery.extend(!0,{},params);n.page=1;var t="/index.html?"+$.param(n);byLocation&&(t+="&location.address="+byLocation),e.text(1).attr("href",t).addClass("first-page")}PaginationElm.append(e)}function r(){for(var e=l;s>=e;e++){if(tmpParams=jQuery.extend(!0,{},params),tmpParams.page=e,a.page_number!=e){t=i.clone();var n="/index.html?"+$.param(tmpParams);byLocation&&(n+="&location.address="+byLocation),t.text(e).attr("href",n)}else{var t=g.clone();t.text(e)}PaginationElm.append(t)}}function p(){var e=jQuery.extend(!0,{},params);e.page=a.page_count;var n="/index.html?"+$.param(e);byLocation&&(n+="&location.address="+byLocation),a.page_number==a.page_count?newpage=g.clone().text(a.page_count).addClass("last-page"):(newpage=i.clone(),newpage.text(a.page_count).attr("href",n).addClass("last-page")),PaginationElm.append(newpage)}PaginationElm.empty();var i=$("<a/>").addClass("page-number"),g=$("<span/>").addClass("page-number current-page"),o=(i.clone().html($("<i/>").addClass("fa fa-caret-right")).attr("src","index.html?less"),9),l=a.page_number-Math.round((o-3)/2);if(1>=l&&(l=2),l+(o-3)>=a.page_count){var s=a.page_count-1;l=a.page_count-(o-1)}else var s=l+(o-3);e("left"),t(),n("left"),r(),n("right"),p(),e("right"),PaginationElm.append(),PaginationElm.show()}var PaginationElm=$("#pagination");PaginationElm.hide();
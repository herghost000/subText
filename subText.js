! function(e) {
    if("object" == typeof exports && "undefined" != typeof module) {
        module.exports = e($ || jQuery, global);
    } else if("function" == typeof define && define.amd) {
        define(["jquery"], e);
    } else {
        var f;
        "undefined" != typeof window ? f = window :
            "undefined" != typeof global ? f = global :
                "undefined" != typeof self && (f = self), e($ || jQuery, f)
    }
}(function($, global) {
    window = "undefined" == typeof global ? window : global;
    var retarr = [],
        outereg = /(<(:?.|\s)*?>)((?:.|\s)*)(<\/(:?.|\s)*?>)/im,
        closereg = /<(img|input)[\s\S]*\/?>/im,
        maxlen,
        endtext;

    function abtainText(node) {
        var df = document.createDocumentFragment(),child;
        while(child = node.firstChild) {
            looptext(child);
            df.appendChild(child);
        }
        return retarr.join("");
    }
    function NodeType() {};
    NodeType.El = 1;NodeType.TEXT = 3;
    looptext.isfor = true;looptext.iselp = false;
    function looptext(node) {
        if(node.nodeType === NodeType.El) {
            var ctag = closereg.exec(node.outerHTML);
            if(ctag) {
                var tmt = ctag[0].trim();
                var st = tmt.substring(0, tmt.length - 1);
                var et = ' />';
                retarr.push(st + et);
                maxlen--;
                return void(0);
            }
            var otag = outereg.exec(node.outerHTML);
            if(maxlen == 0) {
                if(looptext.iselp == false) {
                    retarr.push(endtext);
                    looptext.iselp = true
                }
                return void 0;
            }
            retarr.push(otag[1].trim())
            for(var i = 0; i < node.childNodes.length; i++) {
                if(looptext.isfor) {
                    looptext(node.childNodes[i]);
                } else {
                    break;
                }
            }
            retarr.push(otag[3].trim());
        }
        if(node.nodeType === NodeType.TEXT) {
            var nodeval = node.nodeValue.trim();
            if(nodeval.length == 0) {
                return void 0
            }
            if(nodeval.length > maxlen) {
                if(looptext.iselp == false) {
                    var tpval = [nodeval.substr(0, maxlen), endtext].join("");
                    looptext.iselp = true
                } else {
                    var tpval = [nodeval.substr(0, maxlen)].join("");
                }
                retarr.push(tpval);
                looptext.isfor = false;
                maxlen = 0;
            }
            if(nodeval.length == maxlen) {
                if(looptext.iselp == false) {
                    var tpval = [nodeval.substr(0, maxlen), endtext].join("");
                    looptext.iselp = true
                } else {
                    var tpval = [nodeval.substr(0, maxlen)].join("");
                }
                retarr.push(tpval);
                maxlen = 0;
            }
            if(nodeval.length < maxlen) {
                maxlen -= nodeval.length
                retarr.push(nodeval);
            }
        }
    }
    $.fn.subHtml = function(length, text) {
        var ret = [],
            outermatch,
            html;
        $(this).each(function(index, item) {
            endtext = text || "",
                maxlen = length,
                retarr = [],
                looptext.isfor = true,
                looptext.iselp = false,
                outermatch = outereg.exec(item.outerHTML),
                html = abtainText(item),
                $(item).append(html),
                ret.push([outermatch[1], html, outermatch[3]].join(""));
        });
        return ret
    }
})
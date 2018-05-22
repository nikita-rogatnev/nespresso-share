/*!
 * Validetta (http://lab.hasanaydogdu.com/validetta/)
 * Version 1.0.1 ( 16-08-2015 )
 * Licensed under MIT (https://github.com/hsnayd/validetta/blob/master/LICENCE)
 * Copyright 2013-2015 Hasan AydoДџdu - http://www.hasanaydogdu.com
 */
!function (a) {
    "use strict";
    var b = {}, c = {},
        d = new RegExp(/^(minChecked|maxChecked|minSelected|maxSelected|minLength|maxLength|equalTo|different|regExp|remote|callback)\[(\w{1,15})\]/i),
        e = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),
        f = new RegExp(/^[\-\+]?(\d+|\d+\.?\d+)$/), g = {
            required: "This field is required. Please be sure to check.",
            email: "Your E-mail address appears to be invalid. Please be sure to check.",
            number: "You can enter only numbers in this field.",
            maxLength: "Maximum {count} characters allowed!",
            minLength: "Minimum {count} characters allowed!",
            maxChecked: "Maximum {count} options allowed. Please be sure to check.",
            minChecked: "Please select minimum {count} options.",
            maxSelected: "Maximum {count} selection allowed. Please be sure to check.",
            minSelected: "Minimum {count} selection allowed. Please be sure to check.",
            notEqual: "Fields do not match. Please be sure to check.",
            different: "Fields cannot be the same as each other",
            creditCard: "Invalid credit card number. Please be sure to check."
        }, h = {
            showErrorMessages: !0,
            display: "bubble",
            errorTemplateClass: "validetta-bubble",
            errorClass: "validetta-error",
            validClass: "validetta-valid",
            bubblePosition: "right",
            bubbleGapLeft: 15,
            bubbleGapTop: 0,
            realTime: !1,
            onValid: function () {
            },
            onError: function () {
            },
            validators: {}
        }, i = function (a) {
            return "string" == typeof a ? a.replace(/^\s+|\s+$/g, "") : a
        }, j = {
            required: function (a, b) {
                switch (a.el.type) {
                    case"checkbox":
                        return a.el.checked || g.required;
                    case"radio":
                        return this.radio.call(b, a.el) || g.required;
                    case"select-multiple":
                        return null !== a.val || g.required;
                    default:
                        return "" !== a.val || g.required
                }
            }, email: function (a) {
                return e.test(a.val) || g.email
            }, number: function (a) {
                return f.test(a.val) || g.number
            }, minLength: function (a) {
                var b = a.val.length;
                return 0 === b || b >= a.arg || g.minLength.replace("{count}", a.arg)
            }, maxLength: function (a) {
                return a.val.length <= a.arg || g.maxLength.replace("{count}", a.arg)
            }, equalTo: function (a, b) {
                return b.form.querySelector('input[name="' + a.arg + '"]').value === a.val || g.notEqual
            }, different: function (a, b) {
                return b.form.querySelector('input[name="' + a.arg + '"]').value !== a.val || g.different
            }, creditCard: function (a) {
                if ("" === a.val) return !0;
                var b, c, d, e, f, h, i, j = 0;
                if (b = new RegExp(/[^0-9]+/g), c = a.val.replace(b, ""), i = c.length, 16 > i) return g.creditCard;
                for (f = 0; i > f; f++) d = i - f, e = parseInt(c.substring(d - 1, d), 10), f % 2 === 1 ? (h = 2 * e, h > 9 && (h = 1 + (h - 10))) : h = e, j += h;
                return j > 0 && j % 10 === 0 ? !0 : g.creditCard
            }, maxChecked: function (b, c) {
                var d = a(c.form.querySelectorAll('input[type=checkbox][name="' + b.el.name + '"]'));
                if (0 === d.index(b.el)) {
                    var e = d.filter(":checked").length;
                    if (0 !== e) return e <= b.arg || g.maxChecked.replace("{count}", b.arg)
                }
            }, minChecked: function (b, c) {
                var d = a(c.form.querySelectorAll('input[type=checkbox][name="' + b.el.name + '"]'));
                if (0 === d.index(b.el)) {
                    var e = d.filter(":checked").length;
                    return e >= b.arg || g.minChecked.replace("{count}", b.arg)
                }
            }, maxSelected: function (a) {
                return null !== a.val ? a.val.length <= a.arg || g.maxSelected.replace("{count}", a.arg) : void 0
            }, minSelected: function (a) {
                return null !== a.val && a.val.length >= a.arg || g.minSelected.replace("{count}", a.arg)
            }, radio: function (a) {
                var b = this.form.querySelectorAll('input[type=radio][name="' + a.name + '"]:checked').length;
                return 1 === b
            }, regExp: function (a, b) {
                var c = b.options.validators.regExp[a.arg], d = new RegExp(c.pattern);
                return d.test(a.val) || c.errorMessage
            }, remote: function (a) {
                a.remote = a.arg
            }, callback: function (a, b) {
                var c = b.options.validators.callback[a.arg];
                return c.callback(a.el, a.val) || c.errorMessage
            }
        };
    b = function (b, c) {
        this.handler = !1, this.options = a.extend(!0, {}, h, c), this.form = b, this.xhr = {}, this.events()
    }, b.prototype = {
        constructor: b, events: function () {
            var b = this;
            a(this.form).submit(function (a) {
                return c = this.querySelectorAll("[data-validetta]"), b.init(a)
            }), this.options.realTime === !0 && (a(this.form).find("[data-validetta]").not("[type=checkbox]").on("change", function (d) {
                return c = a(this), b.init(d)
            }), a(this.form).find("[data-validetta][type=checkbox]").on("click", function (a) {
                return c = b.form.querySelectorAll('[data-validetta][type=checkbox][name="' + this.name + '"]'), b.init(a)
            })), a(this.form).on("reset", function () {
                return a(b.form.querySelectorAll("." + b.options.errorClass + ", ." + b.options.validClass)).removeClass(b.options.errorClass + " " + b.options.validClass), b.reset()
            })
        }, init: function (a) {
            return this.reset(c), this.checkFields(a), "submit" !== a.type ? void 0 : "pending" === this.handler ? !1 : this.handler === !0 ? (this.options.onError.call(this, a), !1) : this.options.onValid.call(this, a)
        }, checkFields: function (b) {
            var e = this, f = [];
            this.getInvalidFields = function () {
                return f
            };
            for (var g = 0, h = c.length; h > g; g++) if (!c[g].disabled) {
                var k, l = c[g], m = "", n = i(a(l).val()), o = l.getAttribute("data-validetta").split(",");
                this.tmp = {}, this.tmp = {el: l, val: n, parent: this.parents(l)};
                for (var p = 0, q = o.length; q > p; p++) {
                    var r, s = o[p].match(d);
                    if (null !== s ? ("undefined" != typeof s[2] && (this.tmp.arg = s[2]), r = s[1]) : r = o[p], ("" !== n || "required" === r || "equalTo" === r) && j.hasOwnProperty(r) && (k = j[r](e.tmp, e), "undefined" != typeof k && k !== !0)) {
                        var t = l.getAttribute("data-vd-message-" + r);
                        null !== t && (k = t), m += k + "<br/>"
                    }
                }
                "" !== m ? (f.push({
                    field: l,
                    errors: m
                }), this.addErrorClass(this.tmp.parent), this.window.open.call(this, l, m)) : "undefined" != typeof this.tmp.remote ? this.checkRemote(l, b) : ("undefined" != typeof k ? this.addValidClass(this.tmp.parent) : a(this.tmp.parent).removeClass(this.options.errorClass + " " + this.options.validClass), k = void 0)
            }
        }, checkRemote: function (b, c) {
            var d = {}, e = {}, f = b.name || b.id;
            "undefined" == typeof this.remoteCache && (this.remoteCache = {}), e[f] = this.tmp.val, d = a.extend(!0, {}, {data: e}, this.options.validators.remote[this.tmp.remote] || {});
            var g = a.param(d), h = this.remoteCache[g];
            if ("undefined" != typeof h) switch (h.state) {
                case"pending":
                    this.handler = "pending", h.event = c.type;
                    break;
                case"rejected":
                    throw c.preventDefault(), new Error(h.result.message);
                case"resolved":
                    h.result.valid === !1 ? (this.addErrorClass(this.tmp.parent), this.window.open.call(this, b, h.result.message)) : this.addValidClass(this.tmp.parent)
            } else {
                var i = this.xhr[f];
                "undefined" != typeof i && "pending" === i.state() && i.abort(), h = this.remoteCache[g] = {
                    state: "pending",
                    event: c.type
                }, this.remoteRequest(d, h, b, f)
            }
        }, remoteRequest: function (b, c, d, e, f) {
            var g = this;
            a(this.tmp.parent).addClass("validetta-pending"), this.xhr[e] = a.ajax(b).done(function (b) {
                "object" != typeof b && (b = JSON.parse(b)), c.state = "resolved", c.result = b, "submit" === c.event ? (g.handler = !1, a(g.form).trigger("submit")) : b.valid === !1 ? (g.addErrorClass(g.tmp.parent), g.window.open.call(g, d, b.message)) : g.addValidClass(g.tmp.parent)
            }).fail(function (a, b) {
                if ("abort" !== b) {
                    var d = "Ajax request failed for field (" + e + ") : " + a.status + " " + a.statusText;
                    throw c.state = "rejected", c.result = {valid: !1, message: d}, new Error(d)
                }
            }).always(function (b) {
                a(g.tmp.parent).removeClass("validetta-pending")
            }), this.handler = "pending"
        }, window: {
            open: function (b, c) {
                if (!this.options.showErrorMessages) return void(this.handler = !0);
                var d = this.parents(b);
                if ("undefined" == typeof d && (d = b[0].parentNode), !d.querySelectorAll("." + this.options.errorTemplateClass).length) {
                    var e = document.createElement("span");
                    if (e.className = this.options.errorTemplateClass + " " + this.options.errorTemplateClass + "--" + this.options.bubblePosition, "bubble" === this.options.display) {
                        var f, g = 0, h = 0;
                        f = a(b).position(), "bottom" === this.options.bubblePosition ? h = b.offsetHeight : g = b.offsetWidth, e.innerHTML = "", e.style.top = f.top + h + this.options.bubbleGapTop + "px", e.style.left = f.left + g + this.options.bubbleGapLeft + "px"
                    }
                    d.appendChild(e), e.innerHTML = c, this.handler = !0
                }
            }, close: function (a) {
                a.parentNode.removeChild(a)
            }
        }, reset: function (a) {
            var b = {};
            b = "undefined" == typeof a || a.length > 1 && "checkbox" !== a[0].type ? this.form.querySelectorAll("." + this.options.errorTemplateClass) : this.parents(a[0]).querySelectorAll("." + this.options.errorTemplateClass);
            for (var c = 0, d = b.length; d > c; c++) this.window.close.call(this, b[c]);
            this.handler = !1
        }, addErrorClass: function (b) {
            a(b).removeClass(this.options.validClass).addClass(this.options.errorClass)
        }, addValidClass: function (b) {
            a(b).removeClass(this.options.errorClass).addClass(this.options.validClass)
        }, parents: function (a) {
            for (var b = parseInt(a.getAttribute("data-vd-parent-up"), 10) || 0, c = 0; b >= c; c++) a = a.parentNode;
            return a
        }
    }, a.fn.validetta = function (c, d) {
        return a.validettaLanguage && (g = a.extend(!0, {}, g, a.validettaLanguage.messages)), "undefined" != typeof d && (g = a.extend(!0, {}, g, d)), this.each(function () {
            new b(this, c)
        })
    }
}(jQuery);

(function ($) {
    $.fn.validettaLanguage = {};
    $.validettaLanguage = {
        init: function () {
            $.validettaLanguage.messages = {
                required: 'Это поле обязательно к заполнению. Пожалуйста, проверьте правильно ли заполнено поле.',
                email: 'Ваш адрес электронной почты является недопустимым. Пожалуйста, проверьте правильно ли заполнено поле.',
                number: 'Можно ввести только цифры в это поле.',
                maxLength: '{count} - максимально допустимое число символов.',
                minLength: '{count} - минимальное допустимое число символов.',
                maxChecked: 'Максимально допустимое количество опций - {count}. Пожалуйста, проверьте правильно ли заполнено поле.',
                minChecked: 'Пожалуйста выберите минимум {count} опций.',
                maxSelected: 'Максимум можно выделить {count}. Пожалуйста, проверьте правильно ли заполнено поле.',
                minSelected: 'Минимум можно выделить {count}. Пожалуйста, проверьте правильно ли заполнено поле.',
                notEqual: 'Поля не совпадают. Пожалуйста, проверьте правильно ли заполнено поле.',
                different: 'Содержимое полей не может совпадать.',
                creditCard: 'Неверный номер кредитной карты. Пожалуйста, проверьте правильно ли заполнено поле.'
            };
        }
    };
    $.validettaLanguage.init();
})(jQuery);

JSShare = {
    /**
     * JS-Share - vanilla javascript social networks and messengers sharing
     * https://github.com/delfimov/JS-Share
     *
     * Copyright (c) 2017 by Dmitry Elfimov
     * Released under the MIT License.
     * http://www.opensource.org/licenses/mit-license.php
     *
     * Minimum setup example:
     *
     <div>Share:
     <button class="social_share" data-type="vk">VK.com</button>
     <button class="social_share" data-type="fb">Facebook</button>
     <button class="social_share" data-type="tw">Twitter</button>
     <button class="social_share" data-type="lj">LiveJournal</button>
     <button class="social_share" data-type="ok">ok.ru</button>
     <button class="social_share" data-type="mr">Mail.Ru</button>
     <button class="social_share" data-type="gg">Google+</button>
     <button class="social_share" data-type="telegram">Telegram</button>
     <button class="social_share" data-type="whatsapp">Whatsapp</button>
     <button class="social_share" data-type="viber">Viber</button>
     <button class="social_share" data-type="email">Email</button>
     </div>
     $(document).on('click', '.social_share', function(){
        return JSShare.go(this);
    });
     *
     * Inline example:
     *
     <a href="#" onclick="return JSShare.go(this)" data-type="fb" data-fb-api-id="123">I like it</a>
     *
     * @param element Object - DOM element
     * @param options Object - optional
     */
    go: function (element, options) {
        var self = JSShare,
            withoutPopup = [
                'unknown',
                'viber',
                'telegram',
                'whatsapp',
                'email'
            ],
            tryLocation = true, // should we try to redirect user to share link
            link,
            defaultOptions = {
                type: 'vk',           // share type
                fb_api_id: '',             // Facebook API id
                url: '',             // url to share
                title: document.title, // title to share
                image: '',             // image to share
                text: '',             // text to share
                utm_source: '',
                utm_medium: '',
                utm_campaign: '',
                popup_width: 626,
                popup_height: 436
            };

        options = self._extend(
            defaultOptions,                         // default options - low priority
            self._getData(element, defaultOptions), // options from data-* attributes
            options                                 // options from method call - highest proprity
        );

        if (typeof self[options.type] == 'undefined') {
            options.type = 'unknown'
        }

        link = self[options.type](options);

        if (withoutPopup.indexOf(options.type) == -1) {        // if we must try to open a popup window
            tryLocation = self._popup(link, options) === null; // we try, and if we succeed, we will not redirect user to share link location
        }

        if (tryLocation) {                                          // ...otherwise:
            if (element.tagName == 'A' && element.tagName == 'a') { // if element is <a> tag
                element.setAttribute('href', link);                 // set attribute href
                return true;                                        // and return true, so this tag will behave as a usual link
            } else {
                location.href = link;                               // if it's not <a> tag, change location to redirect
                return false;
            }
        } else {
            return false;
        }
    },

    unknown: function (options) {
        return encodeURIComponent(JSShare._getURL(options));
    },

    // vk.com - ВКонтакте
    vk: function (options) {
        return 'http://vkontakte.ru/share.php?'
            + 'url=' + encodeURIComponent(JSShare._getURL(options))
            + '&title=' + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&image=' + encodeURIComponent(options.image)
            + '&noparse=true';
    },

    // ok.ru - Одноклассники
    ok: function (options) {
        return 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'
            + '&st.comments=' + encodeURIComponent(options.text)
            + '&st._surl=' + encodeURIComponent(JSShare._getURL(options));
    },

    // Facebook
    fb: function (options) {
        var url = JSShare._getURL(options);
        return 'https://www.facebook.com/dialog/share?'
            + 'app_id=' + options.fb_api_id
            + '&display=popup'
            + '&href=' + encodeURIComponent(url)
            + '&redirect_uri=' + encodeURIComponent(url);
    },

    // Livejournal
    lj: function (options) {
        return 'http://livejournal.com/update.bml?'
            + 'subject=' + encodeURIComponent(options.title)
            + '&event=' + encodeURIComponent(options.text + '<br/><a href="' + JSShare._getURL(options) + '">' + options.title + '</a>')
            + '&transform=1';
    },

    // Twitter
    tw: function (options) {
        var url = JSShare._getURL(options);
        return 'http://twitter.com/share?'
            + 'text=' + encodeURIComponent(options.title)
            + '&url=' + encodeURIComponent(url)
            + '&counturl=' + encodeURIComponent(url);
    },

    // Mail.ru
    mailru: function (options) {
        return 'http://connect.mail.ru/share?'
            + 'url=' + encodeURIComponent(JSShare._getURL(options))
            + '&title=' + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&imageurl=' + encodeURIComponent(options.image);
    },


    // Google+
    gplus: function (options) {
        return 'https://plus.google.com/share?url='
            + encodeURIComponent(JSShare._getURL(options));
    },

    telegram: function (options) {
        return 'tg://msg_url?url=' + encodeURIComponent(JSShare._getURL(options));
    },

    whatsapp: function (options) {
        return 'whatsapp://send?text=' + encodeURIComponent(JSShare._getURL(options));
    },

    viber: function (options) {
        return 'viber://forward?text=' + encodeURIComponent(JSShare._getURL(options));
    },

    email: function (options) {
        return 'mailto:?'
            + 'subject=' + encodeURIComponent(options.title)
            + '&body=' + encodeURIComponent(JSShare._getURL(options))
            + encodeURIComponent("\n" + options.text);
    },

    _getURL: function (options) {
        if (options.url == '') {
            options.url = location.href;
        }
        var url = options.url,
            utm = '';
        if (options.utm_source != '') {
            utm += '&utm_source=' + options.utm_source;
        }
        if (options.utm_medium != '') {
            utm += '&utm_medium=' + options.utm_medium;
        }
        if (options.utm_campaign != '') {
            utm += '&utm_campaign=' + options.utm_campaign;
        }
        if (utm != '') {
            url = url + '?' + utm;
        }
        return url;
    },

    // Open popup window for sharing
    _popup: function (url, _options) {
        return window.open(url, '', 'toolbar=0,status=0,scrollbars=1,width=' + _options.popup_width + ',height=' + _options.popup_height);
    },

    /**
     * Object Extending Functionality
     */
    _extend: function (out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }
        return out;
    },

    /**
     * Get data-attributes
     */
    _getData: function (el, defaultOptions) {
        var data = {};
        for (var key in defaultOptions) {
            var value = el.getAttribute('data-' + key);
            if (value !== null && typeof value != 'undefined') {
                data[key] = value;
            }
        }
        return data;
    }
};

$(document).ready(function () {
    $(".slider .slider__slide").click(function (e) {
        e.preventDefault();

        $(".slider .slider__slide").removeClass('slider__slide--active');
        $(this).addClass('slider__slide--active');
    });

    $(".slider__button--left").click(function (e) {
        e.preventDefault();

        $(".slider .slider__slide--active:not(:first-child)").removeClass('slider__slide--active').prev().addClass("slider__slide--active");
    });

    $(".slider__button--right").click(function (e) {
        e.preventDefault();

        $(".slider .slider__slide--active:not(:last-child)").removeClass('slider__slide--active').next().addClass("slider__slide--active");
    });


    $(".slider .slider__slidesss").click(function (e) {
        e.preventDefault();

        var slideId = $('.center .slider__slide').attr('id');
        $(location).attr('href', slideId + '.html');
    });

    $(".modal__close").click(function (e) {
        e.preventDefault();
        $(".modal, .form, .final").addClass('is-hidden');
        $(".slider").removeClass('is-modal is-hidden');
        $(".intro").removeClass('is-blur');
    });
});

function submitAndShare() {
    $('#form').validetta({
        showErrorMessages: true,
        display: 'bubble',
        errorTemplateClass: 'validetta-bubble',
        realTime: true,
        bubblePosition: 'right',
        bubbleGapLeft: 15,
        bubbleGapTop: 0,
        onValid: function (event) {
            event.preventDefault();

            $(".form").addClass('is-hidden');
            $(".final").removeClass('is-hidden');

            return true;
        },
        onError: function (event) {
            event.preventDefault();
        }
    });

    var userName = $('#name').val();
    var slideId = window.location.pathname.replace(".html", "");
    slideId = slideId.replace("/", "");
    console.log(slideId);

    if ($('#form').validetta(true)) {
        var buttons = document.querySelectorAll(".social_share");

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                return JSShare.go(this);
            }, false);
        }
    }
}
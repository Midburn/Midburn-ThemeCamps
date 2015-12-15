//
// Forms logic
//

var InitFormLogic = {

    rightSideMenu: function () {
        var HelpPanel = $(".HelpPanelWrapper");
        var Toggled = false;
        $(".flagIcon.flagIconHebrew").on('click', function () {

            // Set sideMenu visible
            if (!Toggled) {
                HelpPanel.css('visibility', 'visible');
                Toggled = true;
            }
            else {
                HelpPanel.css('visibility', 'hidden');
                Toggled = false;
            }
        });

        /// Todo: remove after production;
        HelpPanel.css('visibility', 'visible');
    },


    campStatusSelect: function () {
        $("#campStatusAccept").on('click', function () {
            $("#campStatusSelect").html('<i class="iconLightGreen"></i> Accept New Members <span class="caret"><i class="arrow-down"></i></span>');
        });
        $("#campStatusClose").on('click', function () {
            $("#campStatusSelect").html('<i class="iconLightOrange"></i> Close To New Members <span class="caret"><i class="arrow-down"></i></span>');
        });
        $("#campStatusInactive").on('click', function () {
            $("#campStatusSelect").html('<i class="iconLightRed"></i> Inactive <span class="caret"><i class="arrow-down"></i></span>');
        });
    },

    bt_switch_init: function () {

        (function () {
            var $confirm;

            $confirm = null;

            $(function () {
                var $createDestroy, $window, sectionTop;
                $window = $(window);
                sectionTop = $(".top").outerHeight() + 20;
                $createDestroy = $("#switch-create-destroy");
                hljs.initHighlightingOnLoad();
                $("a[href*=\"#\"]").on("click", function (event) {
                    var $target;
                    event.preventDefault();
                    $target = $($(this).attr("href").slice("#"));
                    if ($target.length) {
                        return $window.scrollTop($target.offset().top - sectionTop);
                    }
                });
                $("input[type=\"checkbox\"], input[type=\"radio\"]").not("[data-switch-no-init]").bootstrapSwitch();
                $("[data-switch-get]").on("click", function () {
                    var type;
                    type = $(this).data("switch-get");
                    return alert($("#switch-" + type).bootstrapSwitch(type));
                });
                $("[data-switch-set]").on("click", function () {
                    var type;
                    type = $(this).data("switch-set");
                    return $("#switch-" + type).bootstrapSwitch(type, $(this).data("switch-value"));
                });
                $("[data-switch-toggle]").on("click", function () {
                    var type;
                    type = $(this).data("switch-toggle");
                    return $("#switch-" + type).bootstrapSwitch("toggle" + type.charAt(0).toUpperCase() + type.slice(1));
                });
                $("[data-switch-set-value]").on("input", function (event) {
                    var type, value;
                    event.preventDefault();
                    type = $(this).data("switch-set-value");
                    value = $.trim($(this).val());
                    if ($(this).data("value") === value) {
                        return;
                    }
                    return $("#switch-" + type).bootstrapSwitch(type, value);
                });
                $("[data-switch-create-destroy]").on("click", function () {
                    var isSwitch;
                    isSwitch = $createDestroy.data("bootstrap-switch");
                    $createDestroy.bootstrapSwitch((isSwitch ? "destroy" : null));
                    return $(this).button((isSwitch ? "reset" : "destroy"));
                });
                return $confirm = $("#confirm").bootstrapSwitch({
                    size: "large",
                    onSwitchChange: function (event, state) {
                        event.preventDefault();
                        return console.log(state, event.isDefaultPrevented());
                    }
                });
            });

        }).call(this);
    }
};

function InitAll() {
    InitFormLogic.campStatusSelect();
    InitFormLogic.rightSideMenu();
}
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
    }
};

function InitAll() {
    InitFormLogic.campStatusSelect();
    InitFormLogic.rightSideMenu();
}
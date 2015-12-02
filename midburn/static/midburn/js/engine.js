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
                HelpPanel.css('height', '100%').css('visibility', 'visible');
                Toggled = true;
            }
            else {
                HelpPanel.css('height', '0px').css('visibility', 'hidden');
                Toggled = false;
            }
        });

        /// Todo: remove after production;
        HelpPanel.css('height', '100%').css('visibility', 'visible');

    },


    campStatusSelect: function () {
        $("#campStatusActive").on('click', function () {
            $("#campStatusSelect").html('<i class="iconLightGreen"></i> Active');
        });
        $("#campStatusInactive").on('click', function () {
            $("#campStatusSelect").html('<i class="iconLightRed"></i> Inactive');
        });
    }
};

function InitAll() {
    InitFormLogic.campStatusSelect();
    InitFormLogic.rightSideMenu();
}
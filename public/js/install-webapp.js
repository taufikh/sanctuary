/**
 * This module performs mobile browser detection and triggers an
 * "installation" event to deliver a UI prompting a native-like
 * installation procedure.
 *
 * @license GPL-3.0
 */

/**
 * Installer module.
 */
var S5S_INSTALLER = (function () {

    /**
     * The detected platform.
     */
    var system;

    /**
     * Whether or not we've already been installed.
     */
    var installed;

    var detectSystem = function () {
        if (detectMobileSafari()) {
            return 'ios';
        }
    };

    var detectMobileSafari = function () {
        return 'standalone' in window.navigator;
    };

    var isInstalled = function () {
        switch (system) {
            case 'ios':
                return window.navigator.standalone;
        }
    };

    var injectHtml = function () {
        jQuery('body').append('<div id="installer-container"><button id="install-webapp-btn"></button></div>');
        jQuery('#install-webapp-btn').attr({
            'data-toggle' : 'popover',
            'data-trigger': 'focus',
            'data-placement': 'top',
            'data-html': true,
            'data-content': 'Install Sanctuary by tapping here, then on "Add to home screen."',
            'title': 'Install Sanctuary'
                + '<button id="dismiss-installer-btn" class="btn btn-sm btn-primary">Dismiss &times;</button>'
        });
        jQuery('#dismiss-installer-btn').on('click', function () {
            jQuery('#install-webapp-btn').popover('hide');
        });
    };

    var install = function () {
        // Initialize popovers.
        jQuery('[data-toggle="popover"]').popover()
        switch (system) {
            case 'ios':
                return install_ios();
        }
    };

    var install_ios = function () {
        jQuery('#install-webapp-btn').popover('show');
        jQuery('#dismiss-installer-btn').on('click', function () {
            jQuery('#install-webapp-btn').popover('hide');
        });

    };

    var init = function () {
        system = detectSystem();
        installed = isInstalled();
        if (!installed && system) {
            injectHtml();
            install();
        }
    };

    return {
        'init': init
    };

})();

jQuery(document).ready(function () {
    S5S_INSTALLER.init();
});

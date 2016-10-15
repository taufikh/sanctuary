var S5S_FORM = (function(){
    var init = function () {
        $('#show-form').click(function(){
            $('form.form-horizontal').toggleClass('visible');
            $('#show-form').toggleClass('high');
            $('#show-form').html($('#show-form').text() == "+"
                ? "-"
                : "+"
            );
        });
    }
    return {
        'init': init
    }
})();

S5S_FORM.init();

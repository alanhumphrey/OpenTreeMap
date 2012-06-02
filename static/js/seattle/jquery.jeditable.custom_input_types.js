/*
 * Custom input types for jeditable.
 *
 * Assumes jeditable has been loaded.
 */
 
$.editable.addInputType('datepicker', {
    /* create input element */
    element : function(settings, original) {
        var input = $('<input>');
        input.attr('autocomplete','off');
        $(this).append(input);
        return(input);
    },
    /* attach 3rd party plugin to input element */
    plugin : function(settings, original) {
        settings.onblur = function() {
            //capture month/year changes
        };
        var form = this;
        var input = $(this).find('input');
        $(input)
                .datepicker( { dateFormat: 'yy-mm-dd',
                            maxDate: '0d',
                            defaultDate: new Date( $(input).val() ),
                            changeMonth: true,
                            changeYear: true,
                            onSelect: function(date_text) {
                                $(form).trigger('submit');
                            },
                            }
                );
    }
});

$.editable.addInputType("autocomplete_species", {
    element: function(settings, original) {
        var select = $("<select>"),
        input = $("<input type='hidden' /><br/>");
        this.append(select)
            .append(input);
        return (input);
    },
    content: function( string, settings, original ) {
        var select = this.find('select'),
        selected = "",
        current = "[" + original.revert + "]"; // put brackets around the name to avoid overlap ( e.g. prunus vs.prunus pungens)
        $.each( string, function ( key, value ) {
            select.append( $("<option>").val(key).append(value) );
            if ( value.indexOf( current ) > -1 ) {
                selected = key;
            }            
        });
        if ( selected ) {
            select.val(selected);
        }
    },
    plugin: function( settings, original ) {
        this.find('select').combobox();
    },
    submit: function( settings, original ){
        $("input", this).val( $("select", this).val() );
    }
});
$.editable.addInputType('feetinches', {
    element : function(settings, original) {       
        var footselect = $('<select id="feet_">');
        var inchselect  = $('<select id="inches_">');
        $(this).addClass("controls");
        
        for (var foot=1; foot <= 15; foot++) {
            var option = $('<option>').val(foot).append(foot);
            footselect.append(option);
        }
        var option = $('<option>').val(99).append('15+');
        footselect.append(option);
        $(this).append(footselect);

        for (var inch=0; inch <= 11; inch++) {
            var option = $('<option>').val(inch).append(inch);
            inchselect.append(option);
        }
        $(this).append(inchselect);
            
        $(this).find("#feet_").button_dropdown({appended_text: "ft"});
        $(this).find("#inches_").button_dropdown({appended_text: "in"});
        
        /* Hidden input to store value which is submitted to server. */
        var hidden = $('<input type="hidden"><br/>');
        $(this).append(hidden);
        return(hidden);
    },
    submit: function (settings, original) {
        var vfeet = parseFloat($("#feet_").val());
        var vinch = parseFloat($("#inches_").val());
        var value = vfeet + (vinch / 12)
        if (vfeet == 99) {
            $("input", this).val(vfeet);
        }
        else {
            $("input", this).val(Math.round(value*100)/100);
        }
    },
    content : function(string, settings, original) {
        var pieces = parseFloat(string);
        var ft = Math.floor(pieces);
        var inch = Math.round((pieces - ft) * 12);
        
        $("#feet_", this).children().each(function() {
            if (ft == $(this).val()) {
                $(this).attr('selected', 'selected');
            }
        })
        .end()
        .next()
        .find('.dropdown-toggle')
        .text(ft + ' ft ')
        .append("<span class='caret'></span>");
        
        $("#inches_", this).children().each(function() {
            if (inch == $(this).val()) {
                $(this).attr('selected', 'selected');
            }
        })
        .end()
        .next()
        .find('.dropdown-toggle')
        .text(inch + ' in ')
        .append("<span class='caret'></span>");
    }
});
$.editable.addInputType("button_dropdown", {
    element: function(settings, original) {
        var input = $("<input type='hidden' />"),
        select = $("<select>");
        this.append(select);
        this.append(input);
        return (input);
    },
    content : function(string, settings, original) {
        var select = this.find('select'),
        opts = $.parseJSON(string),
        selected = "";
        $.each( opts, function ( item, index ) {
            if ( item === "selected" ) {
                selected = index;
            } else {
                var option = $("<option>").val(item).append(index);
                select.append(option);
            }
        });
        if ( selected ) {
            select.val(selected);
        }
    },
    plugin : function(settings, original) {
        var select = $(this).find('select');
        select.button_dropdown();
    },
    submit: function (settings, original) {
        $("input", this).val( $("select", this).val() );
    }
});
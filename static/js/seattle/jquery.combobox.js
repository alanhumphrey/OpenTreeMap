/*
 * jQuery combobox extension for autocomplete
 * code originally here:
 * http://jqueryui.com/demos/autocomplete/#combobox
 *
 *
 * A custom widget built by composition of Autocomplete and Button. You can either type
 * something into the field to get filtered suggestions based on your input, or use the 
 * button to get the full list of selections.
 *
 * The input is read from an existing select-element for progressive enhancement, passed 
 * to Autocomplete with a customized source-option.
 *
*/
(function( $ ) {
    $.widget( "ui.combobox", {
    	options: {
    		autoFill: true,
    		clearButton: true,
    		adjustWidth: true,
    		uiStyle: false,
    		selected: null
    	},
		_create: function() {
			
	    	var self = this,
	    	select = this.element.hide(),
	    	selected = select.children( ":selected" ),
	    	value = selected.val() ? selected.text() : "", found = false;
	    	var input = this.input = $( "<input>" )
	    	.attr('title', '' + select.attr("title") + '')
			.insertAfter( select )
			.val( value )
			.autocomplete({
		    	delay: 0,
		    	minLength: 0,
		    	source: function( request, response ) {
					var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
					var resp = select.children( "option" ).map(function() {
			    		var text = $( this ).text();
			    		if ( this.value && ( !request.term || matcher.test(text) ) ) {
							return {
				    			label: text.replace(
									new RegExp(
					    				"(?![^&;]+;)(?!<[^<>]*)(" +
										$.ui.autocomplete.escapeRegex(request.term) +
										")(?![^<>]*>)(?![^&;]+;)", "gi"
									), "<strong>$1</strong>" ),
				    			value: text,
				    			option: this
							};
						}
					});
					found = resp.length > 0;
					response(resp);
		    	}, 
		    	select: function( event, ui ) {
					ui.item.option.selected = true;
					self._trigger( "selected", event, {
			    		item: ui.item.option
					});
					select.change();
		    	},
		    	change: function( event, ui ) {
					if ( !ui.item ) {
				    	var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
				    	valid = false;
			    		select.children( "option" ).each(function() {
							if ( $( this ).text().match( matcher ) ) {
					    		this.selected = valid = true;
					    		return false;
							}
						});
				    	if ( !valid || input.data("autocomplete").term == "" ) {
				    		//set to first suggestion, unless blank or autoFill is turned off
				    		if ( ! self.options.autoFill || input.data("autocomplete").term == "" ) found = false;
				    		if (found) {
				    			var suggestion = jQuery(input.data("autocomplete").widget()).find("li:first a").text();
				    			var option = select.find("option:contains('" + suggestion + "')").attr('selected', true);
				    			$(this).val(suggestion);
				    			input.data("autocomplete").term = suggestion;
				    			self._trigger("selected", event, { item: option[0] });
				    		} else {
				    			select.find("option:selected").removeAttr("selected");
				    			var default_option = select.find("option")[0];
				    			$(this).val(default_option.text);
				    			input.data("autocomplete").term = default_option.text;
				    			self._trigger("selected", event, { item: null });
				    		}
				    		return found;
						}
			    	}
				}
			});
	    
	    	if( self.options.adjustWidth ) { input.width(select.width()); }

        	if( self.options.uiStyle ) {
    	    	input.addClass( "ui-widget ui-widget-content ui-corner-left" );
       		}

	    	input.data( "autocomplete" )._renderItem = function( ul, item ) {
				return $( "<li></li>" )
		    	.data( "item.autocomplete", item )
		    	.append( "<a>" + item.label + "</a>" )
		    	.appendTo( ul );
	    	};
	    
	    	this.button = $( "<button type='button'> </button>" )
			.attr( "tabIndex", -1 )
			.attr( "title", "Show All Items" )
			.insertAfter( input )
			.button({
		    	icons: {
					primary: "ui-icon-triangle-1-s"
		    	},
		    	text: false
			})
			.removeClass( "ui-corner-all" )
			.addClass( "ui-corner-right ui-button-icon ui-button-combo" )
			.click(function(e) {
		    	e.preventDefault();
		    	// close if already visible
		    	if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
					input.autocomplete( "close" );
					return;
		    	}
		    
		    	// work around a bug (likely same cause as #5265)
		    	$( this ).blur();

		    	// pass empty string as value to search for, displaying all results
		    	input.autocomplete( "search", "" );
		    	input.focus();
			});
		},
	
		destroy: function() {
	    	this.input.remove();
	    	this.button.remove();
	    	this.element.show();
	    	$.Widget.prototype.destroy.call( this );
		}
    });
})( jQuery );

/***
widget to turn select lists into dropdown button menus
***/

(function( $ ) {
    $.widget( "ui.button_dropdown", {
    	options: {
    		appended_text: "",
    		button_class: ""
    	},
		_create: function() {
			
	    	var self = this,
	    	toggle_text = "",
	    	select = this.element.hide(),
	    	selected = select.children( ":selected" ),
	    	action_button = $("<a data-toggle='dropdown' href='#'></a>")
	    	                .addClass("btn dropdown-toggle " + self.options.button_class),
	    	menu = $( "<ul>" ).addClass( "dropdown-menu" ),
	    	opts = select.find("option")
	    				 .each( function (index, item ) {
	    					menu.append( $("<li><a>" + item.text + "</a></li>") );
	    				 });
	    	menu.append("</ul>");
	    	if ( selected ) {
	    		toggle_text = selected.text();
	    	} else {
	    		toggle_text = menu.find("li").first().text();
	    	}
	    	toggle_text += " " + self.options.appended_text + " ";
	    	var button_group = $( "<div>")
	    				.append( action_button, menu, "</div>" )
	    	            .find( ".dropdown-toggle" )
	    	            .text( toggle_text )
	    	            .append( "<span class='caret'></span>" )
	    	            .end()
	    	            .find("li a")
	    	            .click(function () {
	    	            	var choice = $(this).text(); 
	    	            	var append_text = "";
	    	            	select.find( "option" )
	    	            		  .removeAttr('selected')
	    	            	      .filter( function () {
	    	            	      	return $(this).text() == choice; 
	    	            	      } )
	    	            	      .attr('selected', 'selected');
							var sel = select.find("option:selected").val();
							if (sel) append_text = self.options.appended_text;
	    	            	select.next()
	    	            	      .find(".dropdown-toggle")
	    	            	      .text( choice )
	    	            	      .append( " " + append_text + " <span class='caret'></span>" );
	    	            } ) 
	    	            .end()
	    	            .addClass( "btn-group" )
	    	            .insertAfter( select );
	    },
	
		destroy: function() {
			this.div.remove();
	    	this.element.show();
	    	$.Widget.prototype.destroy.call( this );
		}
    });
})( jQuery );

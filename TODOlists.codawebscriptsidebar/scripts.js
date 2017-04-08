//note(@duncanmid): TODOLists - Coda 2 Sidebar Plugin v.1.1 | © D.G. Midwinter, @duncanmid

//done(@duncanmid): options

var defaults = {
	    'todo': '#FA6058',
	   'tofix': '#FCBC30',
	   'fixme': '#FFF363',
	   'issue': '#50E3C2',
	     'bug': '#37CA41',
	    'note': '#3792F3',
	'optimize': '#0058B3',
	     'xxx': '#9013FE',
	    'hack': '#FF42F6',
	    'done': '#B8CAE2'
};

var parameters = {
	              'lines': '1',
		         'labels': '0',
	   'uppercase labels': '1',
	          'specifier': '0',
             'stylesheet': '0'
};

var labels = Object.keys(defaults),
	options = Object.keys(parameters);



//done(@duncanmid): setup (options)

function setup(labels) {
	
	labels.forEach( function(key, value) {
		
		if( window.CodaPlugInPreferences.preferenceForKey(key) === undefined ) {
			window.CodaPlugInPreferences.setPreferenceForKey(defaults[key], key);
		}
	});
		
	options.forEach( function(key) {
		
		if( window.CodaPlugInPreferences.preferenceForKey(key) === undefined ) {
			window.CodaPlugInPreferences.setPreferenceForKey(parameters[key], key);
		}
	});
}

setup(labels);



//done(@duncanmid): unique values

function uniqueValues(value, index, self) { 
	
	return self.indexOf(value) === index;
}



//done(@duncanmid): hex to rgb
	
function hexToRgb(hex) {
    
    var regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    
    hex = hex.replace(regex, function(x, r, g, b) {
        
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    return parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16);
}



//done(@duncanmid): regex patterns

var regexPatterns = {};

labels.forEach( function(key) {

	regexPatterns[key] = { pattern: '([\\/\\/][\\/\\*]|#|<!--)\\s*' + key + '\\s*(?:\\(([^:]*)\\))*\\s*:?\\s*(.*)' };
});



//done(@duncanmid): CODA get document lines

function getDocumentLines() {

	var theDoc = window.CodaTextView.string(); 
	
	if ( theDoc ) {
		
		var linesArr = theDoc.split('\n');
		
		return linesArr;
	
	} else {
		
		clearAllComments();
		return null;
	}
}



//done(@duncanmid): load all comments

function loadAllComments() {
	
	var 	lines 		= getDocumentLines(),
			keys 		= Object.keys(regexPatterns),
			lineNum 	= 1,
			selected 	= $('#comment-type').val(),
			specifier 	= $('#specifier').val();
	
	if( lines ) {
	
		lines.forEach( function(message) {
			
			if( specifier === 'all' ) {
				
					
					keys.forEach( function(key) {
						
						var comment = message.match( RegExp(regexPatterns[key].pattern, 'i') );
						
						if( comment) {
							
							outputComment(comment, lineNum, key, selected);
						}
					});

		
				lineNum++;
			
			} else {
				
				keys.forEach( function(key) {
						
					var comment = message.match( RegExp(regexPatterns[key].pattern, 'i') );
					
					if( comment) {
						
						if( comment[2] === specifier ) {
						
							outputComment(comment, lineNum, key, selected);
						}
					}
				});
				
				lineNum++;
			}		
		});
	}
}



//done(@duncanmid): output comments

function outputComment(comment, lineNum, key, selected) {
	
	var color		= window.CodaPlugInPreferences.preferenceForKey( key ),
		prefs 		= '',
		text 		= '',
		full		= '',
		display 	= 'none';

		
		switch( comment[1] ) {
			
			case '<!--':
			
			text = comment[3].replace(/-->(.*)/, '');
			full = comment[0].replace(/-->(.*)/, '-->');
			break;
			
			case '/*':
			text = comment[3].replace(/\*\/(.*)/, '');
			full = comment[0].replace(/\*\/(.*)/, '*/');
			break;
			
			default:
			text = comment[3];
			full = comment[0];
		}
	
	options.forEach( function(key) {

		if(key === 'uppercase labels') {
			
			//note(@duncanmid): eliminate class clash with 'labels'
			prefs += ' ' + 'uppercase' + '-' + window.CodaPlugInPreferences.preferenceForKey( key );
			
		} else {	
			
			prefs += ' ' + key + '-' + window.CodaPlugInPreferences.preferenceForKey( key );
		}
	});
	
	if ( selected === 'all' ) {
		
		display = '-webkit-box';
		
	}
		
	if ( key === selected ) {
			
		display = '-webkit-box';
	}
	
	var html  = '<li style="display: ' + display + ';" data-label="' + key + '" data-color="' + color + '" data-specifier="' + comment[2] + '" data-linenum="' + lineNum + '">' +
					'<div class="color" style="background-color: ' + color + '"></div>' +
						'<div class="comment-info' + prefs + '">';
	
	if( window.CodaPlugInPreferences.preferenceForKey( 'labels' ) == '1' ) {
	
		html +=				'<div class="labels" style="color: ' + color + '">' + key + '</div>';
	}
	
	if( window.CodaPlugInPreferences.preferenceForKey( 'specifier' ) == '1' && comment[2] ) {
		
		html +=				'<div class="specifier">' + comment[2] + '</div>';
	}
	
	if( window.CodaPlugInPreferences.preferenceForKey( 'lines' ) == '1' ) {	
		
		html +=				'<div class="lines">' + lineNum + '</div>';
	}
		
		html +=			'</div>' +
					'<div class="content">' + text + '</div>' +
					'<button class="delete" data-line="' + lineNum + '" data-full="' + full + '" title="delete this comment">&times;</button>' +
				'</li>';
	
	$('.main-list').append( html );
	
	populateLabels( selected );
}



//done(@duncanmid): populate labels menu

function populateLabels( selected ) {
		
	var count 	= 0,
		islabel = '';
	
	$('#comment-type').html('');
	
	$('#comment-type').append('<option value="all">label</option><optgroup label="&#9472;&#9472;&#9472;&#9472;&#9472;"></optgroup>');
	
	labels.forEach( function(key) {
		
		if( selected === key ) { islabel = ' selected'; } else { islabel = ''; }
		
		count = $('.main-list li[data-label="' + key + '"]').length;
		
		$('#comment-type').append('<option value="' + key + '"' + islabel + '>' + key + ': ' + count + '</option>');
	});
}



//done(@duncanmid): clear comments

function clearAllComments() {
	
	$('#mark-as').val('null').prop('disabled', true);
	$('.main-list li').remove();
}



//done(@duncanmid): CODA text view will save

function textViewWillSave(CodaTextView) {
	
	clearAllComments();	
	loadAllComments();
	populateSpecifiers($('#specifier').val());
}



//done(@duncanmid): CODA text view will focus

function textViewDidFocus(CodaTextView) { 
	
	clearAllComments();	
	loadAllComments();
	populateSpecifiers($('#specifier').val());
}

 

//issue: this would be ideal -- CODA text view will close
/*
function textViewWillClose(CodaTextView) {
	
	//...
}
*/



//done(@duncanmid): populate options

function populateOptions(labels) {
	
	$('.labels-options').html('');
	$('.additional-options').html('');
	
	labels.forEach( function(key) {
		
		var color = window.CodaPlugInPreferences.preferenceForKey(key);
		
		$('.labels-options').append('<label><span>' + key + '</span>: <input type="text" name="' + key + '-color" style="border-color: ' + color + '" value="' + color + '" /></label>');
	});
	
	var counter = 1;
	
	options.forEach( function(key) {
		
		var checked = '';
		
		if( window.CodaPlugInPreferences.preferenceForKey( key ) == '1' ) {
			
			checked = ' checked';
		}
		
		var text = 'show ' + key;
		
		if( key === 'uppercase labels' ) {
			
			text = 'use ' + key;
		}
		
		if( key === 'stylesheet' ) {
			
			text = 'use dark theme';
		}
		
		$('.additional-options').append('<label><span>' + text + '</span><input id="option-' + counter + '" type="checkbox"' + checked + ' /></label>');
		
		counter++;
	});
}



//done(@duncanmid): update options

function updateOptions(labels) {
	
	labels.forEach( function(key) {
	
		var value = $('input[name="' + key + '-color"]').val();
		
		window.CodaPlugInPreferences.setPreferenceForKey(value, key);
	});
	
	var counter = 1;
	
	options.forEach( function(key) {
	
		if( $( '#option-' + counter ).prop('checked') === true ) {
			
			window.CodaPlugInPreferences.setPreferenceForKey('1', key);
			
		} else {
			
			window.CodaPlugInPreferences.setPreferenceForKey('0', key);
		}
		
		counter++;
	});
	
	populateOptions(labels);
	clearAllComments();	
	loadAllComments();
	setTheme();
}



//done(@duncanmid): populate specifiers select

function populateSpecifiers(selectedValue) {
	
	//get text from coda...
	var 	lines 		= getDocumentLines(),
			keys 		= Object.keys(regexPatterns),
			lineNum 	= 1,
			specfiers 	= [];
	
	if( lines ) {
	
		lines.forEach( function(message) {
			
			keys.forEach( function(key) {
				
				var comment = message.match( RegExp(regexPatterns[key].pattern, 'i') );
				
				if( comment ) {
					
					//output all comments...
					specfiers.push(comment[2]);
				}
			});
		});
	}
	
	$('#specifier').html('').append('<option value="all">specifier</option><optgroup label="&#9472;&#9472;&#9472;&#9472;&#9472;"></optgroup>');
	
	var values = specfiers.filter( uniqueValues );
	
	for(i=0; i<values.length; i++) {
		
		if( values[i] ) {
			
			var selected = '';
			
			if( selectedValue === values[i] ) {
				
				selected = ' selected';
			}
				
			$('#specifier').append('<option value="' + values[i] + '"' + selected + '>' + values[i] + '</value>');
		}
	}	
}



//done(@duncanmid): mark as select

function modifyComment( comment, regex, replace ) {
	
	var modified = comment.replace(regex, replace);
	
	var range = window.CodaTextView.rangeOfCurrentLine();
	
	window.CodaTextView.replaceCharactersInRangeWithString(range, modified);
	
	window.CodaTextView.save();
	
	$('#mark-as').val('null').prop('disabled', true);
}



//done(@duncanmid): delete comment

function deleteComment( line, comment ) {
	
	window.CodaTextView.goToLineAndColumn( line, 0 );

	var lineRange 	= window.CodaTextView.rangeOfCurrentLine();
	var oldLine 	= window.CodaTextView.currentLine();
	var newLine 	= oldLine.replace(comment, '');
	
	window.CodaTextView.replaceCharactersInRangeWithString(lineRange, newLine);
	window.CodaTextView.save();
}



//done(@duncanmid): set theme

function setTheme() {
	
	$('#stylesheet').attr('href', 'styles-' + window.CodaPlugInPreferences.preferenceForKey('stylesheet') + '.css');	
}



//note(@duncanmid): docready

$(document).ready(function() {
	
	clearAllComments();
	loadAllComments();
	populateOptions(labels);
	populateSpecifiers();
	setTheme();
	
	
	
	//done(@duncanmid): populate mark-as menu
	
	labels.forEach( function(key) {
			
		//$('#comment-type').append('<option value="' + key + '">' + key + ' (0)</option>');
		$('#mark-as').append('<option value="' + key + '">' + key + '</option>');
	});
	
	
	
	//done(@duncanmid): label menu
	
	$('#comment-type').change( function() {
		
		var value = $(this).val();
		
		if( value !== 'all' ) {
			
			$('#comment-type-color').css('background-color', window.CodaPlugInPreferences.preferenceForKey( value ) );
			
		} else {
				
			$('#comment-type-color').css('background-color', 'transparent' );
		}
		
		clearAllComments();	
		loadAllComments();
	});
	
	
	
	//done(@duncanmid): specifier menu
	
	$('body').on('change', '#specifier', function() {

		clearAllComments();	
		loadAllComments();
		populateSpecifiers( $(this).val() );
	});
	
	
	
	//done(@duncanmid):select comment from main list
	
	$('body').on('click', '.main-list li', function() {
		
		var $this = $(this),
			style = window.CodaPlugInPreferences.preferenceForKey('stylesheet');
		
		if(	$this.hasClass('selected') ) {
			
			if( style === '0' ) {
				
				$(this).css({ 	'box-shadow': 'inset 0px 0px 0px 1px #ccc',
									'background-image': 'linear-gradient(-180deg, rgba(255, 255, 255, .6) 0%, rgba(255, 255, 255, 0) 50%)',
									'background-color': 'transparent'
								}).removeClass('selected');
				
			} else {
			
				$this.css('box-shadow', '0px 2px 4px 0px rgba(0,0,0,0.50)').removeClass('selected');
			}
			
			$('#mark-as').prop('disabled', true);
		
		} else {
			
			$('.main-list li').each( function(index, object) {
				
				if( style === '0' ) {
					
					$(this).css({ 	'box-shadow': 'inset 0px 0px 0px 1px #ccc',
									'background-image': 'linear-gradient(-180deg, rgba(255, 255, 255, .6) 0%, rgba(255, 255, 255, 0) 50%)',
									'background-color': 'transparent'
								}).removeClass('selected');
					
				} else {
				
					$(this).css('box-shadow', '0px 2px 4px 0px rgba(0,0,0,0.50)').removeClass('selected');
				}
			});
			
			if( style === '0' ) {
				
				$this.css({	'box-shadow': 		'inset 0px 0px 0px 2px ' + $this.data('color'),
							'background-image': 'none',
							'background-color':	'rgba(' + hexToRgb($this.data('color')) + ',.2)'
						}).addClass('selected');
				
			} else {
			
				$this.css('box-shadow', 'inset 0px 0px 0px 2px ' + $this.data('color')).addClass('selected');
			}
			
			var line = parseInt( $this.data('linenum') );
			
			window.CodaTextView.goToLineAndColumn(line, 0);
			
			$('#mark-as').prop('disabled', false);
		}
	});
	
	
	
	//done(@duncanmid): toggle options
	
	$('#toggle-options').click(function() {
		
		$('footer').toggleClass('revealed');
		
		if( $('footer').hasClass('revealed') ) {
			
			setTimeout(function(){
				$('.main-list').addClass('blur');
			}, 150);
		
		} else {
			
			$('.main-list').removeClass('blur');
		}
	});
	
	
	
	//done(@duncanmid): modify colors
	
	$('body').on('keypress', '.labels-options input', function( event ) {
		
		//note on enter (13) or tab (9)
		if( event.keyCode == 13 || event.keyCode == 9 ) {
			updateOptions(labels);
		}
	});
	
	
	
	//done(@duncanmid): modifiy options
	
	$('body').on('click', '.additional-options input', function( event ) {
		
		updateOptions(labels);
	});
	
	
	
	//done(@duncanmid): mark comment as
	
	$('body').on('change', '#mark-as', function( event ) {
		
		var selected 	= $('.main-list li.selected').data('linenum'),
			oldType 	= $('.main-list li.selected').data('label'),
			newType 	= $(this).val();
		
		//note ensure the correct line, if the selection has moved...
		window.CodaTextView.goToLineAndColumn( parseInt( selected ), 0 );
		
		var comment = window.CodaTextView.currentLine();
		
		//note do find and replace...
		var regex = new RegExp( oldType, 'i');
		
		if( comment.match(regex) ) {
			
			if( window.CodaPlugInPreferences.preferenceForKey('uppercase labels') == '0' ) {
				
				modifyComment( comment, regex, newType );
				
			} else {
				
				modifyComment( comment, regex, newType.toUpperCase() );
			}
		}
	});
	
	
	
	//done(@duncanmid): delete comment
	
	$('body').on('click', '.delete', function( event ) {
		
		event.stopPropagation();
		var line 	= $(this).data('line'),
			comment = $(this).data('full');
		
		$('#mark-as').prop('disabled', true);
		
		$(this).parent().hide(200, function() {
			
			deleteComment(line, comment);
		});
	});
	
	
	
	//done(@duncanmid): open sample file
	
	$('#sample').click(function() {
		
		createSampleFile();
		
		$('#toggle-options').trigger('click');
	});
	
	
	
	//done(@duncanmid): twitter
	
	$('#twitter').click( function() {
		
		window.CodaPlugInsController.displayHTMLString('<meta http-equiv="refresh" content="1;url=http://twitter.com/duncanmid" />');
	});
});

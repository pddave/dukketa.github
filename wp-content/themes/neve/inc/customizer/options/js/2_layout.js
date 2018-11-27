/**
 * Handle the layout preview.
 *
 * @param $
 */
var layoutRanges = {
	'neve_container_width': {
		'selector': '.container',
		'cssProp': 'max-width',
		'unit': 'px',
		'styleClass': 'container-width-css'
	},
	'neve_body_font_size': {
		'selector': 'body',
		'cssProp': 'font-size',
		'styleClass': 'body-font-size-css'
	},
	'neve_body_line_height': {
		'selector': 'body',
		'cssProp': 'line-height',
		'unit': ' ',
		'styleClass': 'body-line-height-css'
	},
	'neve_h1_font_size': {
		'selector': 'h1, .single .entry-title',
		'cssProp': 'font-size',
		'styleClass': 'h1-font-size-css'
	},
	'neve_h1_line_height': {
		'selector': 'h1, .single .entry-title',
		'cssProp': 'line-height',
		'unit': ' ',
		'styleClass': 'h1-line-height-css'
	},
	'neve_h2_font_size': {
		'selector': 'h2',
		'cssProp': 'font-size',
		'styleClass': 'h2-font-size-css'
	},
	'neve_h2_line_height': {
		'selector': 'h2',
		'cssProp': 'line-height',
		'unit': ' ',
		'styleClass': 'h2-line-height-css'
	},
	'neve_h3_font_size': {
		'selector': 'h3',
		'cssProp': 'font-size',
		'styleClass': 'h3-font-size-css'
	},
	'neve_h3_line_height': {
		'selector': 'h3',
		'cssProp': 'line-height',
		'unit': ' ',
		'styleClass': 'h3-line-height-css'
	},
	'neve_h4_font_size': {
		'selector': 'h4',
		'cssProp': 'font-size',
		'styleClass': 'h4-font-size-css'
	},
	'neve_h4_line_height': {
		'selector': 'h4',
		'cssProp': 'line-height',
		'unit': ' ',
		'styleClass': 'h4-line-height-css'
	},
	'neve_h5_font_size': {
		'selector': 'h5',
		'cssProp': 'font-size',
		'styleClass': 'h5-font-size-css'
	},
	'neve_h5_line_height': {
		'selector': 'h5',
		'cssProp': 'line-height',
		'unit': ' ',
		'styleClass': 'h5-line-height-css'
	},
	'neve_h6_font_size': {
		'selector': 'h6',
		'cssProp': 'font-size',
		'styleClass': 'h6-font-size-css'
	},
	'neve_h6_line_height': {
		'selector': 'h6',
		'cssProp': 'line-height',
		'unit': ' ',
		'styleClass': 'h6-line-height-css'
	},
};

var layoutLivePreview = function ( $ ) {
	'use strict';
	$.each( layoutRanges, function ( id, args ) {
		wp.customize( id, function ( value ) {
			value.bind( function ( newval ) {
				var values = JSON.parse( newval );
				if ( !values ) {
					return true;
				}
				if( typeof values.suffix === 'object' ) {
					args.unit = values.suffix;
				}
				var settings = {
					selectors: args.selector,
					cssProperty: args.cssProp,
					propertyUnit: args.unit ? args.unit : '' ,
					styleClass: args.styleClass,
				};
				$.neveCustomizeUtilities.setLiveCss( settings, values );
			} );
		} );
	} );

	wp.customize( 'neve_sidebar_width', function ( value ) {
		value.bind( function ( newval ) {
			$( '.nv-sidebar-wrap, .nv-sidebar-wrap.shop-sidebar' ).css( 'max-width', newval + '%' );
			$( '#content .container .col:not(:only-child)' ).css( 'max-width', 100 - newval + '%' );
		} );
	} );
};

layoutLivePreview( jQuery );

var containersLayoutMap = {
	'neve_default_container_style': '.page:not(.woocommerce) .single-page-container',
	'neve_blog_archive_container_style': '.archive-container',
	'neve_single_post_container_style': '.single-post-container',
	'neve_shop_archive_container_style': '.woocommerce-page.post-type-archive .neve-main > div',
	'neve_single_product_container_style': '.single-product .neve-main > div',
};

var containersLivePreview = function ( $ ) {
	'use strict';
	$.each( containersLayoutMap, function ( controlId, cssSelector ) {
		wp.customize( controlId, function ( value ) {
			value.bind( function ( newval ) {
				if ( newval === 'contained' ) {
					$( cssSelector ).removeClass( 'container-fluid' ).addClass( 'container' );
					return false;
				}
				$( cssSelector ).removeClass( 'container' ).addClass( 'container-fluid' );
			} );
		} );
	} );
};
containersLivePreview( jQuery );



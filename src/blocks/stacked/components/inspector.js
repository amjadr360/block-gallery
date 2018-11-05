/**
 * Internal dependencies
 */
import { title } from '../'
import ResponsiveTabsControl from '../../../components/responsive-tabs-control';
import linkOptions from '../../../utils/link-options';
import SizeControl from '../../../components/size-control';
import { LightboxControl } from '../../../components/lightbox';
import { BackgroundPanel } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl, ToggleControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.setLinkTo = this.setLinkTo.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setFullwidthTo = this.setFullwidthTo.bind( this );
		this.setShadowTo = this.setShadowTo.bind( this );
	}

	setLinkTo( value ) {
		this.props.setAttributes( { linkTo: value } );
	}

	setRadiusTo( value ) {
		this.props.setAttributes( { radius: value } );
	}

	setShadowTo( value ) {
		this.props.setAttributes( { shadow: value } );
	}

	setFullwidthTo() {
		this.props.setAttributes( { fullwidth: ! this.props.attributes.fullwidth, } );
	}

	getFullwidthImagesHelp( checked ) {
		return checked ? __( 'Using full bleed images.' ) : __( 'Toggle to enable full bleed images.' );
	}

	render() {

		const {
			attributes,
			setAttributes,
			isSelected,
			wideControlsEnabled = false,
		} = this.props;

		const {
			align,
			images,
			linkTo,
			gutter,
			lightbox,
			fullwidth,
			radius,
			shadow,
		} = attributes;

		return (
			isSelected && (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ sprintf( __( '%s Settings' ), title ) }>
							{ images.length > 1 &&
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Gutter' ) }
								/>
							}
							{ gutter > 0 && <RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ radius }
								onChange={ this.setRadiusTo }
								min={ 0 }
								max={ 20 }
								step={ 1 }
							/> }
							{ wideControlsEnabled &&
								<ToggleControl
									label={ images.length > 1 ? __( 'Fullwidth Images' ) : __( 'Fullwidth Image' ) }
									checked={ !! fullwidth }
									help={ this.getFullwidthImagesHelp }
									onChange={ this.setFullwidthTo }
								/>
							}
							{ console.log( align ) }
							<SizeControl { ...this.props }
								onChange={ this.setShadowTo }
								value={ shadow }
								label={ __( 'Box Shadow' ) }
								reset={ false }
							/>
							<LightboxControl { ...this.props } />
							{ ! lightbox && <SelectControl
								label={ __( 'Link To' ) }
								value={ linkTo }
								onChange={ this.setLinkTo }
								options={ linkOptions }
							/> }
						</PanelBody>
						<BackgroundPanel { ...this.props }
							hasCaption={ true }
						/>
					</InspectorControls>
				</Fragment>
			)
		)
	}
};

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
] )( Inspector );

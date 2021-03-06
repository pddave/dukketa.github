<?php
/**
 * Page settings metabox.
 *
 * @package Neve
 */

namespace Neve\Admin\Metabox;

/**
 * Class Metabox
 *
 * @package Neve\Admin\Metabox
 */
class Main extends Metabox_Base {
	/**
	 * Add controls.
	 */
	public function add_controls() {
		$this->add_layout_controls();
		$this->add_content_toggles();
	}

	/**
	 * Add content toggles.
	 */
	private function add_content_toggles() {
		$content_controls = array(
			'neve_meta_disable_header'         => array(
				'default'     => 'off',
				'label'       => __( 'Components', 'neve' ),
				'input_label' => __( 'Disable Header', 'neve' ),
			),
			'neve_meta_disable_title'          => array(
				'default'         => 'off',
				'input_label'     => __( 'Disable Title', 'neve' ),
				'active_callback' => array( $this, 'hide_on_single_product' ),
			),
			'neve_meta_disable_featured_image' => array(
				'default'         => 'off',
				'input_label'     => __( 'Disable Featured Image', 'neve' ),
				'active_callback' => array( $this, 'hide_on_single_page_and_product' ),
			),
			'neve_meta_disable_footer'         => array(
				'default'     => 'off',
				'input_label' => __( 'Disable Footer', 'neve' ),
			),
		);

		$default_control_args = array(
			'default'         => 'off',
			'label'           => '',
			'input_label'     => '',
			'active_callback' => '__return_true',
		);

		foreach ( $content_controls as $control_id => $args ) {
			$args = wp_parse_args( $args, $default_control_args );

			$this->add_control(
				new Controls\Checkbox(
					$control_id,
					array(
						'default'         => $args['default'],
						'label'           => $args['label'],
						'input_label'     => $args['input_label'],
						'active_callback' => $args['active_callback'],
					)
				)
			);
		}
	}

	/**
	 * Add layout controls.
	 */
	private function add_layout_controls() {
		$this->add_control(
			new Controls\Radio(
				'neve_meta_container',
				array(
					'default' => 'default',
					'choices' => array(
						'default'    => __( 'Customizer Setting', 'neve' ),
						'contained'  => __( 'Contained', 'neve' ),
						'full-width' => __( 'Full Width', 'neve' ),
					),
					'label'   => __( 'Layout', 'neve' ),
				)
			)
		);
		$this->add_control(
			new Controls\Radio(
				'neve_meta_sidebar',
				array(
					'default' => 'default',
					'choices' => array(
						'default'    => __( 'Customizer Setting', 'neve' ),
						'left'       => __( 'Left Sidebar', 'neve' ),
						'right'      => __( 'Right Sidebar', 'neve' ),
						'full-width' => __( 'No Sidebar', 'neve' ),
					),
					'label'   => __( 'Sidebar', 'neve' ),
				)
			)
		);
	}

	/**
	 * Callback to hide on single product edit page.
	 *
	 * @return bool
	 */
	public function hide_on_single_product() {
		if ( ! isset( $_GET['post'] ) ) {
			return true;
		}

		$post_type = get_post_type( $_GET['post'] );

		if ( $post_type !== 'product' ) {
			return true;
		}

		return false;
	}

	/**
	 * Callback to hide on single product/page edit page
	 *
	 * @return bool
	 */
	public function hide_on_single_page_and_product() {
		if ( ! isset( $_GET['post'] ) ) {
			return true;
		}

		$post_type = get_post_type( $_GET['post'] );

		if ( $post_type !== 'page' && $post_type !== 'product' ) {
			return true;
		}

		return false;
	}
}

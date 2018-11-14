/**
 * External dependencies
 */
import React from 'react';
import { i18n, editor, components, element } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

const { __ } = i18n;

const { InnerBlocks, InspectorControls, RichText } = editor;
const { PanelBody, ToggleControl } = components;
const { Fragment } = element;

/**
 * Returns template: A button if showButton is true,
 * otherwise an empty array
 * @param {boolean} showButton
 * @returns {array} Template
 */
const getTemplate = showButton => {
  return showButton ? [
    [ 'core/button', {
      className: 'is-style-squared is-style-outline',
      align: 'center',
      customTextColor: '#36292A',
    } ],
  ] : [];
};

export const name = 'box';

export const settings = {
  title: __('Box'),

  // description: __('A custom block for Gutenberg Cloud'),

  icon: 'editor-kitchensink',

  attributes: {
    title: {
      type: 'string',
      source: 'html',
      selector: 'h2',
    },
    text: {
      type: 'string',
      source: 'html',
      selector: 'p',
    },
    showButton: {
      type: 'boolean',
      default: true,
    },
  },

  edit ({ className, attributes, setAttributes }) {
    const { title, text, showButton } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Box Settings')}>
            <ToggleControl
              label={__('Show Button')}
              checked={!!showButton}
              onChange={() => setAttributes({ showButton: !showButton  }) }
            />
          </PanelBody>
        </InspectorControls>

        <div className={ className }>
          <div className="wp-block-cloudblocks-box__container">
            <RichText
              tagName="h2"
              className="wp-block-cloudblocks-box__title"
              value={ title }
              placeholder={ __('Write heading...') }
              onChange={ value => setAttributes({ title: value }) }
              formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
              inlineToolbar
            />

            <RichText
              tagName="p"
              className="wp-block-cloudblocks-box__content"
              value={ text }
              placeholder={ __('Write content...') }
              onChange={ value => setAttributes({ text: value }) }
              formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
              inlineToolbar
            />

            <InnerBlocks
              template={ getTemplate(showButton) }
              templateLock="all"
            />
          </div>
        </div>
      </Fragment>
    );
  },

  save ({ attributes }) {
    const { title, text } = attributes;

    return (
      <div>
        <div className="wp-block-cloudblocks-box__container">
          { ! RichText.isEmpty(title) && (
            <RichText.Content tagName="h2" className="wp-block-cloudblocks-box__title" value={ title } />
          ) }

          { ! RichText.isEmpty(text) && (
            <RichText.Content tagName="p" className="wp-block-cloudblocks-box__content" value={ text } />
          ) }

          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
};

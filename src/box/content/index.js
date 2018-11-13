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

export const name = 'box-content';

export const settings = {
  title: __('Box Content'),

  // description: __('A custom block for Gutenberg Cloud'),

  icon: 'editor-kitchensink',

  attributes: {
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

  supports: {
    inserter: false,
  },

  edit ({ className, attributes, setAttributes }) {
    const { text, showButton } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Box Content Settings')}>
            <ToggleControl
              label={__('Show Button')}
              checked={!!showButton}
              onChange={() => setAttributes({ showButton: !showButton  }) }
            />
          </PanelBody>
        </InspectorControls>
        <div className={ className }>
          <RichText
            tagName="p"
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
      </Fragment>
    );
  },

  save ({ attributes }) {
    const { text } = attributes;

    return (
      <div>
        { ! RichText.isEmpty(text) && (
          <RichText.Content tagName="p" value={ text } />
        ) }

        <InnerBlocks.Content />
      </div>
    );
  },
};

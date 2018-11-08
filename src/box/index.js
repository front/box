/**
 * External dependencies
 */
import React from 'react';
import { i18n, editor } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

const { __ } = i18n;

const { InnerBlocks } = editor;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading' ];
const TEMPLATE = [
  [ 'core/heading', {
    level: 1,
    align: 'left',
    placeholder: 'Title...',
    className: 'wp-block-cloudblocks-box__title',
  } ],
  [ 'core/paragraph', {
    align: 'left',
    placeholder: 'Content...',
    className: 'wp-block-cloudblocks-box__content',
  } ],
  [ 'core/button', {
    className: 'is-style-squared is-style-outline wp-block-cloudblocks-box__button',
    align: 'center',
  } ],
];

export const name = 'box';

export const settings = {
  title: __('Box'),

  // description: __('A custom block for Gutenberg Cloud'),

  icon: 'editor-kitchensink',

  attributes: {},

  supports: {
    align: [ 'wide', 'full' ],
  },

  edit ({ className }) {
    return (
      <div className={ className }>
        <InnerBlocks
          allowedBlocks={ ALLOWED_BLOCKS }
          template={ TEMPLATE }
          templateLock="all"
        />
      </div>
    );
  },

  save ({ className }) {
    return (
      <div className={ className }>
        <InnerBlocks.Content />
      </div>
    );
  },
};

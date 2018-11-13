/**
 * External dependencies
 */
import React from 'react';
import { i18n, editor } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';

const { __ } = i18n;

const { InnerBlocks } = editor;

/**
 * Constants
 */
const TEMPLATE = [
  [ 'core/heading', {
    level: 2,
    align: 'left',
    placeholder: 'Write heading...',
    className: 'wp-block-cloudblocks-box__title',
  } ],
  [ 'cloudblocks/box-content' ],
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

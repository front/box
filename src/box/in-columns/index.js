/**
 * External dependencies
 */
import React from 'react';
import { i18n, editor, element, components } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';

const { __ } = i18n;

const { InspectorControls, InnerBlocks } = editor;

const { Fragment } = element;

const { PanelBody, RangeControl } = components;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/column'];
const MAX_COLUMNS = 4;
const MIN_COLUMNS = 2;

const getColumnsTemplate = columns => {
  const cols = [];

  for (let i = 0; i < columns; i++) {
    cols[i] = [ 'core/column', {}, [
      [ 'cloudblocks/box' ],
    ] ];
  }

  return cols;
};

export const name = 'boxes-in-columns';

export const settings = {
  title: __('Boxes in Columns'),

  // description: __('A custom block for Gutenberg Cloud'),

  icon: 'columns',

  attributes: {
    columns: {
      type: 'number',
      default: 2,
    },
  },

  supports: {
    align: [ 'wide', 'full' ],
  },

  edit ({ attributes, setAttributes, className }) {
    const { columns } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody>
            <RangeControl
              label={ __('Columns') }
              value={ columns }
              onChange={ nextColumns => {
                setAttributes({
                  columns: nextColumns <= MAX_COLUMNS ? (nextColumns >= MIN_COLUMNS ? nextColumns : MIN_COLUMNS) : MAX_COLUMNS,
                });
              } }
              min={ MIN_COLUMNS }
              max={ MAX_COLUMNS }
            />
          </PanelBody>
        </InspectorControls>

        <div className={ `wp-block-columns has-${columns}-columns ${className || ''}` }>
          <InnerBlocks
            allowedBlocks={ ALLOWED_BLOCKS }
            template={ getColumnsTemplate(columns) }
            templateLock="all"
          />
        </div>
      </Fragment>
    );
  },

  save ({ attributes, className }) {
    const { columns } = attributes;

    return (
      <div className={ `wp-block-columns has-${columns}-columns ${className || ''}` }>
        <InnerBlocks.Content />
      </div>
    );
  },
};

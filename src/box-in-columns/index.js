/**
 * External dependencies
 */
import React from 'react';
import { i18n, editor, element, components } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

const { __ } = i18n;

const { InspectorControls, InnerBlocks } = editor;

const { Fragment } = element;

const { PanelBody, RangeControl } = components;

/**
 * Constants
 */
const MAX_COLUMNS = 4;
const MIN_COLUMNS = 2;

const getColumnsTemplate = columns => {
  const cols = [];

  for (let i = 0; i < columns; i++) {
    cols[i] = [ 'cloudblocks/box' ];
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

  edit ({ attributes, setAttributes, className }) {
    const { columns } = attributes;
    const classes = [
      className,
      `has-${columns}-columns`,
    ].join(' ');

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

        <div className={ classes }>
          <InnerBlocks
            template={ getColumnsTemplate(columns) }
            templateLock="all"
          />
        </div>
      </Fragment>
    );
  },

  save ({ attributes, className }) {
    const { columns } = attributes;

    const classes = [
      className,
      `has-${columns}-columns`,
    ].join(' ');

    return (
      <div className={ classes }>
        <InnerBlocks.Content />
      </div>
    );
  },
};

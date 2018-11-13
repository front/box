
import { blocks, data, i18n } from 'wp';
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { __ } = i18n;

// Import each block herer
import * as content from './box/content';
import * as box from './box';
import * as columns from './box/in-columns';


// Category name and slug
const category = {
  slug: 'cloudblocks', // needs to match the css class of the block container: ".wp-block-cloudblocks-[block-name]"
  title: __('Cloud Blocks'),
};

// Register the new category and blocks
export function registerBlocks () {
  // Add the new category to the list
  const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
  dispatch('core/blocks').setCategories([ category, ...currentCategories ]);

  for (const { name, settings } of [content, box, columns]) {
    // Register each block
    registerBlockType(`${category.slug}/${name}`, {
      category: category.slug,
      ...settings,
    });
  }
}

registerBlocks();

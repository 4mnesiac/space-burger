import React from 'react';
import renderer from 'react-test-renderer';

import { app } from './app';

it('Ссылка рендерится без ошибок', () => {
  const tree = renderer
    .create(<Link title="Рецепт пельменей" url="https://pelmeni.gov" />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 
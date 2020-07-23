import React from 'react';
import IdentitySettings from '../components/IdentitySettings';
import renderer from 'react-test-renderer';

test('Test Identity settings Component', () => {
  const component = renderer.create(
    <IdentitySettings />,
  );
   let tree = component.toJSON();
   expect(tree).toMatchSnapshot();
});
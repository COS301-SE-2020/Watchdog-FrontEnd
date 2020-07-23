import React from 'react';
import SystemState from '../components/SystemState';
import renderer from 'react-test-renderer';

test('Test SystemState Component', () => {
  const component = renderer.create(
    <SystemState />,
  );
   let tree = component.toJSON();
   expect(tree).toMatchSnapshot();
});
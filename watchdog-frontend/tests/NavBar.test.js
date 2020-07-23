import React from 'react';
import SideNavBar from '../components/SideNavBar';
import renderer from 'react-test-renderer';

test('Test Side Nav Bar Component', () => {
  const component = renderer.create(
    <SideNavBar />,
  );
   let tree = component.toJSON();
   expect(tree).toMatchSnapshot();
});
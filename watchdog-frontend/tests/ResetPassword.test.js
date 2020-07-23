import React from 'react';
import Pass from '../components/ResetPasswordComponent';
import renderer from 'react-test-renderer';

test('Test Reset Password Component', () => {
  const component = renderer.create(
    <Pass />,
  );
   let tree = component.toJSON();
   expect(tree).toMatchSnapshot();
});
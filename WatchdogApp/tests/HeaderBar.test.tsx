import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SettingsButton from '../components/SettingsButton'
import renderer from 'react-test-renderer';
import HeaderBar from "../components/HeaderBar";
test('Test Header Bar Component', () => {
    const HeaderBarComponent = renderer.create(
        <HeaderBar  onPress={() => {
                console.log('Header Pressed!')
            }
        } text={""}/>,
    );
    let tree = HeaderBarComponent.toJSON();
    expect(tree).toMatchSnapshot();
});

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView  } from "react-native";
import Card from "../Card/Card";
import Icon from "react-native-dynamic-vector-icons";
import styles, { container } from "./BottomContainer.style";
import { Entypo  } from '@expo/vector-icons'

const BottomContainer = (props) => {
  const {
    cardState,
    onPressSignup,
    IconComponent,
    usernameTitle,
    passwordTitle,
    backgroundColor,
    onPressSettings,
    disableSettings,
    contentComponent,
    usernamePlaceholder,
    passwordPlaceholder,
    usernameOnChangeText,
    passwordOnChangeText,
    usernameIconComponent,
    passwordIconComponent,
    usernameTextInputValue,
    passwordTextInputValue,
    signupText,
    signupStyle,
    disableSignupButton,
    loginButtonText,
    emailTitle,
    emailPlaceholder,
    emailOnChangeText,
    emailIconComponent,
    emailTextInputValue,
    repasswordTitle,
    repasswordTextInputValue,
    repasswordPlaceholder,
    repasswordOnChangeText,
    repasswordIconComponent,
    signupUsernameOnChangeText
  } = props;

  renderLoginCards = () => {
    return (
      <View>
        <Card
          title={usernameTitle}
          value={usernameTextInputValue}
          placeholder={usernamePlaceholder}
          onChangeText={usernameOnChangeText}
          iconComponent={usernameIconComponent}
          {...props}
        />
        <Card
          name="key"
          secureTextEntry
          type="FontAwesome"
          title={passwordTitle}
          value={passwordTextInputValue}
          placeholder={passwordPlaceholder}
          onChangeText={(text) => passwordOnChangeText(text)}
          iconComponent={passwordIconComponent}
          {...props}
        />
      </View>
    );
  };

  renderSignupCards = () => {
    return (
      <ScrollView >
        <Card
          title={emailTitle}
          value={emailTextInputValue}
          placeholder={"JohnDoe"}
          onChangeText={signupUsernameOnChangeText}
          iconComponent={emailIconComponent}
          {...props}
        />
        <Card
          title={"Email"}
          value={emailTextInputValue}
          placeholder={"Email"}
          onChangeText={emailOnChangeText}
          secureTextEntry={false}
          iconComponent={<Entypo name="email" size={24} color="black" />}
          {...props}
        />
        <Card
          title={passwordTitle}
          value={passwordTextInputValue}
          placeholder={passwordPlaceholder}
          onChangeText={passwordOnChangeText}
          iconComponent={passwordIconComponent}
          secureTextEntry={true}
          name="key"
          type="FontAwesome"
          {...props}
        />
        <Card
          title={"Retype Password"}
          value={repasswordTextInputValue}
          placeholder={"Retype Password"}
          onChangeText={repasswordOnChangeText}
          iconComponent={repasswordIconComponent}
          secureTextEntry={true}
          name="key"
          type="FontAwesome"
          {...props}
        />
      </ScrollView >
    );
  };

  renderCardContent = () => {
    return cardState ? renderLoginCards() : renderSignupCards();
  };

  return (
    <View style={container(backgroundColor, cardState)}>
      {contentComponent}
      <View style={styles.containerGlue}>{renderCardContent()}</View>
      <View style={styles.footerContainer}>
        {!disableSettings && (
          <TouchableOpacity
            onPress={onPressSettings}
            style={{ marginRight: "auto" }}
          >
            <IconComponent
              size={35}
              type="Ionicons"
              name="ios-settings"
              color="rgba(255,255,255, 0.9)"
              {...props}
            />
          </TouchableOpacity>
        )}
        {!disableSignupButton && (
          <TouchableOpacity
            style={styles.signupButtonStyle}
            onPress={() => onPressSignup()}
          >
            <Text style={signupStyle || styles.signupTextStyle}>
              {cardState ? signupText : loginButtonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

BottomContainer.propTypes = {
  signupText: PropTypes.string,
  disableSwitch: PropTypes.bool,
  passwordTitle: PropTypes.string,
  usernameTitle: PropTypes.string,
  disableSettings: PropTypes.bool,
  backgroundColor: PropTypes.string,
  usernamePlaceholder: PropTypes.string,
  passwordPlaceholder: PropTypes.string,
  repasswordPlaceholder: PropTypes.string,
};

BottomContainer.defaultProps = {
  IconComponent: Icon,
  loginButtonText: "Already Have Account",
  disableSwitch: false,
  disableSettings: false,
  usernameTitle: "Username",
  passwordTitle: "Password",
  signupText: "Sign Me Up!",
  repasswordTitle: "Re-Password",
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
  repasswordPlaceholder: "Re-password",
  backgroundColor: "rgba(255,255,255,0.45)",
};

export default BottomContainer;

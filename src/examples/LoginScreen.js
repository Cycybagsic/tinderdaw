import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import { redirect } from 'react-router';
import { View, Text, TextInput } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
   
  };

  const handleRegister = () => {

  
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, margin: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, margin: 10 }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
     
 

      

    
     <Row className="py-3">
        <Col>
          Don't have an account ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </View>
  );
};








export default LoginScreen;




import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserNav from './UserNav';
import AdminNav from './AdminNav';


export default function FashionHouse() {
  return (
    <NavigationContainer>
      <UserNav />
      {/* <AdminNav /> */}
    </NavigationContainer>
  );
}

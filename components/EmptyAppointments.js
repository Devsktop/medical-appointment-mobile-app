import React from 'react';
import { View, Text } from 'react-native';
const EmptyAppointments = () => {
    return ( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "gray", fontWeight: "bold", textTransform:"uppercase", fontSize: 20, textAlign: "center" }}>No posee citas pendientes</Text>
        </View>
     );
}
 
export default EmptyAppointments;
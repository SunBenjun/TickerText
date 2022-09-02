import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import {Ticker} from "./Ticker";

 
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
const App = () => {
  const [state, setState] = useState(getRandom(0, 100000))

  useEffect(() => {
    setInterval(() => {
      setState(  getRandom(0, 100000))
    }, 2000);
  }, []);
 
  return (
    <View style={styles.container}>
        <Ticker textStyle={styles.text}>            
            {state}
        </Ticker>    
        <Ticker textStyle={styles.text} duration={250}>
            12345.44
        </Ticker>    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333"
  },
  text: {
    fontSize: 40,
    color: "#FFF"
  }
});

export default App;

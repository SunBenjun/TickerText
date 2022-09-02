import React, { useEffect, useMemo, useRef, useState } from 'react'

import { StyleSheet, Text, View, I18nManager,Animated } from 'react-native'

const styles = StyleSheet.create({
  row: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    overflow: 'hidden',
  },
  hide: { position: 'absolute', top: 0, left: 0, opacity: 0 },
})

const Tick = (props) => {
  const { character, duration, allCharacters } = props
  const translateY = new Animated.Value(0)
  const {width,height} = props.measurement
 
  useEffect(()=>{
    Animated.timing(
        translateY,
        {
            toValue: allCharacters.indexOf(character) * height * -1,
            duration: [",","."].includes(character) ? 0 : duration,
            useNativeDriver:true
        },
        
    ).start(); 
  })

  return (
    <Animated.View style={[{
        width: width,
        height: height,
        overflow: 'hidden'
    }]} >
      <Animated.View style={[{
           height: height,
           transform: [{ translateY }]
      }]} >
        {allCharacters.map((char, i) => (
          <Animated.Text key={i} {...props.textProps} style={[props.textStyle, {height: height.value}]}>
            {char}
          </Animated.Text>
        ))}
      </Animated.View>
    </Animated.View>
  )
}

export const Ticker = (props) => {
  
  const { children, duration = 500, textStyle = {}, textProps = {}, value = children } = props
  const [measured, setMeasured] = useState(false)
  const measureMap = useRef({}).current
  const allCharacters = "0123456789,.".split("")
  const onLayout = (char) => (event) => {
    measureMap[char] = { ...event?.nativeEvent?.layout }
    if (Object.keys(measureMap).length === allCharacters.length) {
      setMeasured(true)
    }
  }
 
  const hiddenChildren = useMemo(() => {
    if (measureMap == null) return
    return allCharacters.map((char, i) =>
      <Text
        {...props}
        style={[props.textStyle, styles.hide]}
        key={i}
        onLayout={onLayout(char)}
      >{char}</Text>)
  }, [ measureMap ])
 
  return (
    <View style={styles.row}>
      {hiddenChildren}
      {!measured
        ? null
        : `${value}`.split('').map((char, i) =>
          <Tick
            textProps={textProps}
            textStyle={textStyle}
            duration={duration}
            allCharacters={allCharacters}
            character={char}
            measurement={measureMap[char]}
            key={i}
          />
        )}
    </View>
  )
}

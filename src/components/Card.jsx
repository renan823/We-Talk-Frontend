import React, { useRef } from 'react';
import { View, PanResponder, Animated, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CardSwipeExample = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y },
      ]),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          // Ação para excluir
          Animated.timing(pan, {
            toValue: { x: 400, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            // Lógica para exclusão
            console.log('Excluir');
          });
        } else {
          // Ação para voltar à posição inicial
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.card, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      >
        <Text>Arraste para a direita para excluir</Text>
        <TouchableOpacity onPress={() => console.log('Editar')}>
          <Text>Editar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CardSwipeExample;

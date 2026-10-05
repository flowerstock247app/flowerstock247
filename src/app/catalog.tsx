
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌸 Каталог цветов</Text>

      <Text style={styles.subtitle}>
        Выберите красивый букет
      </Text>

      <Pressable style={styles.card}>
        <Text style={styles.flower}>🌹 Розы</Text>
        <Text style={styles.price}>от 2 500 ₽</Text>
      </Pressable>

      <Pressable style={styles.card}>
        <Text style={styles.flower}>💐 Букеты</Text>
        <Text style={styles.price}>от 3 000 ₽</Text>
      </Pressable>

      <Pressable style={styles.card}>
        <Text style={styles.flower}>🌷 Тюльпаны</Text>
        <Text style={styles.price}>от 1 500 ₽</Text>
      </Pressable>

      <Text style={styles.info}>
        Москва • Онлайн-оплата и наличные
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8fb',
    padding: 24,
    alignItems: 'center',
  },

  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    color: '#666',
    marginBottom: 30,
  },

  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
  },

  flower: {
    fontSize: 21,
    fontWeight: '600',
  },

  price: {
    marginTop: 8,
    fontSize: 17,
    color: '#d94f70',
    fontWeight: '600',
  },

  info: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
});

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
const HERO_IMAGE = require('../../assets/flowers/red-roses.jpg');

const PEONY = require('../../assets/flowers/peony_blush.jpg');
const TULIP = require('../../assets/flowers/tulip_pink.jpg');
const ROSES = require('../../assets/flowers/red_rose_basket.jpg');
const PASTEL = require('../../assets/flowers/pastel_mix.jpg');
const PINK_WHITE = require('../../assets/flowers/pink_white_mix.jpg');
const ROMANTIC = require('../../assets/flowers/pink_romantic.jpg');

const RED_ROSE_01 = require('../../assets/flowers/red_roses/red_rose_01.jpg');
const RED_ROSE_02 = require('../../assets/flowers/red_roses/red_rose_02.jpg');
const RED_ROSE_03 = require('../../assets/flowers/red_roses/red_rose_03.jpg');
const RED_ROSE_04 = require('../../assets/flowers/red_roses/red_rose_04.jpg');
const RED_ROSE_05 = require('../../assets/flowers/red_roses/red_rose_05.jpg');
const RED_ROSE_06 = require('../../assets/flowers/red_roses/red_rose_06.jpg');
const RED_ROSE_07 = require('../../assets/flowers/red_roses/red_rose_07.jpg');
const RED_ROSE_08 = require('../../assets/flowers/red_roses/red_rose_08.jpg');
const RED_ROSE_09 = require('../../assets/flowers/red_roses/red_rose_09.jpg');
const RED_ROSE_10 = require('../../assets/flowers/red_roses/red_rose_10.jpg');

const SHOP_PHONE = '+7 (000) 000-00-00';
const PICKUP_ADDRESS = 'Адрес магазина добавим позже';

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: any;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Красные розы',
    category: 'Розы',
    description: 'Классический букет из свежих красных роз',
    price: 4500,
    image: ROSES,
  },
  {
    id: 2,
    name: 'Розовый букет',
    category: 'Букеты',
    description: 'Нежный букет в розовых оттенках',
    price: 4200,
    image: PINK_WHITE,
  },
  {
    id: 3,
    name: 'Королевские розы',
    category: 'Розы',
    description: 'Элегантный букет для особенного человека',
    price: 5800,
    image: ROMANTIC,
  },
  {
    id: 4,
    name: 'Нежность',
    category: 'Букеты',
    description: 'Нежная композиция в пастельных тонах',
    price: 3900,
    image: PEONY,
  },
  {
    id: 5,
    name: 'Любовь',
    category: 'Розы',
    description: 'Яркие красные цветы для признания',
    price: 4900,
    image: ROSES,
  },
  {
    id: 6,
    name: 'Премиум',
    category: 'Композиции',
    description: 'Большая стильная композиция',
    price: 6500,
    image: PASTEL,
  },
  {
    id: 7,
    name: 'Романтика',
    category: 'Букеты',
    description: 'Воздушный букет для романтического вечера',
    price: 5200,
    image: ROMANTIC,
  },
  {
    id: 8,
    name: 'Большая любовь',
    category: 'Розы',
    description: 'Роскошный большой букет из роз',
    price: 7500,
    image: ROSES,
  },
  {
    id: 9,
    name: 'Комплимент',
    category: 'Подарки',
    description: 'Небольшой красивый букет в подарок',
    price: 2500,
    image: TULIP,
  },
  {
    id: 10,
    name: 'Для мамы',
    category: 'Букеты',
    description: 'Тёплая цветочная композиция для мамы',
    price: 4000,
    image: PEONY,
  },
  {
    id: 11,
    name: 'Шик',
    category: 'Композиции',
    description: 'Стильная композиция премиум-класса',
    price: 5800,
    image: PASTEL,
  },
  {
    id: 12,
    name: 'VIP букет',
    category: 'Букеты',
    description: 'Большой эффектный букет',
    price: 8500,
    image: PINK_WHITE,
  },
  {
    id: 13,
    name: 'Красные розы №1',
    category: 'Розы',
    description: 'Свежий букет красных роз',
    price: 4500,
    image: RED_ROSE_01,
  },
  {
    id: 14,
    name: 'Красные розы №2',
    category: 'Розы',
    description: 'Яркий букет красных роз',
    price: 4800,
    image: RED_ROSE_02,
  },
  {
    id: 15,
    name: 'Красные розы №3',
    category: 'Розы',
    description: 'Роскошный букет для особенного момента',
    price: 5200,
    image: RED_ROSE_03,
  },
  {
    id: 16,
    name: 'Красные розы №4',
    category: 'Розы',
    description: 'Элегантный букет в стильной упаковке',
    price: 5600,
    image: RED_ROSE_04,
  },
  {
    id: 17,
    name: 'Красные розы №5',
    category: 'Розы',
    description: 'Классический букет для любимого человека',
    price: 4900,
    image: RED_ROSE_05,
  },
  {
    id: 18,
    name: 'Красные розы №6',
    category: 'Розы',
    description: 'Большой выразительный букет',
    price: 6500,
    image: RED_ROSE_06,
  },
  {
    id: 19,
    name: 'Красные розы №7',
    category: 'Розы',
    description: 'Розы в красивой подарочной упаковке',
    price: 5800,
    image: RED_ROSE_07,
  },
  {
    id: 20,
    name: 'Красные розы №8',
    category: 'Розы',
    description: 'Пышный букет красных роз',
    price: 6900,
    image: RED_ROSE_08,
  },
  {
    id: 21,
    name: 'Красные розы №9',
    category: 'Розы',
    description: 'Эффектный букет для признания',
    price: 7500,
    image: RED_ROSE_09,
  },
  {
    id: 22,
    name: 'Красные розы №10',
    category: 'Розы',
    description: 'Премиальный букет красных роз',
    price: 8500,
    image: RED_ROSE_10,
  },
];

const categories = ['Все', 'Розы', 'Букеты', 'Композиции', 'Подарки'];

const formatPrice = (value: number) =>
  `${value.toLocaleString('ru-RU')} ₽`;

export default function Index() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 900;
  const isTablet = width >= 600;

  const scrollRef = useRef<ScrollView>(null);
  const [catalogY, setCatalogY] = useState(0);

  const [deliveryType, setDeliveryType] =
    useState<'delivery' | 'pickup'>('delivery');

  const [district, setDistrict] = useState('В черте города');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [search, setSearch] = useState('');

  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesVisible, setFavoritesVisible] = useState(false);

  const [cart, setCart] = useState<Record<number, number>>({});

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [cartVisible, setCartVisible] = useState(false);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [districtVisible, setDistrictVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === 'Все' ||
        product.category === selectedCategory;

      const searchMatch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  const favoriteProducts = useMemo(
    () => products.filter((product) => favorites.includes(product.id)),
    [favorites]
  );

  const cartItems = useMemo(() => {
    return products
      .filter((product) => cart[product.id])
      .map((product) => ({
        product,
        quantity: cart[product.id],
      }));
  }, [cart]);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, value) => sum + value, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addToCart = (id: number) => {
    setCart((current) => ({
      ...current,
      [id]: (current[id] || 0) + 1,
    }));
  };

  const decreaseCart = (id: number) => {
    setCart((current) => {
      const next = { ...current };

      if (!next[id]) return current;

      if (next[id] === 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }

      return next;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const scrollToCatalog = () => {
    scrollRef.current?.scrollTo({
      y: Math.max(catalogY - 20, 0),
      animated: true,
    });
  };

  const openPage = (page: string) => {
    setMenuVisible(false);
    setPageVisible(page);
  };

  const submitOrder = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      Alert.alert(
        'Заполните данные',
        'Пожалуйста, укажите имя и номер телефона.'
      );
      return;
    }

    if (cartCount === 0) {
      Alert.alert('Корзина пуста', 'Добавьте букет в корзину.');
      return;
    }

    Alert.alert(
      'Заказ принят',
      `Спасибо, ${customerName}! Мы свяжемся с вами по номеру ${customerPhone}.`,
      [
        {
          text: 'Хорошо',
          onPress: () => {
            setCheckoutVisible(false);
            setCartVisible(false);
          },
        },
      ]
    );
  };

  const pageTitle: Record<string, string> = {
    Профиль: 'Профиль',
    'История заказов': 'История заказов',
    Отзывы: 'Отзывы',
    Уведомления: 'Уведомления',
    'О нас': 'О нас',
    Настройки: 'Настройки',
    'Позвонить нам': 'Связаться с нами',
    'О приложении': 'О приложении',
  };

  const renderProductCard = (product: Product) => {
    const quantity = cart[product.id] || 0;
    const favorite = favorites.includes(product.id);

    return (
      <View
        key={product.id}
        style={[
          styles.productCard,
          isTablet && styles.productCardTablet,
          isDesktop && styles.productCardDesktop,
        ]}
      >
        <Pressable onPress={() => setSelectedProduct(product)}>
          <View style={styles.productImageWrap}>
            <Image
              source={product.image}
              style={styles.productImage}
              resizeMode="cover"
            />

            <Pressable
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(product.id)}
            >
              <Text
                style={[
                  styles.favoriteIcon,
                  favorite && styles.favoriteIconActive,
                ]}
              >
                {favorite ? '♥' : '♡'}
              </Text>
            </Pressable>
          </View>
        </Pressable>

        <View style={styles.productInfo}>
          <Text style={styles.productCategory}>
            {product.category}
          </Text>

          <Text style={styles.productName}>{product.name}</Text>

          <Text style={styles.productDescription} numberOfLines={2}>
            {product.description}
          </Text>

          <View style={styles.productBottom}>
            <Text style={styles.productPrice}>
              {formatPrice(product.price)}
            </Text>

            {quantity === 0 ? (
              <Pressable
                style={styles.addButton}
                onPress={() => addToCart(product.id)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </Pressable>
            ) : (
              <View style={styles.quantityControl}>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => decreaseCart(product.id)}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </Pressable>

                <Text style={styles.quantityText}>{quantity}</Text>

                <Pressable
                  style={styles.quantityButton}
                  onPress={() => addToCart(product.id)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        ref={scrollRef}
        style={styles.mainScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <Pressable
              style={styles.headerRoundButton}
              onPress={() => setMenuVisible(true)}
            >
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>

            <View style={styles.logoBlock}>
              <Text
                style={styles.logoTitle}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                Цветочный Склад 24/7
              </Text>
              <Text style={styles.logoSubtitle}>
                цветы с характером
              </Text>
            </View>

            <View style={styles.headerActions}>
              <Pressable
                style={styles.headerRoundButton}
                onPress={() => setFavoritesVisible(true)}
              >
                <Text style={styles.headerHeart}>♥</Text>

                {favorites.length > 0 && (
                  <View style={styles.headerBadge}>
                    <Text style={styles.headerBadgeText}>
                      {favorites.length}
                    </Text>
                  </View>
                )}
              </Pressable>

              <Pressable
                style={styles.headerCart}
                onPress={() => setCartVisible(true)}
              >
                <Text style={styles.headerCartIcon}>🛒</Text>

                {cartCount > 0 && (
                  <View style={styles.headerBadge}>
                    <Text style={styles.headerBadgeText}>
                      {cartCount}
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.heroSection}>
          <View
            style={[
              styles.heroCard,
              isDesktop && styles.heroCardDesktop,
            ]}
          >
            <View
              style={[
                styles.heroTextSide,
                isDesktop && styles.heroTextSideDesktop,
              ]}
            >
              <Text style={styles.heroSmall}>
                ЦВЕТОЧНЫЙ СКЛАД 24/7
              </Text>

              <Text style={styles.heroTitle}>
                Цветы,{'\n'}которые говорят{'\n'}за вас
              </Text>

              <Text style={styles.heroDescription}>
                Собираем букеты и композиции с характером — для любви,
                радости, благодарности и особенных моментов.
              </Text>

              <Pressable
                style={styles.heroButton}
                onPress={scrollToCatalog}
              >
                <Text style={styles.heroButtonText}>
                  Смотреть букеты
                </Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.heroPhotoWrap,
                isDesktop && styles.heroPhotoWrapDesktop,
              ]}
            >
              <Image
                source={HERO_IMAGE}
                style={styles.heroPhoto}
                resizeMode="cover"
              />

              <View style={styles.heroPhotoLabel}>
                <Text style={styles.heroPhotoLabelTitle}>
                  Свежие цветы
                </Text>
                <Text style={styles.heroPhotoLabelText}>
                  каждый день
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* DELIVERY */}
        <View style={styles.deliverySection}>
          <View style={styles.deliveryToggle}>
            <Pressable
              style={[
                styles.deliveryOption,
                deliveryType === 'delivery' &&
                  styles.deliveryOptionActive,
              ]}
              onPress={() => setDeliveryType('delivery')}
            >
              <Text
                style={[
                  styles.deliveryOptionText,
                  deliveryType === 'delivery' &&
                    styles.deliveryOptionTextActive,
                ]}
              >
                Доставка
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.deliveryOption,
                deliveryType === 'pickup' &&
                  styles.deliveryOptionActive,
              ]}
              onPress={() => setDeliveryType('pickup')}
            >
              <Text
                style={[
                  styles.deliveryOptionText,
                  deliveryType === 'pickup' &&
                    styles.deliveryOptionTextActive,
                ]}
              >
                Самовывоз
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.districtButton}
            onPress={() => setDistrictVisible(true)}
          >
            <Text style={styles.districtLabel}>
              {deliveryType === 'delivery' ? 'Район:' : 'Самовывоз:'}
            </Text>

            <Text style={styles.districtValue}>
              {deliveryType === 'delivery'
                ? district
                : PICKUP_ADDRESS}
            </Text>

            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>

        {/* CATALOG */}
        <View
          style={styles.catalogSection}
          onLayout={(event) => setCatalogY(event.nativeEvent.layout.y)}
        >
          <View style={styles.sectionHeadingRow}>
            <View style={styles.sectionHeadingText}>
              <Text style={styles.sectionEyebrow}>НАШ КАТАЛОГ</Text>
              <Text style={styles.sectionTitle}>
                Выберите свой букет
              </Text>
            </View>

            <Text style={styles.productCount}>
              {filteredProducts.length} товаров
            </Text>
          </View>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>⌕</Text>

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Найти букет или композицию"
              placeholderTextColor="#a79898"
              style={styles.searchInput}
            />

            {search.length > 0 && (
              <Pressable onPress={() => setSearch('')}>
                <Text style={styles.searchClear}>×</Text>
              </Pressable>
            )}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category &&
                    styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category &&
                      styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View
            style={[
              styles.productGrid,
              isDesktop && styles.productGridDesktop,
            ]}
          >
            {filteredProducts.map(renderProductCard)}
          </View>

          {filteredProducts.length === 0 && (
            <View style={styles.emptySearch}>
              <Text style={styles.emptySearchEmoji}>🌸</Text>
              <Text style={styles.emptySearchTitle}>
                Ничего не нашли
              </Text>
              <Text style={styles.emptySearchText}>
                Попробуйте изменить запрос или выбрать другую категорию.
              </Text>
            </View>
          )}
        </View>

        {/* ABOUT */}
        <View style={styles.aboutSection}>
          <View style={styles.aboutText}>
            <Text style={styles.sectionEyebrow}>О НАС</Text>
            <Text style={styles.aboutTitle}>Цветы с характером</Text>

            <Text style={styles.aboutDescription}>
              Мы создаём букеты, которые хочется дарить и получать.
              Подбираем свежие цветы, сочетаем оттенки и собираем
              композиции так, чтобы каждый букет выглядел особенным.
            </Text>

            <Text style={styles.aboutDescription}>
              Для нас цветы — это не просто подарок. Это способ сказать
              «люблю», «спасибо», «я рядом» или просто сделать чей-то
              день немного красивее.
            </Text>

            <View style={styles.aboutFeatures}>
              <View style={styles.aboutFeature}>
                <Text style={styles.aboutFeatureIcon}>🌷</Text>
                <View>
                  <Text style={styles.aboutFeatureTitle}>
                    Свежие цветы
                  </Text>
                  <Text style={styles.aboutFeatureText}>
                    Собираем букеты с заботой
                  </Text>
                </View>
              </View>

              <View style={styles.aboutFeature}>
                <Text style={styles.aboutFeatureIcon}>💐</Text>
                <View>
                  <Text style={styles.aboutFeatureTitle}>
                    Авторские букеты
                  </Text>
                  <Text style={styles.aboutFeatureText}>
                    Красиво и с характером
                  </Text>
                </View>
              </View>

              <View style={styles.aboutFeature}>
                <Text style={styles.aboutFeatureIcon}>🚚</Text>
                <View>
                  <Text style={styles.aboutFeatureTitle}>Доставка</Text>
                  <Text style={styles.aboutFeatureText}>
                    Привезём ваш заказ
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.aboutPhotos}>
            <Image
              source={PINK_WHITE}
              style={styles.aboutPhotoLarge}
              resizeMode="cover"
            />

            <View style={styles.aboutPhotosSmall}>
              <Image
                source={PEONY}
                style={styles.aboutPhotoSmall}
                resizeMode="cover"
              />
              <Image
                source={ROMANTIC}
                style={styles.aboutPhotoSmall}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* CONTACT */}
        <View style={styles.contactOuter}>
          <View style={styles.contactSection}>
            <View>
              <Text style={styles.sectionEyebrow}>МЫ НА СВЯЗИ</Text>
              <Text style={styles.contactTitle}>
                Есть вопросы по букету?
              </Text>
              <Text style={styles.contactText}>
                Позвоните нам — поможем выбрать цветы и оформить заказ.
              </Text>
            </View>

            <Pressable
              style={styles.phoneButton}
              onPress={() => openPage('Позвонить нам')}
            >
              <Text style={styles.phoneButtonText}>Позвонить нам</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>Цветочный Склад 24/7</Text>
          <Text style={styles.footerText}>
            Цветы, которые говорят за вас
          </Text>
          <Text style={styles.footerCopy}>
            © 2026 Цветочный Склад 24/7
          </Text>
        </View>
      </ScrollView>

      {/* COMPACT FLOATING CART */}
      {cartCount > 0 && (
        <Pressable
          style={styles.floatingCart}
          onPress={() => setCartVisible(true)}
        >
          <Text style={styles.floatingCartIcon}>🛒</Text>

          <View style={styles.floatingCartText}>
            <Text style={styles.floatingCartCount}>
              {cartCount}{' '}
              {cartCount === 1
                ? 'товар'
                : cartCount < 5
                ? 'товара'
                : 'товаров'}
            </Text>
            <Text style={styles.floatingCartPrice}>
              {formatPrice(cartTotal)}
            </Text>
          </View>
        </Pressable>
      )}

      {/* FAVORITES */}
      <Modal
        visible={favoritesVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFavoritesVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.favoritesModal,
              isDesktop && styles.largeModalDesktop,
            ]}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalHeaderTitle}>Избранное ♥</Text>
                <Text style={styles.modalHeaderSubtitle}>
                  {favorites.length} сохранено
                </Text>
              </View>

              <Pressable onPress={() => setFavoritesVisible(false)}>
                <Text style={styles.modalCloseText}>×</Text>
              </Pressable>
            </View>

            {favoriteProducts.length === 0 ? (
              <View style={styles.emptyFavorites}>
                <Text style={styles.emptyCartEmoji}>♡</Text>
                <Text style={styles.emptyCartTitle}>
                  Избранное пока пусто
                </Text>
                <Text style={styles.emptyCartText}>
                  Нажмите на сердечко у понравившегося букета.
                </Text>

                <Pressable
                  style={styles.continueButton}
                  onPress={() => {
                    setFavoritesVisible(false);
                    setTimeout(scrollToCatalog, 200);
                  }}
                >
                  <Text style={styles.continueButtonText}>
                    Смотреть букеты
                  </Text>
                </Pressable>
              </View>
            ) : (
              <ScrollView
                contentContainerStyle={styles.favoriteList}
                showsVerticalScrollIndicator={false}
              >
                {favoriteProducts.map((product) => (
                  <View key={product.id} style={styles.favoriteItem}>
                    <Pressable
                      onPress={() => {
                        setFavoritesVisible(false);
                        setSelectedProduct(product);
                      }}
                    >
                      <Image
                        source={product.image}
                        style={styles.favoriteItemImage}
                        resizeMode="cover"
                      />
                    </Pressable>

                    <View style={styles.favoriteItemContent}>
                      <Text style={styles.favoriteItemCategory}>
                        {product.category}
                      </Text>
                      <Text style={styles.favoriteItemName}>
                        {product.name}
                      </Text>
                      <Text style={styles.favoriteItemPrice}>
                        {formatPrice(product.price)}
                      </Text>

                      <View style={styles.favoriteItemActions}>
                        <Pressable
                          style={styles.favoriteAddCart}
                          onPress={() => addToCart(product.id)}
                        >
                          <Text style={styles.favoriteAddCartText}>
                            В корзину
                          </Text>
                        </Pressable>

                        <Pressable
                          style={styles.favoriteRemove}
                          onPress={() => toggleFavorite(product.id)}
                        >
                          <Text style={styles.favoriteRemoveText}>♥</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* PRODUCT */}
      <Modal
        visible={!!selectedProduct}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedProduct(null)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.productModal,
              isDesktop && styles.productModalDesktop,
            ]}
          >
            {selectedProduct && (
              <>
                <Pressable
                  style={styles.modalClose}
                  onPress={() => setSelectedProduct(null)}
                >
                  <Text style={styles.modalCloseText}>×</Text>
                </Pressable>

                <Image
                  source={selectedProduct.image}
                  style={styles.modalProductImage}
                  resizeMode="cover"
                />

                <View style={styles.modalProductInfo}>
                  <Text style={styles.modalCategory}>
                    {selectedProduct.category}
                  </Text>
                  <Text style={styles.modalProductName}>
                    {selectedProduct.name}
                  </Text>
                  <Text style={styles.modalProductDescription}>
                    {selectedProduct.description}
                  </Text>

                  <Text style={styles.modalPrice}>
                    {formatPrice(selectedProduct.price)}
                  </Text>

                  <View style={styles.productModalButtons}>
                    <Pressable
                      style={styles.modalFavoriteButton}
                      onPress={() =>
                        toggleFavorite(selectedProduct.id)
                      }
                    >
                      <Text style={styles.modalFavoriteButtonText}>
                        {favorites.includes(selectedProduct.id)
                          ? '♥ В избранном'
                          : '♡ В избранное'}
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.modalAddButton}
                      onPress={() => {
                        addToCart(selectedProduct.id);
                        setSelectedProduct(null);
                      }}
                    >
                      <Text style={styles.modalAddButtonText}>
                        Добавить в корзину
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* CART */}
      <Modal
        visible={cartVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCartVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.cartModal,
              isDesktop && styles.largeModalDesktop,
            ]}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalHeaderTitle}>Корзина</Text>
                <Text style={styles.modalHeaderSubtitle}>
                  {cartCount}{' '}
                  {cartCount === 1
                    ? 'товар'
                    : cartCount < 5
                    ? 'товара'
                    : 'товаров'}
                </Text>
              </View>

              <Pressable onPress={() => setCartVisible(false)}>
                <Text style={styles.modalCloseText}>×</Text>
              </Pressable>
            </View>

            {cartItems.length === 0 ? (
              <View style={styles.emptyCart}>
                <Text style={styles.emptyCartEmoji}>🛒</Text>
                <Text style={styles.emptyCartTitle}>
                  Корзина пока пуста
                </Text>
                <Text style={styles.emptyCartText}>
                  Добавьте понравившийся букет.
                </Text>

                <Pressable
                  style={styles.continueButton}
                  onPress={() => setCartVisible(false)}
                >
                  <Text style={styles.continueButtonText}>
                    Перейти к букетам
                  </Text>
                </Pressable>
              </View>
            ) : (
              <>
                <ScrollView
                  style={styles.cartList}
                  showsVerticalScrollIndicator={false}
                >
                  {cartItems.map(({ product, quantity }) => (
                    <View key={product.id} style={styles.cartItem}>
                      <Image
                        source={product.image}
                        style={styles.cartItemImage}
                        resizeMode="cover"
                      />

                      <View style={styles.cartItemContent}>
                        <Text style={styles.cartItemName}>
                          {product.name}
                        </Text>
                        <Text style={styles.cartItemPrice}>
                          {formatPrice(product.price)}
                        </Text>

                        <View style={styles.cartItemBottom}>
                          <View style={styles.quantityControl}>
                            <Pressable
                              style={styles.quantityButton}
                              onPress={() =>
                                decreaseCart(product.id)
                              }
                            >
                              <Text style={styles.quantityButtonText}>
                                −
                              </Text>
                            </Pressable>

                            <Text style={styles.quantityText}>
                              {quantity}
                            </Text>

                            <Pressable
                              style={styles.quantityButton}
                              onPress={() => addToCart(product.id)}
                            >
                              <Text style={styles.quantityButtonText}>
                                +
                              </Text>
                            </Pressable>
                          </View>

                          <Pressable
                            onPress={() =>
                              removeFromCart(product.id)
                            }
                          >
                            <Text style={styles.removeText}>
                              Удалить
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.cartTotalBox}>
                  <View style={styles.cartTotalRow}>
                    <Text style={styles.cartTotalLabel}>Итого</Text>
                    <Text style={styles.cartTotalValue}>
                      {formatPrice(cartTotal)}
                    </Text>
                  </View>

                  <Pressable
                    style={styles.checkoutButton}
                    onPress={() => {
                      setCartVisible(false);
                      setCheckoutVisible(true);
                    }}
                  >
                    <Text style={styles.checkoutButtonText}>
                      Оформить заказ
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* CHECKOUT */}
      <Modal
        visible={checkoutVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCheckoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.checkoutModal,
              isDesktop && styles.largeModalDesktop,
            ]}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalHeaderTitle}>
                  Оформление заказа
                </Text>
                <Text style={styles.modalHeaderSubtitle}>
                  Итого: {formatPrice(cartTotal)}
                </Text>
              </View>

              <Pressable onPress={() => setCheckoutVisible(false)}>
                <Text style={styles.modalCloseText}>×</Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.checkoutScroll}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.inputLabel}>Ваше имя</Text>
              <TextInput
                value={customerName}
                onChangeText={setCustomerName}
                placeholder="Введите имя"
                placeholderTextColor="#a79898"
                style={styles.input}
              />

              <Text style={styles.inputLabel}>Телефон</Text>
              <TextInput
                value={customerPhone}
                onChangeText={setCustomerPhone}
                placeholder="+7 ..."
                placeholderTextColor="#a79898"
                keyboardType="phone-pad"
                style={styles.input}
              />

              <Text style={styles.inputLabel}>
                {deliveryType === 'delivery'
                  ? 'Адрес доставки'
                  : 'Комментарий'}
              </Text>

              <TextInput
                value={customerAddress}
                onChangeText={setCustomerAddress}
                placeholder={
                  deliveryType === 'delivery'
                    ? 'Введите адрес'
                    : 'Напишите комментарий'
                }
                placeholderTextColor="#a79898"
                multiline
                style={[styles.input, styles.textarea]}
              />

              <Text style={styles.inputLabel}>Способ оплаты</Text>

              <View style={styles.paymentRow}>
                <View
                  style={[
                    styles.paymentOption,
                    styles.paymentOptionActive,
                  ]}
                >
                  <Text style={styles.paymentIcon}>💵</Text>
                  <Text style={styles.paymentText}>Наличные</Text>
                </View>

                <View style={styles.paymentOption}>
                  <Text style={styles.paymentIcon}>💳</Text>
                  <Text style={styles.paymentText}>Карта онлайн</Text>
                </View>
              </View>

              <Pressable
                style={styles.checkoutButton}
                onPress={submitOrder}
              >
                <Text style={styles.checkoutButtonText}>
                  Подтвердить заказ
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* DISTRICT */}
      <Modal
        visible={districtVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDistrictVisible(false)}
      >
        <View style={styles.centerModalOverlay}>
          <View style={styles.simpleModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>
                Район доставки
              </Text>
              <Pressable onPress={() => setDistrictVisible(false)}>
                <Text style={styles.modalCloseText}>×</Text>
              </Pressable>
            </View>

            {[
              'В черте города',
              'За пределами города',
              'Уточнить при звонке',
            ].map((item) => (
              <Pressable
                key={item}
                style={styles.districtOption}
                onPress={() => {
                  setDistrict(item);
                  setDistrictVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.districtOptionText,
                    district === item &&
                      styles.districtOptionTextActive,
                  ]}
                >
                  {item}
                </Text>

                {district === item && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      {/* MENU */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <SafeAreaView style={styles.menuOverlay} edges={['top', 'bottom']}>
          <View
            style={[
              styles.drawer,
              isDesktop && styles.drawerDesktop,
            ]}
          >
            <View style={styles.drawerTop}>
              <View>
                <Text style={styles.drawerBrand}>Цветочный Склад</Text>
                <Text style={styles.drawerBrandAccent}>24/7</Text>
                <Text style={styles.drawerSubtitle}>
                  цветы с характером
                </Text>
              </View>

              <Pressable onPress={() => setMenuVisible(false)}>
                <Text style={styles.drawerClose}>×</Text>
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.drawerScroll}
            >
              <Pressable
                style={styles.drawerItem}
                onPress={() => openPage('Профиль')}
              >
                <Text style={styles.drawerIcon}>👤</Text>
                <Text style={styles.drawerItemText}>Профиль</Text>
              </Pressable>

              <Pressable
                style={styles.drawerItem}
                onPress={() => {
                  setMenuVisible(false);
                  scrollToCatalog();
                }}
              >
                <Text style={styles.drawerIcon}>🌷</Text>
                <Text style={styles.drawerItemText}>Каталог</Text>
              </Pressable>

              <Pressable
                style={styles.drawerItem}
                onPress={() => {
                  setMenuVisible(false);
                  setFavoritesVisible(true);
                }}
              >
                <Text style={styles.drawerIcon}>♥</Text>
                <View style={styles.drawerCartRow}>
                  <Text style={styles.drawerItemText}>Избранное</Text>
                  {favorites.length > 0 && (
                    <Text style={styles.drawerCartPrice}>
                      {favorites.length}
                    </Text>
                  )}
                </View>
              </Pressable>

              <Pressable
                style={styles.drawerItem}
                onPress={() => {
                  setMenuVisible(false);
                  setCartVisible(true);
                }}
              >
                <Text style={styles.drawerIcon}>🛒</Text>
                <View style={styles.drawerCartRow}>
                  <Text style={styles.drawerItemText}>Корзина</Text>
                  <Text style={styles.drawerCartPrice}>
                    {formatPrice(cartTotal)}
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.drawerItem}
                onPress={() => openPage('История заказов')}
              >
                <Text style={styles.drawerIcon}>🧾</Text>
                <Text style={styles.drawerItemText}>
                  История заказов
                </Text>
              </Pressable>

              <Pressable
                style={styles.drawerItem}
                onPress={() => openPage('Отзывы')}
              >
                <Text style={styles.drawerIcon}>⭐</Text>
                <Text style={styles.drawerItemText}>Отзывы</Text>
              </Pressable>

              <Pressable
                style={styles.drawerItem}
                onPress={() => openPage('Уведомления')}
              >
                <Text style={styles.drawerIcon}>🔔</Text>
                <Text style={styles.drawerItemText}>Уведомления</Text>
              </Pressable>

              <View style={styles.drawerDivider} />

              <Pressable
                style={styles.drawerItem}
                onPress={() => openPage('О нас')}
              >
                <Text style={styles.drawerIcon}>💐</Text>
                <Text style={styles.drawerItemText}>О нас</Text>
              </Pressable>

              <Pressable
                style={styles.drawerItem}
                onPress={() => openPage('Настройки')}
              >
                <Text style={styles.drawerIcon}>⚙️</Text>
                <Text style={styles.drawerItemText}>Настройки</Text>
              </Pressable>

              <Pressable
                style={styles.drawerItem}
                onPress={() => openPage('Позвонить нам')}
              >
                <Text style={styles.drawerIcon}>📞</Text>
                <Text style={styles.drawerItemText}>Позвонить нам</Text>
              </Pressable>

              <Pressable
                style={styles.drawerItem}
                onPress={() => openPage('О приложении')}
              >
                <Text style={styles.drawerIcon}>ℹ️</Text>
                <Text style={styles.drawerItemText}>О приложении</Text>
              </Pressable>
            </ScrollView>

            <View style={styles.drawerBottom}>
              <Text style={styles.drawerSocial}>VK</Text>
              <Text style={styles.drawerPhone}>{SHOP_PHONE}</Text>
            </View>
          </View>

          <Pressable
            style={styles.drawerOutside}
            onPress={() => setMenuVisible(false)}
          />
        </SafeAreaView>
      </Modal>

      {/* SIMPLE PAGES */}
      <Modal
        visible={!!pageVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPageVisible(null)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.pageModal,
              isDesktop && styles.largeModalDesktop,
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>
                {pageVisible
                  ? pageTitle[pageVisible] || pageVisible
                  : ''}
              </Text>

              <Pressable onPress={() => setPageVisible(null)}>
                <Text style={styles.modalCloseText}>×</Text>
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.pageContent}
            >
              {pageVisible === 'Профиль' && (
                <>
                  <Text style={styles.pageEmoji}>👤</Text>
                  <Text style={styles.pageTitle}>Ваш профиль</Text>
                  <Text style={styles.pageText}>
                    Здесь позже можно будет хранить данные клиента,
                    адреса и историю покупок.
                  </Text>
                </>
              )}

              {pageVisible === 'История заказов' && (
                <>
                  <Text style={styles.pageEmoji}>🧾</Text>
                  <Text style={styles.pageTitle}>История заказов</Text>
                  <Text style={styles.pageText}>
                    После подключения базы данных здесь будут
                    отображаться ваши прошлые заказы.
                  </Text>
                </>
              )}

              {pageVisible === 'Отзывы' && (
                <>
                  <Text style={styles.pageEmoji}>⭐</Text>
                  <Text style={styles.pageTitle}>Отзывы клиентов</Text>
                  <Text style={styles.pageText}>
                    Раздел подготовлен. Позже добавим настоящие отзывы
                    покупателей.
                  </Text>
                </>
              )}

              {pageVisible === 'Уведомления' && (
                <>
                  <Text style={styles.pageEmoji}>🔔</Text>
                  <Text style={styles.pageTitle}>Уведомления</Text>
                  <Text style={styles.pageText}>
                    Здесь будут акции, новости и информация по заказам.
                  </Text>
                </>
              )}

              {pageVisible === 'О нас' && (
                <>
                  <Text style={styles.pageEmoji}>💐</Text>
                  <Text style={styles.pageTitle}>
                    Цветы с характером
                  </Text>
                  <Text style={styles.pageText}>
                    Цветочный Склад 24/7 — это букеты и композиции,
                    которые помогают сказать важные слова без лишних
                    объяснений.
                  </Text>
                </>
              )}

              {pageVisible === 'Настройки' && (
                <>
                  <Text style={styles.pageEmoji}>⚙️</Text>
                  <Text style={styles.pageTitle}>Настройки</Text>
                  <Text style={styles.pageText}>
                    Здесь позже появятся настройки приложения,
                    уведомлений и профиля.
                  </Text>
                </>
              )}

              {pageVisible === 'Позвонить нам' && (
                <>
                  <Text style={styles.pageEmoji}>📞</Text>
                  <Text style={styles.pageTitle}>Мы на связи</Text>
                  <Text style={styles.pageText}>
                    Телефон магазина:
                  </Text>
                  <Text style={styles.pagePhone}>{SHOP_PHONE}</Text>
                </>
              )}

              {pageVisible === 'О приложении' && (
                <>
                  <Text style={styles.pageEmoji}>🌷</Text>
                  <Text style={styles.pageTitle}>
                    Цветочный Склад 24/7
                  </Text>
                  <Text style={styles.pageText}>
                    Приложение цветочного магазина. Здесь можно выбрать
                    букет, сохранить его в избранное, добавить в корзину
                    и оформить заказ.
                  </Text>
                  <Text style={styles.pageVersion}>Версия 1.0</Text>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#fdf0f1',
  },

  mainScroll: {
    flex: 1,
    backgroundColor: '#fdf0f1',
  },

  scrollContent: {
    paddingBottom: 110,
    backgroundColor: '#fdf0f1',
  },

  header: {
    backgroundColor: '#fff7f6',
    borderBottomWidth: 1,
    borderBottomColor: '#f1dfdc',
  },

  headerInner: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    minHeight: 68,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerRoundButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ead8d5',
    position: 'relative',
  },

  menuIcon: {
    fontSize: 21,
    color: '#563f3d',
  },

  logoBlock: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  logoTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: '900',
    color: '#563f3d',
    textAlign: 'center',
  },

  logoSubtitle: {
    marginTop: 2,
    fontSize: 8,
    color: '#a57975',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  headerHeart: {
    color: '#d87982',
    fontSize: 21,
  },

  headerCart: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f2a5a9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  headerCartIcon: {
    fontSize: 18,
  },

  headerBadge: {
    position: 'absolute',
    right: -3,
    top: -4,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#563f3d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  headerBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
  },

  heroSection: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 8,
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
  },

  heroCard: {
    backgroundColor: '#f5d9d5',
    borderRadius: 28,
    overflow: 'hidden',
    minHeight: 520,
  },

  heroCardDesktop: {
    flexDirection: 'row',
    minHeight: 510,
  },

  heroTextSide: {
    paddingHorizontal: 28,
    paddingTop: 38,
    paddingBottom: 34,
    flex: 1,
    justifyContent: 'center',
  },

  heroTextSideDesktop: {
    paddingHorizontal: 55,
    paddingVertical: 55,
  },

  heroSmall: {
    color: '#9a6a67',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 14,
  },

  heroTitle: {
    color: '#493635',
    fontSize: 43,
    lineHeight: 47,
    fontWeight: '900',
    letterSpacing: -1,
  },

  heroDescription: {
    marginTop: 18,
    color: '#765b58',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 530,
  },

  heroButton: {
    marginTop: 25,
    backgroundColor: '#563f3d',
    minHeight: 54,
    paddingHorizontal: 25,
    borderRadius: 27,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },

  heroButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },

  heroPhotoWrap: {
    height: 360,
    position: 'relative',
    overflow: 'hidden',
  },

  heroPhotoWrapDesktop: {
    flex: 1,
    height: '100%',
    minHeight: 510,
  },

  heroPhoto: {
    width: '100%',
    height: '100%',
  },

  heroPhotoLabel: {
    position: 'absolute',
    left: 18,
    bottom: 18,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  heroPhotoLabelTitle: {
    color: '#563f3d',
    fontSize: 13,
    fontWeight: '800',
  },

  heroPhotoLabelText: {
    color: '#9a7774',
    fontSize: 11,
    marginTop: 2,
  },

  deliverySection: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingTop: 16,
  },

  deliveryToggle: {
    flexDirection: 'row',
    backgroundColor: '#f4dedf',
    borderRadius: 18,
    padding: 4,
  },

  deliveryOption: {
    flex: 1,
    minHeight: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deliveryOptionActive: {
    backgroundColor: '#fff',
  },

  deliveryOptionText: {
    fontSize: 14,
    color: '#987d79',
    fontWeight: '700',
  },

  deliveryOptionTextActive: {
    color: '#563f3d',
  },

  districtButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    minHeight: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eedcdd',
  },

  districtLabel: {
    color: '#9a7d79',
    fontSize: 13,
  },

  districtValue: {
    flex: 1,
    color: '#563f3d',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
  },

  chevron: {
    color: '#9a7d79',
    fontSize: 26,
  },

  catalogSection: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingTop: 30,
  },

  sectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  sectionHeadingText: {
    flex: 1,
    paddingRight: 10,
  },

  sectionEyebrow: {
    color: '#b17c78',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.7,
    marginBottom: 5,
  },

  sectionTitle: {
    color: '#493635',
    fontSize: 27,
    fontWeight: '900',
  },

  productCount: {
    color: '#a38b88',
    fontSize: 12,
    marginBottom: 4,
  },

  searchBox: {
    marginTop: 18,
    height: 50,
    borderRadius: 17,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eadedc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  searchIcon: {
    fontSize: 24,
    color: '#a88b87',
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: '#563f3d',
    fontSize: 14,
    minHeight: 48,
    outlineStyle: 'none',
  } as any,

  searchClear: {
    fontSize: 24,
    color: '#a88b87',
  },

  categoryRow: {
    paddingTop: 14,
    paddingBottom: 18,
    gap: 8,
  },

  categoryChip: {
    borderRadius: 22,
    paddingHorizontal: 18,
    minHeight: 42,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eadedc',
  },

  categoryChipActive: {
    backgroundColor: '#563f3d',
    borderColor: '#563f3d',
  },

  categoryChipText: {
    color: '#765f5c',
    fontSize: 13,
    fontWeight: '700',
  },

  categoryChipTextActive: {
    color: '#fff',
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },

  productGridDesktop: {
    marginHorizontal: -7,
  },

  productCard: {
    width: '50%',
    padding: 5,
    marginBottom: 8,
  },

  productCardTablet: {
    width: '33.333%',
  },

  productCardDesktop: {
    width: '25%',
    padding: 7,
  },

  productImageWrap: {
    width: '100%',
    aspectRatio: 0.9,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f0e5e3',
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoriteIcon: {
    color: '#d47980',
    fontSize: 23,
  },

  favoriteIconActive: {
    color: '#d15f6a',
  },

  productInfo: {
    paddingHorizontal: 3,
    paddingTop: 9,
  },

  productCategory: {
    color: '#b28d89',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  productName: {
    color: '#4f3b39',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 2,
  },

  productDescription: {
    color: '#907977',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
    minHeight: 32,
  },

  productBottom: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  productPrice: {
    color: '#493635',
    fontSize: 16,
    fontWeight: '900',
    flexShrink: 1,
  },

  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ef9da4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 28,
    marginTop: -2,
  },

  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4e8e6',
    borderRadius: 20,
    minHeight: 40,
    paddingHorizontal: 4,
  },

  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityButtonText: {
    color: '#563f3d',
    fontSize: 21,
    fontWeight: '700',
  },

  quantityText: {
    color: '#563f3d',
    fontSize: 14,
    fontWeight: '900',
    minWidth: 22,
    textAlign: 'center',
  },

  emptySearch: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  emptySearchEmoji: {
    fontSize: 44,
  },

  emptySearchTitle: {
    color: '#563f3d',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 10,
  },

  emptySearchText: {
    color: '#947c78',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },

  aboutSection: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    marginTop: 38,
    paddingHorizontal: 20,
    paddingVertical: 34,
    backgroundColor: '#f5dfe1',
  },

  aboutText: {
    flex: 1,
  },

  aboutTitle: {
    color: '#493635',
    fontSize: 34,
    lineHeight: 39,
    fontWeight: '900',
    marginBottom: 14,
  },

  aboutDescription: {
    color: '#765b58',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12,
    maxWidth: 680,
  },

  aboutFeatures: {
    marginTop: 12,
    gap: 12,
  },

  aboutFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  aboutFeatureIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    marginRight: 10,
  },

  aboutFeatureTitle: {
    color: '#563f3d',
    fontSize: 13,
    fontWeight: '900',
  },

  aboutFeatureText: {
    color: '#927673',
    fontSize: 11,
    marginTop: 2,
  },

  aboutPhotos: {
    marginTop: 24,
    gap: 8,
  },

  aboutPhotoLarge: {
    width: '100%',
    height: 230,
    borderRadius: 22,
  },

  aboutPhotosSmall: {
    flexDirection: 'row',
    gap: 8,
  },

  aboutPhotoSmall: {
    flex: 1,
    height: 150,
    borderRadius: 18,
  },

  contactOuter: {
    paddingHorizontal: 14,
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
  },

  contactSection: {
    marginTop: 20,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eadedc',
  },

  contactTitle: {
    color: '#493635',
    fontSize: 23,
    fontWeight: '900',
    marginTop: 2,
  },

  contactText: {
    color: '#8d7571',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 5,
  },

  phoneButton: {
    marginTop: 18,
    alignSelf: 'flex-start',
    backgroundColor: '#563f3d',
    borderRadius: 24,
    paddingHorizontal: 22,
    minHeight: 46,
    justifyContent: 'center',
  },

  phoneButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },

  footer: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 30,
    alignItems: 'center',
  },

  footerBrand: {
    color: '#563f3d',
    fontSize: 18,
    fontWeight: '900',
  },

  footerText: {
    color: '#a0807c',
    fontSize: 12,
    marginTop: 4,
  },

  footerCopy: {
    color: '#b6a3a0',
    fontSize: 10,
    marginTop: 18,
  },

  floatingCart: {
    position: 'absolute',
    right: 16,
    bottom: 18,
    minHeight: 58,
    maxWidth: 190,
    backgroundColor: '#563f3d',
    borderRadius: 29,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },

  floatingCartIcon: {
    fontSize: 21,
    marginRight: 8,
  },

  floatingCartText: {
    flexShrink: 1,
  },

  floatingCartCount: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },

  floatingCartPrice: {
    color: '#ead7d4',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(40,25,24,0.48)',
    justifyContent: 'flex-end',
  },

  centerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(40,25,24,0.48)',
    justifyContent: 'center',
  },

  favoritesModal: {
    backgroundColor: '#fff7f6',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
    minHeight: 430,
  },

  favoriteList: {
    padding: 18,
    paddingBottom: 35,
  },

  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0dfdd',
  },

  favoriteItemImage: {
    width: 105,
    height: 125,
    borderRadius: 15,
  },

  favoriteItemContent: {
    flex: 1,
    marginLeft: 13,
    justifyContent: 'center',
  },

  favoriteItemCategory: {
    color: '#b28d89',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  favoriteItemName: {
    color: '#563f3d',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 3,
  },

  favoriteItemPrice: {
    color: '#563f3d',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 5,
  },

  favoriteItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  favoriteAddCart: {
    flex: 1,
    minHeight: 38,
    borderRadius: 19,
    backgroundColor: '#563f3d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoriteAddCartText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },

  favoriteRemove: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f7e6e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  favoriteRemoveText: {
    color: '#d15f6a',
    fontSize: 20,
  },

  emptyFavorites: {
    flex: 1,
    minHeight: 350,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 35,
  },

  productModal: {
    backgroundColor: '#fffaf9',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
    maxHeight: '94%',
  },

  productModalDesktop: {
    width: 600,
    alignSelf: 'center',
    borderRadius: 28,
    marginBottom: 30,
  },

  largeModalDesktop: {
    width: 650,
    alignSelf: 'center',
    borderRadius: 28,
    marginBottom: 30,
  },

  modalClose: {
    position: 'absolute',
    zIndex: 10,
    right: 14,
    top: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCloseText: {
    color: '#563f3d',
    fontSize: 30,
    lineHeight: 32,
  },

  modalProductImage: {
    width: '100%',
    height: 350,
  },

  modalProductInfo: {
    padding: 24,
  },

  modalCategory: {
    color: '#b17c78',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  modalProductName: {
    color: '#493635',
    fontSize: 29,
    fontWeight: '900',
    marginTop: 5,
  },

  modalProductDescription: {
    color: '#846d69',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
  },

  modalPrice: {
    color: '#493635',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 18,
  },

  productModalButtons: {
    marginTop: 20,
    gap: 9,
  },

  modalFavoriteButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f6e3e4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalFavoriteButtonText: {
    color: '#b85f68',
    fontSize: 13,
    fontWeight: '900',
  },

  modalAddButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#563f3d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalAddButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },

  cartModal: {
    backgroundColor: '#fffaf9',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
    minHeight: 400,
  },

  modalHeader: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee1df',
  },

  modalHeaderTitle: {
    color: '#493635',
    fontSize: 22,
    fontWeight: '900',
  },

  modalHeaderSubtitle: {
    color: '#a08783',
    fontSize: 12,
    marginTop: 2,
  },

  emptyCart: {
    flex: 1,
    minHeight: 320,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },

  emptyCartEmoji: {
    fontSize: 48,
  },

  emptyCartTitle: {
    color: '#563f3d',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 12,
  },

  emptyCartText: {
    color: '#9a817d',
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
  },

  continueButton: {
    marginTop: 20,
    backgroundColor: '#563f3d',
    borderRadius: 23,
    paddingHorizontal: 20,
    minHeight: 46,
    justifyContent: 'center',
  },

  continueButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },

  cartList: {
    paddingHorizontal: 18,
  },

  cartItem: {
    flexDirection: 'row',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#eee1df',
  },

  cartItemImage: {
    width: 78,
    height: 78,
    borderRadius: 16,
  },

  cartItemContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  cartItemName: {
    color: '#563f3d',
    fontSize: 15,
    fontWeight: '900',
  },

  cartItemPrice: {
    color: '#9a7d79',
    fontSize: 12,
    marginTop: 3,
  },

  cartItemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  removeText: {
    color: '#b17c78',
    fontSize: 11,
    fontWeight: '700',
  },

  cartTotalBox: {
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: '#eadedc',
    backgroundColor: '#fff',
  },

  cartTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cartTotalLabel: {
    color: '#8e7773',
    fontSize: 13,
  },

  cartTotalValue: {
    color: '#493635',
    fontSize: 21,
    fontWeight: '900',
  },

  checkoutButton: {
    marginTop: 14,
    minHeight: 54,
    borderRadius: 27,
    backgroundColor: '#563f3d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },

  checkoutModal: {
    backgroundColor: '#fffaf9',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '94%',
  },

  checkoutScroll: {
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  inputLabel: {
    color: '#563f3d',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 15,
    marginBottom: 7,
  },

  input: {
    minHeight: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eadedc',
    borderRadius: 15,
    paddingHorizontal: 14,
    color: '#563f3d',
    fontSize: 14,
    outlineStyle: 'none',
  } as any,

  textarea: {
    minHeight: 90,
    paddingTop: 13,
    textAlignVertical: 'top',
  },

  paymentRow: {
    flexDirection: 'row',
    gap: 8,
  },

  paymentOption: {
    flex: 1,
    minHeight: 58,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eadedc',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentOptionActive: {
    borderColor: '#563f3d',
    backgroundColor: '#f7eeec',
  },

  paymentIcon: {
    fontSize: 18,
  },

  paymentText: {
    color: '#563f3d',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 3,
  },

  simpleModal: {
    backgroundColor: '#fffaf9',
    width: '90%',
    maxWidth: 520,
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },

  districtOption: {
    minHeight: 58,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee1df',
    flexDirection: 'row',
    alignItems: 'center',
  },

  districtOptionText: {
    flex: 1,
    color: '#765f5c',
    fontSize: 14,
  },

  districtOptionTextActive: {
    color: '#563f3d',
    fontWeight: '900',
  },

  checkMark: {
    color: '#d77f87',
    fontSize: 20,
    fontWeight: '900',
  },

  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(30,20,20,0.45)',
  },

  drawer: {
    width: '84%',
    maxWidth: 390,
    height: '100%',
    backgroundColor: '#fffaf9',
    paddingTop: 10,
    paddingBottom: 18,
  },

  drawerDesktop: {
    width: 390,
  },

  drawerTop: {
    paddingHorizontal: 22,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#eee1df',
  },

  drawerBrand: {
    color: '#563f3d',
    fontSize: 22,
    fontWeight: '900',
  },

  drawerBrandAccent: {
    color: '#d97e86',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 32,
  },

  drawerSubtitle: {
    color: '#a47f7a',
    fontSize: 10,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },

  drawerClose: {
    color: '#563f3d',
    fontSize: 32,
    lineHeight: 32,
  },

  drawerScroll: {
    flex: 1,
    paddingTop: 10,
  },

  drawerItem: {
    minHeight: 52,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },

  drawerIcon: {
    width: 30,
    fontSize: 19,
    color: '#d06e78',
  },

  drawerItemText: {
    color: '#563f3d',
    fontSize: 14,
    fontWeight: '700',
  },

  drawerCartRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  drawerCartPrice: {
    color: '#a47f7a',
    fontSize: 12,
    fontWeight: '700',
  },

  drawerDivider: {
    height: 1,
    backgroundColor: '#eee1df',
    marginVertical: 8,
  },

  drawerBottom: {
    paddingHorizontal: 22,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee1df',
  },

  drawerSocial: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#563f3d',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 11,
    fontWeight: '900',
    overflow: 'hidden',
  },

  drawerPhone: {
    color: '#9b817d',
    fontSize: 11,
    marginTop: 10,
  },

  drawerOutside: {
    flex: 1,
  },

  pageModal: {
    backgroundColor: '#fffaf9',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '88%',
  },

  pageContent: {
    padding: 28,
    alignItems: 'center',
    paddingBottom: 45,
  },

  pageEmoji: {
    fontSize: 55,
    marginBottom: 12,
  },

  pageTitle: {
    color: '#493635',
    fontSize: 27,
    fontWeight: '900',
    textAlign: 'center',
  },

  pageText: {
    color: '#806b67',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 520,
  },

  pagePhone: {
    color: '#563f3d',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 10,
  },

  pageVersion: {
    color: '#ad9995',
    fontSize: 11,
    marginTop: 22,
  },
});

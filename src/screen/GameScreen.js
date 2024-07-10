import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Animated,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import levels from '../component/LevelComponent/Level';
import Icon from 'react-native-vector-icons/Foundation';
import Bars from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {
  BannerAd,
  BannerAdSize,
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import BackgroundColors from '../component/BackgroundColor';

const BanneradUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-5143726889879453/6846003897';
const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-5143726889879453/1193587500';
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['game', 'puzzle'],
});

const GameScreen = ({route, navigation}) => {
  const [levelIndex, setLevelIndex] = useState(route.params?.indexLevel ?? 0);
  const [columns, setColumns] = useState([]);
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const completionAnim = useRef(new Animated.Value(0)).current;
  const [isGameActive, setIsGameActive] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const animationRef = useRef(null);
  const [isLoadingAd, setIsLoadingAd] = useState(false);
  const [selectedDiskAnim, setSelectedDiskAnim] = useState(
    new Animated.Value(0),
  );

  const [showStackAnimation, setShowStackAnimation] = useState(
    new Array(levels[levelIndex].numberOfStacks).fill(false),
  );

  const BASE_HEIGHT = 10;  // Base height of the stack when it is empty
  const HEIGHT_PER_DISK = 50;  // Height added for each disk


  const messages = useMemo(
    () => ['Great job!', 'Well done!', 'Keep it up!', 'Nice work!'],
    [],
  );
  const randomMessage = useMemo(
    () => messages[Math.floor(Math.random() * messages.length)],
    [messages],
  );

  const generateColors = ballsConfig => {
    let colorArray = [];
    for (const [color, count] of Object.entries(ballsConfig)) {
      colorArray = colorArray.concat(Array(count).fill(color));
    }
    return colorArray;
  };

  const getInitialState = levelIndex => {
    const level = levels[levelIndex];
    if (!level) {
      console.error('Level not found for index', levelIndex);
      return [];
    }
    const allBalls = generateColors(level.balls);
    const shuffledBalls = shuffleArray(allBalls);
    const stacks = [];

    for (let i = 0; i < level.numberOfStacks; i++) {
      if (shuffledBalls.length > 0) {
        stacks.push(
          shuffledBalls.splice(
            0,
            Math.min(shuffledBalls.length, level.maxStackSize),
          ),
        );
      }
    }

    while (stacks.length < level.numberOfStacks) {
      stacks.push([]);
    }

    return shuffleArray(stacks);
  };

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchLevel = useCallback(async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    const storedLevel = await AsyncStorage.getItem(`level_${deviceId}`);
    if (storedLevel !== null) {
      const parsedLevel = parseInt(storedLevel, 10);
      if (!isNaN(parsedLevel) && parsedLevel < levels.length) {
        setLevelIndex(parsedLevel);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchLevel();
  }, [fetchLevel]);

  useEffect(() => {
    if (!isLoading) {
      setColumns(getInitialState(levelIndex));
    }
  }, [levelIndex, isLoading]);

  useEffect(() => {
    if (route.params?.indexLevel !== undefined) {
      setLevelIndex(route.params.indexLevel);
    }
  }, [route.params?.indexLevel]);

  // Locked a single stack when completed with same colors
  const isStackLocked = stack => {
    if (stack.length === 0) return false;
    const firstDisk = stack[0];
    return (
      stack.every(disk => disk === firstDisk) &&
      stack.length === levels[levelIndex].balls[firstDisk]
    );
  };

  useEffect(() => {
    const newShowStackAnimation = columns.map((column, idx) =>
      isStackLocked(column),
    );
    setShowStackAnimation(newShowStackAnimation);
  }, [columns]); // Reacts to changes in columns

  const handleDiskTap = colIndex => {
    // if (!isGameActive || isStackLocked(columns[colIndex])) return;
    if (!isGameActive) return;

    const stack = columns[colIndex];
    if (isStackLocked(stack)) {
      console.log(`Interaction blocked as stack ${colIndex} is locked.`);
      return;
    }

    let newColumns = [...columns];
    if (selectedDisk === null) {
      if (columns[colIndex].length > 0) {
        const disk = columns[colIndex][0];
        setSelectedDisk({disk, from: colIndex});

        // Trigger the animation
        Animated.spring(selectedDiskAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }).start();
        loadAd();
      }
    } else {
      if (
        selectedDisk.from !== colIndex &&
        (columns[colIndex].length < 4 || columns[colIndex].length === 0)
      ) {
        const newColumns = [...columns];
        newColumns[selectedDisk.from] = newColumns[selectedDisk.from].slice(1);
        newColumns[colIndex] = [selectedDisk.disk, ...newColumns[colIndex]];
        setColumns(newColumns);
        setSelectedDisk(null);

        // Reset the animation
        selectedDiskAnim.setValue(0);
        checkCompletion(newColumns);
      } else {
        setSelectedDisk(null);
        // Reset the animation
        selectedDiskAnim.setValue(0);
      }
    }
  };

  const checkCompletion = async cols => {
    const level = levels[levelIndex];
    if (!level) {
      console.error('Level not found for index', levelIndex);
      return;
    }
    const expectedBalls = level.balls;
  
    const isCompleted = cols.every(col => {
      if (col.length === 0) return true;
      const color = col[0];
      return (
        col.every(ball => ball === color) && col.length === expectedBalls[color]
      );
    });
  
    if (isCompleted) {
      Animated.timing(completionAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(async () => {
        completionAnim.setValue(0);
        setIsGameActive(false);
        setShowAnimation(true);
  
        const newLevelIndex = levelIndex + 1;
        const deviceId = await DeviceInfo.getUniqueId();
        const unlockedLevelKey = `unlocked_level_${deviceId}`;
        const storedUnlockedLevel = await AsyncStorage.getItem(unlockedLevelKey);
        if (!storedUnlockedLevel || newLevelIndex > parseInt(storedUnlockedLevel)) {
          await AsyncStorage.setItem(unlockedLevelKey, newLevelIndex.toString());
        }
        await AsyncStorage.setItem(`level_${deviceId}`, newLevelIndex.toString());
  
        if (!isAdLoaded) {
          loadAd();
        }
      });
    }
  };
  

  const handleAnimationPress = useCallback(async () => {
    if (levelIndex === 0) {
      // Skip ad for level 1 completion
      setLevelIndex(levelIndex + 1);
      setIsGameActive(true);
      setShowAnimation(false);
    } else {
      if (isAdLoaded) {
        try {
          await rewarded.show();
          setLevelIndex(levelIndex + 1);
          setIsGameActive(true);
          setShowAnimation(false);
          loadAd();
        } catch (error) {
          console.log('Ad failed to show:', error);
          setLevelIndex(levelIndex + 1);
          setIsGameActive(true);
          setShowAnimation(false);

          loadAd();
        }
      } else {
        console.log('Ad not loaded');
        if (!isLoadingAd) {
          loadAd();
        }
      }
    }
  }, [isAdLoaded, isLoadingAd, levelIndex, loadAd]);

  useEffect(() => {
    const onAdLoaded = () => setIsAdLoaded(true);
    const onAdEarnedReward = reward =>
      console.log('User earned reward of ', reward);

    rewarded.addAdEventListener(RewardedAdEventType.LOADED, onAdLoaded);
    rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      onAdEarnedReward,
    );

    return () => {
      rewarded.removeAllListeners();
    };
  }, []);

  const loadAd = useCallback(async () => {
    setIsLoadingAd(true);
    try {
      await rewarded.load();
      setIsAdLoaded(true);
      setIsLoadingAd(false);
    } catch (error) {
      console.log('Ad failed to load:', error);
      setIsLoadingAd(false);
    }
  }, []);

  const resetGame = () => {
    setColumns(getInitialState(levelIndex));
    setSelectedDisk(null);
    setIsGameActive(true); // Ensure the game is set to active
    setShowAnimation(false); // Hide any animations that might be showing
  };

  const handleRestart = () => {
    resetGame();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.body}>
      <BackgroundColors levelIndex={levelIndex} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('levels')}>
          <Bars name="bars" size={34} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={resetGame}>
          <Icon name="loop" size={34} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.leveltext}>LEVEL : {levelIndex + 1}</Text>
        <Animated.View
          style={{
            ...styles.container,
            opacity: completionAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.5],
            }),
          }}
        >
          {columns.map((column, idx) => (
            <View key={idx} style={styles.bottle}>
              {column.map((color, colorIdx) => {
                const isSelected = selectedDisk?.from === idx && colorIdx === 0;

                return (
                  <Animated.View
                    key={colorIdx}
                    style={[
                      styles.disk,
                      {backgroundColor: color},
                      isSelected ? styles.selectedDisk : {},
                      isSelected
                        ? {
                            transform: [
                              {
                                translateY: selectedDiskAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, -50], // Control the height of the jump
                                }),
                              },
                              {
                                scale: selectedDiskAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [1, 1.15], // Control the scale when the disk jumps
                                }),
                              },
                            ],
                          }
                        : {},
                    ]}
                  />
                );
              })}
              {showStackAnimation[idx] && (
                <LottieView
                  source={require('../../assets/celebration.json')}
                  autoPlay
                  loop={true}
                  style={styles.lottieTop}
                />
              )}
              <TouchableOpacity
                onPress={() => handleDiskTap(idx)}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {column.length === 0 && (
                  <Text style={styles.emptyText}>Empty</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        {/* new view for message and text  */}
        <View style={styles.modelContainer}>
          <Modal
            visible={showAnimation}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowAnimation(false)}
          >
            <View style={styles.modalBackground}>
              <Animated.View style={styles.msgBack}>
                <View style={styles.message}>
                  <Text style={styles.msgText}>{randomMessage}</Text>
                </View>
              </Animated.View>
              <View style={styles.maskContainer}>
                <LottieView
                  ref={animationRef}
                  source={require('../../assets/cup.json')}
                  autoPlay
                  loop={false}
                  style={styles.lottie}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleRestart}>
                  <Text style={styles.buttonText}>Restart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAnimationPress}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      {/* Copy right Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Genz Tech</Text>
      </View>
      <View style={styles.bannerAds}>
        <BannerAd
          unitId={BanneradUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{requestNonPersonalizedAdsOnly: true}}
        />
      </View>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');
const bottleWidth = width * 0.14;

const styles = StyleSheet.create({
  body: {flex: 1},
  gradient: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bottle: {
    width: bottleWidth,
    height: 234,
    backgroundColor: 'rgba(255, 255, 255,0.7)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disk: {
    width: bottleWidth * 0.83,
    height: bottleWidth * 0.83,
    borderRadius: 25,
    margin: 3,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  selectedDisk: {
    borderColor: '#000',
    borderWidth: 0.5,
    transform: [{scale: 1.15}],
  },
  emptyText: {
    color: 'grey',
    fontSize: 16,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leveltext: {
    top:-100,
    color: '#fff',
    fontWeight: '800',
    fontSize: 24,
  },
  image: {
    flex: 1,
  },
  lottie: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d4b6',
    borderRadius: 50,
  },
  maskContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d4b6',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // borderRadius: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34325c',
  },
  bannerAds: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  modelContainer: {
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgBack: {
    backgroundColor: '#e6e687',
    width: '99%',
    padding: 8,
    bottom: 12,
    borderRadius: 12,
  },

  message: {
    backgroundColor: '#2b2b28',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 24,
    borderBottomEndRadius: 24,
    borderBottomWidth: 2,
    transform: [{rotate: '-1deg'}],
  },
  msgText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 26,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Adjust as necessary for spacing
    width: '100%', // Ensure the container has enough width
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 12,
    width: '40%',
  },
  buttonText: {
    fontSize: 26,
    color: '#000',
    fontWeight: '800',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    alignItems: 'center',
    // backgroundColor:"#bdbdb9"
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  lottieTop: {
    position: 'absolute', // Position relative to the parent (bottle)
    top: -50, // Adjust as needed to position correctly above the stack
    width: 100,
    height: 100,
    alignSelf: 'center', // Center it horizontally
  },
});

export default GameScreen;

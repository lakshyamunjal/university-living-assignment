import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';

import {styles} from './world-clock-screen.styles';

import CrossIcon from '../../assets/icons/cross.png';
import PlusIcon from '../../assets/icons/plus.png';
import {useAppDispatch, useAppSelector} from '../../store';
import {
  clearFilteredStateCountryList,
  filterStateCountriesList,
  getListOfStatesAndCountries,
  getTimezoneOfState,
  updateWorldClockItemsListWithLatestTime,
} from '../../store/slice';
import {
  StateAndCountryDetailsType,
  WorldClockItemType,
} from '../../store/slice/world-clock/types';

import BackgroundTimer from '../../utils/backgroundTimer';

const HIT_SLOP = {top: 5, left: 5, bottom: 5, right: 5};

const WorldClockScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  const {
    isStateCountriesListLoading,
    stateCountriesList,
    isNewLocationTimeLoading,
    worldClocksList,
    filteredStateCountriesList,
  } = useAppSelector(state => state.worldClock);

  const isBackgroundTimerAttachedRef = useRef(false);

  useEffect(() => {
    dispatch(getListOfStatesAndCountries());

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const debounce = (text: string) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(filterStateCountriesList(text));
    }, 2000);
  };

  const handleChangeText = (text: string) => {
    debounce(text);
    setSearchText(text);
  };

  const attachBackgroundListener = () => {
    if (!isBackgroundTimerAttachedRef.current) {
      isBackgroundTimerAttachedRef.current = true;
      BackgroundTimer.runBackgroundTimer(() => {
        dispatch(updateWorldClockItemsListWithLatestTime());
      }, 60 * 1000);
    }
  };

  const renderItem = ({item}: {item: StateAndCountryDetailsType}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          attachBackgroundListener();
          dispatch(getTimezoneOfState(item));
          setSearchText('');
          setIsModalVisible(false);
        }}>
        <Text style={styles.stateCountryText}>
          {item.stateName}, {item.countryName}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>No World Clocks</Text>
      </View>
    );
  };

  const renderWorldClockItem = ({
    item,
    index,
  }: {
    item: WorldClockItemType;
    index: number;
  }) => {
    const isLastRow = worldClocksList.length - 1 === index;

    return (
      <View
        style={[styles.worldClockItem, isLastRow ? styles.lastRowBorder : {}]}>
        <View>
          <Text style={styles.timeLabel}>
            {item.label}, {item.timeDifference}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.stateNameText}>
            {item.stateName}
          </Text>
        </View>
        <Text style={styles.timeText}>{item.formattedTime}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>World Clock</Text>
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
          }}>
          <Image source={PlusIcon} style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => {
          setSearchText('');
          setIsModalVisible(false);
          dispatch(clearFilteredStateCountryList());
        }}>
        <View>
          <Text style={styles.modalHeaderText}>Choose a city</Text>
          <View style={styles.inputRow}>
            <View style={styles.textInputRow}>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChangeText}
                value={searchText}
                placeholder="Search..."
              />
              <TouchableOpacity
                hitSlop={HIT_SLOP}
                onPress={() => {
                  setSearchText('');
                  dispatch(clearFilteredStateCountryList());
                }}
                style={styles.crossIconPosition}>
                <Image source={CrossIcon} style={styles.crossIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              hitSlop={HIT_SLOP}
              onPress={() => {
                setSearchText('');
                setIsModalVisible(false);
                dispatch(clearFilteredStateCountryList());
              }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={styles.stateListContainer}
            data={
              filteredStateCountriesList.length
                ? filteredStateCountriesList
                : stateCountriesList
            }
            renderItem={renderItem}
          />
        </View>
      </Modal>
      <FlatList
        data={worldClocksList}
        contentContainerStyle={styles.worldClockContainer}
        renderItem={renderWorldClockItem}
        ListEmptyComponent={renderEmptyComponent}
      />
      <Modal
        transparent
        animationType="fade"
        visible={isStateCountriesListLoading || isNewLocationTimeLoading}>
        <ActivityIndicator style={styles.loader} size="large" />
      </Modal>
    </View>
  );
};

export {WorldClockScreen};

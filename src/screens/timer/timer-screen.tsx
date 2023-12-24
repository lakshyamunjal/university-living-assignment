import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, Keyboard, Alert} from 'react-native';

import {Button} from '../../components';
import {computeNewTime} from '../../utils';
import backgroundTimer from '../../utils/backgroundTimer';

import {styles} from './timer-screen.styles';

const TimerScreen = () => {
  const [timer, setTimer] = useState({hours: '', minutes: '', seconds: ''});
  const [timeLeft, setTimeLeft] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const updatedTimeRef = useRef({
    hours: '',
    minutes: '',
    seconds: '',
  });
  const intervalIdRef = useRef(0);

  useEffect(() => {
    return () => {
      backgroundTimer.clearInterval(intervalIdRef.current);
    };
  }, []);

  const handleChangeText = (type: string) => (value: string) => {
    let isValidValue = true;
    if (type === 'hours') {
      isValidValue = +value <= 24;
    }
    if (type === 'minutes' || type === 'seconds') {
      isValidValue = +value <= 60;
    }

    if (isValidValue) {
      setTimer({...timer, [type]: value});
    }
  };

  const validateTimeInput = (time: string) => {
    return time ? time.padStart(2, '0') : '00';
  };

  const handleStart = () => {
    const newTime = {
      hours: validateTimeInput(timer.hours),
      minutes: validateTimeInput(timer.minutes),
      seconds: validateTimeInput(timer.seconds),
    };
    setTimer(newTime);
    setTimeLeft(newTime);
    Keyboard.dismiss();
    setIsTimerStarted(true);

    let isFirstRun = true;
    intervalIdRef.current = backgroundTimer.setInterval(() => {
      updatedTimeRef.current = computeNewTime(
        isFirstRun ? newTime : updatedTimeRef.current,
      );
      setTimeLeft(updatedTimeRef.current);
      isFirstRun = false;
      const {hours, minutes, seconds} = updatedTimeRef.current;
      if (hours === '00' && minutes === '00' && seconds === '00') {
        setIsTimerStarted(false);
        backgroundTimer.clearInterval(intervalIdRef.current);
        Alert.alert('Timer', 'Timer Finish!');
      }
    }, 1000);
  };

  const handleReset = () => {
    Keyboard.dismiss();
    setIsTimerStarted(false);
    setTimer({hours: '', minutes: '', seconds: ''});
    backgroundTimer.clearInterval(intervalIdRef.current);
    setTimeLeft({hours: '00', minutes: '00', seconds: '00'});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Timer</Text>
      <View style={styles.row}>
        <TextInput
          placeholder="HH"
          style={styles.input}
          keyboardType="number-pad"
          value={timer.hours}
          onChangeText={handleChangeText('hours')}
          maxLength={2}
        />
        <TextInput
          placeholder="MM"
          style={styles.input}
          keyboardType="number-pad"
          value={timer.minutes}
          onChangeText={handleChangeText('minutes')}
          maxLength={2}
        />
        <TextInput
          placeholder="SS"
          style={styles.input}
          keyboardType="number-pad"
          value={timer.seconds}
          onChangeText={handleChangeText('seconds')}
          maxLength={2}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          text="START"
          disabled={isTimerStarted}
          handlePress={handleStart}
        />
        <Button
          text="RESET"
          disabled={!isTimerStarted}
          handlePress={handleReset}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.timeLeftText}>
          Time left: {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </Text>
      </View>
    </View>
  );
};

export {TimerScreen};

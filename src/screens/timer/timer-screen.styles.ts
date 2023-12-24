import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 20},
  heading: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: '500',
    color: 'black',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: Dimensions.get('screen').width / 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 2,
    width: 50,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    paddingHorizontal: Dimensions.get('screen').width / 4,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeLeftText: {fontSize: 24, fontWeight: '600', color: 'black'},
});

export {styles};

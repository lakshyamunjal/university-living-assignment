import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    paddingVertical: 5,
  },
  plusIcon: {width: 30, height: 30},
  modalHeaderText: {
    textAlign: 'center',
    color: 'black',
    marginVertical: 10,
    fontSize: 16,
  },
  stateCountryText: {
    color: 'black',
    fontSize: 16,
    paddingVertical: 3,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  textInputRow: {
    flexDirection: 'row',
    width: '85%',
    marginRight: 10,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 2,
    width: '100%',
  },
  crossIconPosition: {position: 'absolute', right: 5, paddingTop: 10},
  crossIcon: {width: 16, height: 16},
  cancelText: {color: 'black', fontSize: 16},
  worldClockContainer: {flex: 1},
  worldClockItem: {
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  timeText: {fontSize: 32, fontWeight: '500', color: 'black'},
  stateListContainer: {marginLeft: 10},
  stateNameText: {fontSize: 20, color: 'black'},
  lastRowBorder: {borderBottomWidth: 1},
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {fontSize: 26, color: 'black', fontWeight: '500'},
  loader: {alignSelf: 'center', flex: 1},
});

export {styles};

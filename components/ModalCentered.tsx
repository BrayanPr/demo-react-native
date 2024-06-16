import React, { ReactNode } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';

type CenteredModalProps = {
  visible: boolean;
  onRequestClose?: () => void;
  onSaveLocally?: () => void;
  onUpload?: () => void;
  children?: ReactNode;
}

const ModalCentered = ({ visible, onRequestClose = () =>{}, onSaveLocally = () => {}, onUpload = () => {}, children=null }: CenteredModalProps) => {
  const opacityValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <Animated.View style={[styles.centeredView, { opacity: opacityValue }]}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onRequestClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          {children}
          <View style={styles.bottomOptions}>
            <TouchableOpacity style={styles.optionButton} onPress={onSaveLocally}>
              <Text style={styles.optionText}>Save Locally</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={onUpload}>
              <Text style={styles.optionText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    height:'60%',
    width:'70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ModalCentered;

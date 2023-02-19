import React from 'react'
import { Modal } from 'react-native'

const ModalUPI = ({ UpiModalVisible, setUpiModalVisible, children }: any) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={UpiModalVisible}
            onRequestClose={() => {
                setUpiModalVisible(!UpiModalVisible);
            }}>
            {children}
        </Modal>
    )
}

export default ModalUPI

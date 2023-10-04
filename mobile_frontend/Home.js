import React from 'react'
import { Button, Modal, Text, Pressable , View } from 'react-native'
import { Badge, WhiteSpace } from '@ant-design/react-native'

const Home = ({
    closeModal,
    modal
}) => {
    return (
        <Modal 
            animationType='slide'
            visible={modal}
        >
            
            <Badge text={9}>
            <View
              style={{
                width: 52,
                height: 52,
                backgroundColor: 'rgba(255, 140, 101, 0.15)',
              }}
            />
          </Badge>
 
            <Text>Loginnnn done!</Text>
            <Pressable onPress={()=> closeModal() }>
                <Text>
                    Tocame
                </Text>
            </Pressable>
        </Modal>
    )
}

export default Home
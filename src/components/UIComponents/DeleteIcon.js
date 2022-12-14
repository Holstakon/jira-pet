import { Icon, IconButton, AlertDialog, Button } from 'native-base'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

const DeleteIcon = ({ onPress, deleteItem }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)

  return (
    <>
      <IconButton
        icon={<Icon as={AntDesign} name='delete' />}
        size='md'
        onPress={() => {
          setIsOpen(true)
        }}
      />
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header
            _text={{ fontWeight: 'bold' }}
          >{`Delete ${deleteItem}`}</AlertDialog.Header>
          <AlertDialog.Body>{`Delete this ${deleteItem}?`}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant='unstyled' colorScheme='coolGray' onPress={onClose}>
                Cancel
              </Button>
              <Button colorScheme='danger' onPress={onPress}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  )
}

export default DeleteIcon

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent maxW="900px" maxH="600px" w="unset">
        <ModalBody p="0">
          <Image src={imgUrl} maxH="600px" maxW="900px" />
        </ModalBody>

        <ModalFooter
          bg="pGray.800"
          justifyContent="start"
          borderBottomRadius={6}
        >
          <Link fontSize={14} href={imgUrl}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

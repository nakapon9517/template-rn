import { storage } from '@/utils/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { logger } from './logger/Logger';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export enum ImageType {
  Account = 'account_image',
  Group = 'group_image',
  Chat = 'chat_image',
}

type StorageImageProps = AccountImageProps | GroupImageProps | ChatImageProps;
export type AccountImageProps = { imageType: ImageType.Account; accountId: string };
export type GroupImageProps = { imageType: ImageType.Group; groupId: string };
export type ChatImageProps = { imageType: ImageType.Chat; groupId: string; chatId: string; messageId: string };

export const uploadLocalImage = async (localUri: string, props: StorageImageProps, resizeWidth?: number) => {
  const manipulate = await manipulateAsync(localUri, [{ resize: { width: resizeWidth ?? 512 } }], {
    compress: 0,
    format: SaveFormat.JPEG,
  });
  const manipulateRes = await fetch(manipulate.uri);
  const blob = await manipulateRes.blob();

  const path = generateImagePath(props);
  const imageRef = ref(storage, path);
  const snapshot = await uploadBytes(imageRef, blob);
  logger.action('upload_image', snapshot.ref.fullPath);
  return snapshot.ref.name;
};

export const fetchImageUri = async (props: StorageImageProps): Promise<string> => {
  return await getDownloadURL(ref(storage, generateImagePath(props)));
};

const generateImagePath = (props: StorageImageProps): string => {
  switch (props.imageType) {
    case ImageType.Account:
      return `images/accounts/${props.accountId}/icon.${SaveFormat.JPEG}`;
    case ImageType.Group:
      return `images/groups/${props.groupId}/icon.${SaveFormat.JPEG}`;
    case ImageType.Chat:
      return `images/groups/${props.groupId}/chats/${props.chatId}/messages/${props.messageId}.${SaveFormat.JPEG}`;
    default:
      return '';
  }
};

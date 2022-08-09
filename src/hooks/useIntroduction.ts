import { Storage, StorageName } from '@/utils';
import { useRecoilState } from 'recoil';
import { introductionState } from '@/atoms';
import { useCallback } from 'react';

const storage = new Storage<boolean>();
export const useIntroduction = () => {
  const [introduction, setIntroduction] = useRecoilState(introductionState);

  const saveIntroductionDone = useCallback((done: boolean) => {
    storage.save(StorageName.Introduction, done);
    setIntroduction(done);
  }, []);

  return {
    introduction,
    setIntroduction,
    saveIntroductionDone,
  };
};

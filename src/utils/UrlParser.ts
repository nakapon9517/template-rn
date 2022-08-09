type Result = {
  text: string;
  isUrl: boolean;
};

const urlRegex = /(https?:\/\/[^\s]+)/g;
export const urlify = (text: string): Result[] => {
  return text.split(urlRegex).map((v) => ({
    text: v,
    isUrl: urlRegex.test(v),
  }));
};

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUrl = async () => {
  const url = await AsyncStorage.getItem("url");
  return url;
};

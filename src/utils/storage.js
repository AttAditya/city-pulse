import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@city_pulse_bookmarks';
const SELECTED_CITY_KEY = '@city_pulse_selected_city';

export const getBookmarks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

export const saveBookmark = async (article) => {
  try {
    const bookmarks = await getBookmarks();
    const exists = bookmarks.some((item) => item.url === article.url);
    if (!exists) {
      const updatedBookmarks = [...bookmarks, article];
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving bookmark:', error);
    return false;
  }
};

export const removeBookmark = async (articleUrl) => {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = bookmarks.filter((item) => item.url !== articleUrl);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
};

export const isBookmarked = async (articleUrl) => {
  try {
    const bookmarks = await getBookmarks();
    return bookmarks.some((item) => item.url === articleUrl);
  } catch (error) {
    console.error('Error checking bookmark:', error);
    return false;
  }
};

export const saveSelectedCity = async (city) => {
  try {
    await AsyncStorage.setItem(SELECTED_CITY_KEY, city);
  } catch (error) {
    console.error('Error saving city:', error);
  }
};

export const getSelectedCity = async () => {
  try {
    const city = await AsyncStorage.getItem(SELECTED_CITY_KEY);
    return city || 'New York';
  } catch (error) {
    console.error('Error getting city:', error);
    return 'New York';
  }
};

export default {
  getBookmarks,
  saveBookmark,
  removeBookmark,
  isBookmarked,
  saveSelectedCity,
  getSelectedCity,
};

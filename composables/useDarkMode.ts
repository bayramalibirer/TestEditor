import { ref } from 'vue';

export function useDarkMode() {
  const isDarkMode = ref(localStorage.getItem('theme') === 'dark');

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  };

  return { isDarkMode, toggleDarkMode };
}

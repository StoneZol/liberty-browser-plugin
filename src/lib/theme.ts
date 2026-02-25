export type Theme = 'light' | 'dark' | 'system'

const THEME_STORAGE_KEY = 'theme'

/**
 * Получает системную тему пользователя
 */
export function getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Получает сохраненную тему из localStorage
 */
export function getStoredTheme(): Theme | null {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY)
        return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : null
    } catch {
        return null
    }
}

/**
 * Сохраняет тему в localStorage
 */
export function setStoredTheme(theme: Theme): void {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
        // Игнорируем ошибки localStorage
    }
}

/**
 * Применяет тему к документу
 */
export function applyTheme(theme: Theme): void {
    const root = document.documentElement
    const effectiveTheme = theme === 'system' ? getSystemTheme() : theme

    if (effectiveTheme === 'dark') {
        root.classList.add('dark')
    } else {
        root.classList.remove('dark')
    }
}

/**
 * Инициализирует тему при загрузке страницы
 */
export function initTheme(): void {
    const storedTheme = getStoredTheme()
    const theme = storedTheme || 'system'

    applyTheme(theme)

    // Слушаем изменения системной темы, если выбрана системная тема
    if (theme === 'system' || !storedTheme) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
            if (getStoredTheme() === 'system' || !getStoredTheme()) {
                applyTheme('system')
            }
        }

        // Современный способ
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange)
        } else {
            // Fallback для старых браузеров
            mediaQuery.addListener(handleChange)
        }
    }
}

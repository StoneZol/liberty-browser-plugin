import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
import { applyTheme, getStoredTheme, getSystemTheme, setStoredTheme, type Theme } from "@/lib/theme"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
    duration?: number
}

export const AnimatedThemeToggler = ({
    className,
    duration = 400,
    ...props
}: AnimatedThemeTogglerProps) => {

    const [isDark, setIsDark] = useState(() => {
        const storedTheme = getStoredTheme()
        if (storedTheme === 'system' || !storedTheme) {
            return getSystemTheme() === 'dark'
        }
        return storedTheme === 'dark'
    })
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const updateTheme = () => {
            setIsDark(document.documentElement.classList.contains("dark"))
        }

        updateTheme()

        const observer = new MutationObserver(updateTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        })

        // Слушаем изменения системной темы
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleSystemThemeChange = () => {
            const storedTheme = getStoredTheme()
            if (storedTheme === 'system' || !storedTheme) {
                updateTheme()
            }
        }

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleSystemThemeChange)
        } else {
            mediaQuery.addListener(handleSystemThemeChange)
        }

        return () => {
            observer.disconnect()
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleSystemThemeChange)
            } else {
                mediaQuery.removeListener(handleSystemThemeChange)
            }
        }
    }, [])

    const toggleTheme = useCallback(async () => {
        if (!buttonRef.current) return

        const currentStoredTheme = getStoredTheme()
        let newTheme: Theme

        if (currentStoredTheme === 'system' || !currentStoredTheme) {
            // Если была системная тема, переключаемся на противоположную системной
            const systemTheme = getSystemTheme()
            newTheme = systemTheme === 'dark' ? 'light' : 'dark'
        } else {
            // Переключаемся между light и dark
            newTheme = currentStoredTheme === 'dark' ? 'light' : 'dark'
        }

        const newIsDark = newTheme === 'dark'

        await document.startViewTransition(() => {
            flushSync(() => {
                setIsDark(newIsDark)
                setStoredTheme(newTheme)
                applyTheme(newTheme)
            })
        }).ready

        const { top, left, width, height } =
            buttonRef.current.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
        )

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }, [duration])

    return (
        <button
            ref={buttonRef}
            onClick={toggleTheme}
            className={cn(className)}
            {...props}
        >
            {isDark ? <Sun /> : <Moon />}
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}

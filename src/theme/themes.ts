export type ThemeName = 'light' | 'dark' | 'system'

export interface Theme {
    colors: {
        background: string
        text: string
        card: string
        border: string
        primary: string
    }
}

export const lightTheme: Theme = {
    colors: {
        background: '#FFFFFF',
        text: '#111111',
        card: '#F8F8F8F8',
        border: '#E0E0E0',
        primary: '#007AFF',
    }
}

export const darkTheme: Theme = {
    colors: {
        background: '#000000',
        text: '#FFFFFF',
        card: '#1C1C1E',
        border: '#2C2C2E',
        primary: '#0A84FF',
    }
}
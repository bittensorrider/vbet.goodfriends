import { getRequestConfig } from 'next-intl/server';

export type Locale = {
    key: string;
    image: string;
    label: string;
    shortLabel: string;
};

export const localesStrings = ['en', 'vi'] as const;
export const locales: Locale[] = [
    { key: "en", image: "uk.svg", label: "English", shortLabel: "En" },
    { key: "vi", image: "vi.png", label: "Vietnames", shortLabel: "Vi" },
];

import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [{ locale: 'en-US' }, { locale: 'pt-BR' }];
}

export default async function LocaleLayout({ children, params: { locale } }: {
  children: React.ReactNode;
  params: { locale: string; };
}) {
  let messages;
  try {
    messages = (await import(`../../utils/translate/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
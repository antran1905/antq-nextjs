import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/libs/I18nNavigation';

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: LoginPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'LoginPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function LoginPage(props: LoginPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'LoginPage',
  });

  const features = [
    {
      title: t('feature_one_title'),
      description: t('feature_one_description'),
    },
    {
      title: t('feature_two_title'),
      description: t('feature_two_description'),
    },
    {
      title: t('feature_three_title'),
      description: t('feature_three_description'),
    },
  ];

  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <article className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_60px_rgba(15,23,42,0.12)] lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <section className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.4em] text-slate-400 uppercase">
              {t('hero_badge')}
            </p>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                {t('hero_title')}
              </h1>
              <p className="text-lg text-slate-600">{t('hero_description')}</p>
              <p className="text-sm text-slate-500">{t('hero_support')}</p>
            </div>
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-base font-semibold text-slate-700"
                  >
                    ✓
                  </span>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-slate-900">{feature.title}</p>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 rounded-2xl bg-slate-950 p-6 text-white shadow-lg shadow-slate-900/40 sm:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{t('form_heading')}</h2>
              <p className="text-sm text-white/70">{t('form_subtitle')}</p>
            </div>
            <form className="space-y-4" method="post" action="#" autoComplete="off">
              <label className="space-y-1 text-sm text-white/70">
                <span>{t('form_email_label')}</span>
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-base text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  type="email"
                  name="email"
                  placeholder={t('form_email_placeholder')}
                  required
                />
              </label>
              <label className="space-y-1 text-sm text-white/70">
                <span>{t('form_password_label')}</span>
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-base text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  type="password"
                  name="password"
                  placeholder={t('form_password_placeholder')}
                  required
                />
              </label>
              <div className="flex items-center justify-between text-xs font-semibold text-white/70">
                <label className="flex items-center gap-2">
                  <input
                    className="h-4 w-4 rounded border border-white/40 bg-transparent text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                    type="checkbox"
                  />
                  <span className="text-xs text-white/80">{t('form_remember_me')}</span>
                </label>
                <span className="text-xs text-sky-200">{t('form_forgot_password')}</span>
              </div>
              <button
                className="w-full rounded-xl bg-sky-500 px-3 py-2 text-base font-semibold text-white transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                type="submit"
              >
                {t('form_submit')}
              </button>
            </form>
            <p className="text-sm text-white/70">
              <span className="mr-1">{t('form_cta')}</span>
              <Link className="font-semibold text-white underline" href="/sign-up/">
                {t('form_cta_link')}
              </Link>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

import { ApplicationForm } from '@/components/ApplicationForm'

import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params }: Args) {
  const { locale } = await params
  const t = await getTranslations('Apply')

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-muted/30">
        <div className="container">
          <div className="max-w-[48rem] mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                {t('generalApplication')}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t('generalApplication')}
              </h2>
              <p className="text-muted-foreground text-lg">{t('generalApplicationDescription')}</p>
            </div>
            <ApplicationForm positionApplied={t('generalApplication')} locale={locale} />
          </div>
        </div>
      </section>
    </>
  )
}

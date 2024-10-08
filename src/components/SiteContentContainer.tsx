import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface SiteContentContainerProps extends ComponentProps<'section'> {}

export function SiteContentContainer({
  children,
  className,
  ...otherProps
}: SiteContentContainerProps) {
  return (
    <section
      className={twMerge(
        `
          container
          mx-auto
          px-6
          xl:max-w-screen-lg
          xl:p-0
          2xl:max-w-screen-xl
        `,
        className,
      )}
      {...otherProps}
    >
      {children}
    </section>
  )
}

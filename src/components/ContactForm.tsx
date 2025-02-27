'use client'

import { Atom, Input, TextArea } from '@/components'
import { useToasts } from '@/components/Toasts'
import { FormActionResponse } from '@/lib/types'
import { ComponentProps, useActionState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

interface ContactFormProps extends ComponentProps<'form'> {
  inbox: string
  subject: string
}

async function sendEmail(
  _previousState: FormActionResponse,
  formData: FormData,
) {
  const body = Object.fromEntries(formData.entries())

  try {
    const response = await fetch('/api/sendmail', {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (!response.ok) {
      const { error } = await response.json()

      return {
        success: false,
        messages: [`Error: ${JSON.stringify(error, null, 2)}`],
      }
    }

    return {
      success: true,
      messages: ['Message sent successfully!'],
    }
  } catch (error) {
    return {
      success: false,
      messages: [`Error: ${JSON.stringify(error, null, 2)}`],
    }
  }
}

export function ContactForm({
  children,
  className,
  inbox,
  subject,
  ...otherProps
}: ContactFormProps) {
  const { setToasts } = useToasts()
  const [formActionResponse, formAction, isSending] = useActionState(
    sendEmail,
    null,
  )

  useEffect(() => {
    if (formActionResponse?.success) {
      setToasts([{ message: 'Message sent successfully!', variant: 'success' }])
    } else {
      setToasts([
        { message: formActionResponse?.messages?.[0], variant: 'error' },
      ])
    }
  }, [formActionResponse])

  return (
    <form
      action={formAction}
      className={twMerge(
        `
          grid
          gap-6
          lg:grid-cols-2
        `,
        isSending &&
          `
            animate-pulse
            opacity-50
          `,
        className,
      )}
      {...otherProps}
    >
      <input
        type="hidden"
        name="subject"
        value={subject}
      />

      <input
        type="hidden"
        name="inbox"
        value={inbox}
      />

      <Input
        name="fullName"
        placeholder="Full Name"
        type="text"
        required={true}
      />

      <Input
        name="email"
        placeholder="Email Address"
        type="email"
        required={true}
      />

      {children}

      <TextArea
        className="lg:col-span-2"
        name="message"
        placeholder="Message"
        rows={6}
      />

      <div
        className="
          flex
          justify-end
          lg:col-span-2
        "
      >
        <Atom
          as="button"
          variant="button.primary"
        >
          Send
        </Atom>
      </div>
    </form>
  )
}

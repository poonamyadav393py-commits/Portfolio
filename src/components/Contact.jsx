import React from 'react';
// src/components/Contact.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useInView } from '../hooks/useInView';
import { Button } from './ui/Button';
import { Mail, Phone, Globe, Linkedin, Send, CheckCircle } from 'lucide-react';

/** Zod validation schema */
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const projectTypes = [
  'Product Design (0→1)',
  'UX Research & Strategy',
  'Mobile App Design',
  'Website / Web App',
  'Design System',
  'Freelance Consultation',
  'Other',
];

/** Form input wrapper */
function Field({ label, error, children, id }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-text/60">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs font-sans mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Animated success checkmark */
function SuccessState() {
  return (
    <div
      className="flex flex-col items-start gap-4"
      style={{ animation: 'fadeUp 0.6s ease forwards' }}
      role="status"
      aria-live="polite"
    >
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-accent" strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-primary text-2xl">Message sent!</h3>
      <p className="text-muted text-sm leading-relaxed max-w-sm">
        Thank you for reaching out. Poonam will review your message and get back to you within 24–48 hours.
      </p>
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [headRef, headVisible] = useInView(0.2);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    // Simulate async send (replace with real API)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form data:', data);
    setSubmitted(true);
  };

  const inputBase =
    'w-full px-4 py-3.5 bg-bg border border-gray-200 rounded-xl font-sans text-sm text-text placeholder-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200';

  return (
    <section id="contact" className="section bg-surface" aria-labelledby="contact-heading">
      <div className="container">
        {/* Header */}
        <div ref={headRef} className={`reveal mb-20 ${headVisible ? 'visible' : ''}`}>
          <p className="label mb-4 text-accent">Get in touch</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — info */}
          <div>
            <h2 id="contact-heading" className="font-serif text-primary mb-8 leading-tight">
              Let's make something<br />
              <em className="not-italic text-accent">great.</em>
            </h2>
            <p className="text-muted text-base leading-relaxed mb-12 max-w-sm">
              Whether you have a product idea, a team that needs a designer, or just want to chat about UX — I'm always happy to connect.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              {[
                { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'poonamyadav393.py@gmail.com', href: 'mailto:poonamyadav393.py@gmail.com' },
                { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: '+91 96733 33071', href: 'tel:+919673333071' },
                { icon: <Globe className="w-4 h-4" />, label: 'Website', value: 'designwithpoonam.in', href: 'https://designwithpoonam.in' },
                { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', value: 'linkedin.com/in/poonamyadav24', href: 'https://linkedin.com/in/poonamyadav24' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-none"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-muted group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="label text-muted/60">{item.label}</p>
                    <p className="font-sans text-sm text-text group-hover:text-accent transition-colors duration-200">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-bg rounded-3xl p-8 md:p-10">
            {submitted ? (
              <SuccessState />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-6"
                aria-label="Contact form"
              >
                <Field label="Your name" id="contact-name" error={errors.name?.message}>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    className={inputBase}
                    {...register('name')}
                    aria-invalid={!!errors.name}
                  />
                </Field>

                <Field label="Email address" id="contact-email" error={errors.email?.message}>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="rahul@company.com"
                    className={inputBase}
                    {...register('email')}
                    aria-invalid={!!errors.email}
                  />
                </Field>

                <Field label="Project type" id="contact-project" error={errors.projectType?.message}>
                  <select
                    id="contact-project"
                    className={inputBase}
                    {...register('projectType')}
                    aria-invalid={!!errors.projectType}
                    defaultValue=""
                  >
                    <option value="" disabled>Select a project type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Message" id="contact-message" error={errors.message?.message}>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className={`${inputBase} resize-none`}
                    {...register('message')}
                    aria-invalid={!!errors.message}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-primary text-bg font-sans font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-none"
                  aria-label="Send message"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

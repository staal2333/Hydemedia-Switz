'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/Toast';

const advertiserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name required'),
  phone: z.string().optional(),
  campaignType: z.string().min(1, 'Please select a campaign type'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Please provide more details about your campaign'),
});

const partnerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().min(8, 'Phone number required for partnership inquiries'),
  propertyAddress: z.string().min(5, 'Property address required'),
  propertyType: z.string().min(1, 'Please select property type'),
  message: z.string().min(10, 'Please provide more details about your property'),
});

type AdvertiserFormData = z.infer<typeof advertiserSchema>;
type PartnerFormData = z.infer<typeof partnerSchema>;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { showToast } = useToast();
  const [formType, setFormType] = useState<'advertiser' | 'partner'>('advertiser');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const advertiserForm = useForm<AdvertiserFormData>({
    resolver: zodResolver(advertiserSchema),
  });

  const partnerForm = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
  });

  const activeForm = formType === 'advertiser' ? advertiserForm : partnerForm;

  const onSubmit = async (data: AdvertiserFormData | PartnerFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType }),
      });

      if (response.ok) {
        showToast('success', formType === 'advertiser' 
          ? 'Thank you! We\'ll get back to you within 24 hours.' 
          : 'Partnership inquiry received! We\'ll contact you soon.');
        activeForm.reset();
      } else {
        showToast('error', 'Something went wrong. Please try again or email us directly at ma@hydemedia.dk');
      }
    } catch (error) {
      showToast('error', 'Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Form Type Toggle - Enhanced with micro-interactions */}
      <div className="flex gap-3 mb-8">
        <motion.button
          type="button"
          onClick={() => setFormType('advertiser')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
            formType === 'advertiser'
              ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
          }`}
        >
          {tCommon('forBrands')}
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setFormType('partner')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
            formType === 'partner'
              ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg shadow-slate-500/30'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
          }`}
        >
          {tCommon('forPropertyOwners')}
        </motion.button>
      </div>

      {/* Forms */}
      {formType === 'advertiser' ? (
        <motion.form
          key="advertiser"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={advertiserForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Input
            label={t('name')}
            {...advertiserForm.register('name')}
            error={advertiserForm.formState.errors.name?.message}
            required
          />
          <Input
            label={t('email')}
            type="email"
            {...advertiserForm.register('email')}
            error={advertiserForm.formState.errors.email?.message}
            required
          />
          <Input
            label={t('company')}
            {...advertiserForm.register('company')}
            error={advertiserForm.formState.errors.company?.message}
            required
          />
          <Input
            label={t('phone')}
            type="tel"
            {...advertiserForm.register('phone')}
            error={advertiserForm.formState.errors.phone?.message}
          />
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              {t('campaignType')} <span className="text-red-500">*</span>
            </label>
            <select
              {...advertiserForm.register('campaignType')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nordic-blue"
            >
              <option value="">{t('selectCampaignType')}</option>
              <option value="scaffolding-banner">{t('campaignOptions.scaffolding')}</option>
              <option value="facade-banner">{t('campaignOptions.facade')}</option>
              <option value="building-wraps">{t('campaignOptions.buildingWrap')}</option>
              <option value="not-sure">{t('campaignOptions.other')}</option>
            </select>
            {advertiserForm.formState.errors.campaignType && (
              <p className="text-red-500 text-sm mt-1">
                {advertiserForm.formState.errors.campaignType.message}
              </p>
            )}
          </div>
          <Input
            label={t('budget')}
            {...advertiserForm.register('budget')}
            placeholder={locale === 'da' ? 'f.eks. DKK 50.000/måned' : locale === 'de' ? 'z.B. CHF 5\'000/Monat' : 'e.g. 5,000/month'}
            error={advertiserForm.formState.errors.budget?.message}
          />
          <Textarea
            label={t('message')}
            {...advertiserForm.register('message')}
            error={advertiserForm.formState.errors.message?.message}
            rows={6}
            required
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full group relative overflow-hidden"
            disabled={isSubmitting}
          >
            <motion.span
              className="relative z-10"
              animate={isSubmitting ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {isSubmitting ? t('sending') : t('submit')}
            </motion.span>
            {!isSubmitting && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            )}
          </Button>
        </motion.form>
      ) : (
        <motion.form
          key="partner"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={partnerForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Input
            label={t('name')}
            {...partnerForm.register('name')}
            error={partnerForm.formState.errors.name?.message}
            required
          />
          <Input
            label={t('email')}
            type="email"
            {...partnerForm.register('email')}
            error={partnerForm.formState.errors.email?.message}
            required
          />
          <Input
            label={t('company')}
            {...partnerForm.register('company')}
            error={partnerForm.formState.errors.company?.message}
          />
          <Input
            label={t('phone')}
            type="tel"
            {...partnerForm.register('phone')}
            error={partnerForm.formState.errors.phone?.message}
            required
          />
          <Input
            label="Property Address"
            {...partnerForm.register('propertyAddress')}
            error={partnerForm.formState.errors.propertyAddress?.message}
            placeholder="Full address including city"
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              {...partnerForm.register('propertyType')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nordic-blue"
            >
              <option value="">Select property type</option>
              <option value="apartment">Apartment Building</option>
              <option value="office">Office Building</option>
              <option value="retail">Retail Storefront</option>
              <option value="mixed">Mixed Use</option>
              <option value="other">Other</option>
            </select>
            {partnerForm.formState.errors.propertyType && (
              <p className="text-red-500 text-sm mt-1">
                {partnerForm.formState.errors.propertyType.message}
              </p>
            )}
          </div>
          <Textarea
            label={t('message')}
            {...partnerForm.register('message')}
            error={partnerForm.formState.errors.message?.message}
            placeholder="Tell us about your property: visibility, traffic, any existing advertising, etc."
            rows={6}
            required
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full group relative overflow-hidden"
            disabled={isSubmitting}
          >
            <motion.span
              className="relative z-10"
              animate={isSubmitting ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {isSubmitting ? t('sending') : tCommon('submitInquiry')}
            </motion.span>
            {!isSubmitting && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            )}
          </Button>
        </motion.form>
      )}
    </div>
  );
}

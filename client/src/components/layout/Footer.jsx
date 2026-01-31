import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.symptoms'), href: '/symptoms' },
    { name: t('nav.hospitals'), href: '/hospitals' },
    { name: t('nav.image_analysis'), href: '/image-analysis' },
  ];

  const resources = [
    { name: `${t('footer.emergency')}: ${t('common.emergency_btn')}`, href: 'tel:108' },
    { name: `${t('footer.helpline')}: 104`, href: 'tel:104' },
    { name: t('footer.privacy'), href: '#' },
    { name: t('footer.terms'), href: '#' },
  ];

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-auto mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
                <Heart className="w-5 h-5" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-[var(--color-text-primary)]">RuralHealthAI</span>
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-xs">
              {t('footer.brand_desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] mb-4">{t('footer.platform')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`
                      text-sm transition-colors
                      ${link.name.includes(t('footer.emergency'))
                        ? 'text-red-500 font-semibold hover:text-red-400'
                        : link.name.includes(t('footer.helpline'))
                          ? 'text-[var(--color-primary)] font-semibold hover:text-blue-400'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
                      }
                    `}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                <a href="mailto:support@ruralhealthai.com" className="hover:text-[var(--color-primary)]">
                  support@ruralhealthai.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                <a href="tel:104" className="hover:text-[var(--color-primary)]">
                  104 ({t('footer.helpline')})
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--color-text-tertiary)] mt-0.5" />
                <span>{t('footer.serving')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from 'motion/react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="py-16 lg:py-20 bg-card border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-2xl lg:text-3xl text-foreground mb-4"
            >
              Palm Beach Exotics
            </h3>
            <p className="text-foreground/70 leading-relaxed mb-6">
              A curated collection of rare automotive and yachting experiences for the discerning few.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-foreground mb-6 tracking-wider text-sm">CONTACT</h4>
            <div className="space-y-4">
              <a
                href="tel:+15615551234"
                className="flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>(561) 555-1234</span>
              </a>
              <a
                href="mailto:concierge@palmbeachexotics.com"
                className="flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>concierge@palmbeachexotics.com</span>
              </a>
              <div className="flex items-start gap-3 text-foreground/70">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>
                  Worth Avenue<br />
                  Palm Beach, FL 33480
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-foreground mb-6 tracking-wider text-sm">HOURS</h4>
            <div className="space-y-2 text-foreground/70">
              <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: By Appointment</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-border text-center text-sm text-foreground/50"
        >
          <p>&copy; {new Date().getFullYear()} Palm Beach Exotics. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

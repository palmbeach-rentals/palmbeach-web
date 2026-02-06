import { motion } from 'motion/react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="py-20 lg:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <img
            src="/media/images/logo/logo-color.png"
            alt="Palm Beach Exotic Rentals"
            className="h-10 lg:h-12 w-auto mx-auto mb-6"
          />
          <p className="text-foreground/40 text-sm max-w-md mx-auto leading-relaxed">
            A curated collection of rare automotive and yachting experiences for the discerning few.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-20">
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-foreground/30 mb-6 tracking-[0.3em] text-[10px] uppercase">Contact</h4>
            <div className="space-y-4">
              <a
                href="tel:+15615551234"
                className="flex items-center gap-3 text-foreground/50 hover:text-accent transition-colors duration-500 group"
              >
                <Phone className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors duration-500" />
                <span className="text-sm">(561) 555-1234</span>
              </a>
              <a
                href="mailto:concierge@palmbeachexotics.com"
                className="flex items-center gap-3 text-foreground/50 hover:text-accent transition-colors duration-500 group"
              >
                <Mail className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors duration-500" />
                <span className="text-sm">concierge@palmbeachexotics.com</span>
              </a>
              <div className="flex items-start gap-3 text-foreground/50">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent/40" />
                <span className="text-sm">
                  Worth Avenue
                  <br />
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
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-foreground/30 mb-6 tracking-[0.3em] text-[10px] uppercase">Hours</h4>
            <div className="space-y-3 text-foreground/50 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-foreground/70">9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-foreground/70">10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-foreground/70">By Appointment</span>
              </div>
            </div>
          </motion.div>

          {/* Social & Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-foreground/30 mb-6 tracking-[0.3em] text-[10px] uppercase">Follow</h4>
            <div className="flex gap-3 mb-8">
              <a
                href="#"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-500 group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-foreground/40 group-hover:text-accent transition-colors duration-500" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-500 group"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-foreground/40 group-hover:text-accent transition-colors duration-500" />
              </a>
            </div>
            <p className="text-foreground/20 text-xs leading-relaxed">
              Stay connected for exclusive releases, seasonal offers, and behind-the-scenes access to the fleet.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="gold-line w-full mb-8" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/20"
        >
          <p>&copy; {new Date().getFullYear()} Palm Beach Exotic Rentals. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Palm Beach, Florida</p>
        </motion.div>
      </div>
    </footer>
  );
}

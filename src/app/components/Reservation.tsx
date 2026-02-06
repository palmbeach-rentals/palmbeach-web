import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { vehicles, yacht } from '../data/fleet';

export function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    vehicle: '',
    dates: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Reservation request:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <section id="reservation" className="py-20 lg:py-36 bg-card min-h-screen flex items-center">
        <div className="container mx-auto px-5 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 lg:mb-8 border border-accent flex items-center justify-center"
            >
              <Check className="w-7 h-7 lg:w-8 lg:h-8 text-accent" />
            </motion.div>
            <h2
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-3xl md:text-4xl lg:text-6xl text-foreground mb-5 lg:mb-6 tracking-tight"
            >
              Request Received
            </h2>
            <div className="gold-line w-16 mx-auto mb-5 lg:mb-6" />
            <p className="text-base lg:text-lg text-foreground/60 leading-relaxed mb-4 px-4">
              Your request has been received. Our concierge team will contact you shortly to finalize
              the details of your experience.
            </p>
            <p className="text-foreground/30 text-sm">
              We typically respond within 2-4 hours during business hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="py-20 lg:py-36 bg-card relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-5 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 lg:mb-18"
          >
            <span className="text-accent text-[10px] lg:text-xs tracking-[0.4em] uppercase block mb-5">
              Begin Your Journey
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-3xl md:text-4xl lg:text-6xl text-foreground mb-5 tracking-tight"
            >
              Request Availability
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-5"
            />
            <p className="text-foreground/50 text-sm lg:text-base max-w-lg mx-auto leading-relaxed px-4">
              Share your details and our team will craft a tailored experience for you.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-5 lg:space-y-6"
          >
            {/* Row 1: Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-foreground/40 text-[10px] lg:text-xs tracking-[0.2em] uppercase mb-2 lg:mb-3"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-5 lg:px-6 py-3.5 lg:py-4 bg-background border border-border text-foreground placeholder:text-foreground/20 focus:border-accent focus:outline-none transition-all duration-300 text-sm lg:text-base"
                placeholder="Your name"
              />
            </div>

            {/* Row 2: Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-foreground/40 text-[10px] lg:text-xs tracking-[0.2em] uppercase mb-2 lg:mb-3"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 lg:px-6 py-3.5 lg:py-4 bg-background border border-border text-foreground placeholder:text-foreground/20 focus:border-accent focus:outline-none transition-all duration-300 text-sm lg:text-base"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-foreground/40 text-[10px] lg:text-xs tracking-[0.2em] uppercase mb-2 lg:mb-3"
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 lg:px-6 py-3.5 lg:py-4 bg-background border border-border text-foreground placeholder:text-foreground/20 focus:border-accent focus:outline-none transition-all duration-300 text-sm lg:text-base"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Row 3: Vehicle + Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              <div>
                <label
                  htmlFor="vehicle"
                  className="block text-foreground/40 text-[10px] lg:text-xs tracking-[0.2em] uppercase mb-2 lg:mb-3"
                >
                  Vehicle of Interest *
                </label>
                <select
                  id="vehicle"
                  name="vehicle"
                  required
                  value={formData.vehicle}
                  onChange={handleChange}
                  className="w-full px-5 lg:px-6 py-3.5 lg:py-4 bg-background border border-border text-foreground focus:border-accent focus:outline-none transition-all duration-300 appearance-none text-sm lg:text-base min-h-[48px]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 5L6 8L9 5' stroke='%23C9A961' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1.25rem center',
                  }}
                >
                  <option value="">Select a vehicle</option>
                  <optgroup label="Exotic Cars">
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} ({vehicle.year})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Yacht">
                    <option value={yacht.id}>
                      {yacht.name} ({yacht.length})
                    </option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label
                  htmlFor="dates"
                  className="block text-foreground/40 text-[10px] lg:text-xs tracking-[0.2em] uppercase mb-2 lg:mb-3"
                >
                  Preferred Dates *
                </label>
                <input
                  type="text"
                  id="dates"
                  name="dates"
                  required
                  value={formData.dates}
                  onChange={handleChange}
                  className="w-full px-5 lg:px-6 py-3.5 lg:py-4 bg-background border border-border text-foreground placeholder:text-foreground/20 focus:border-accent focus:outline-none transition-all duration-300 text-sm lg:text-base"
                  placeholder="e.g., March 15-17, 2026"
                />
              </div>
            </div>

            {/* Row 4: Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-foreground/40 text-[10px] lg:text-xs tracking-[0.2em] uppercase mb-2 lg:mb-3"
              >
                Additional Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 lg:px-6 py-3.5 lg:py-4 bg-background border border-border text-foreground placeholder:text-foreground/20 focus:border-accent focus:outline-none transition-all duration-300 resize-none text-sm lg:text-base"
                placeholder="Any special requests or questions?"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01, boxShadow: '0 0 40px rgba(201,169,97,0.2)' }}
              whileTap={{ scale: 0.99 }}
              className="group w-full px-10 py-4 lg:py-5 bg-accent text-accent-foreground text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-accent/90 flex items-center justify-center gap-3 min-h-[48px]"
            >
              Submit Request
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <p className="text-center text-[10px] lg:text-xs text-foreground/20 leading-relaxed tracking-wide">
              By submitting this form, you agree to be contacted by our team regarding your inquiry.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

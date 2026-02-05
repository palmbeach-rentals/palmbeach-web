import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { vehicles, yacht } from '../data/fleet';

export function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    vehicle: '',
    dates: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, this would send to a backend/API
    console.log('Reservation request:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <section id="reservation" className="py-24 lg:py-32 bg-background min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-accent" />
            </motion.div>
            <h2
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight"
            >
              Request Received
            </h2>
            <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed mb-8">
              Your request has been received. Our concierge team will contact you shortly to finalize the details of your experience.
            </p>
            <p className="text-foreground/60">
              We typically respond within 2-4 hours during business hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight"
            >
              Request Availability
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Share your details and our team will craft a tailored experience for you.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-foreground/80 mb-3 tracking-wide">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-input-background border border-input text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors duration-300"
                placeholder="Your name"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-foreground/80 mb-3 tracking-wide">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-input-background border border-input text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-foreground/80 mb-3 tracking-wide">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-input-background border border-input text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors duration-300"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label htmlFor="vehicle" className="block text-foreground/80 mb-3 tracking-wide">
                Vehicle of Interest *
              </label>
              <select
                id="vehicle"
                name="vehicle"
                required
                value={formData.vehicle}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-input-background border border-input text-foreground focus:border-accent focus:outline-none transition-colors duration-300"
              >
                <option value="">Select a vehicle</option>
                <optgroup label="Exotic Cars">
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} ({vehicle.year})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Yacht">
                  <option value={yacht.id}>{yacht.name} ({yacht.length})</option>
                </optgroup>
              </select>
            </div>

            {/* Preferred Dates */}
            <div>
              <label htmlFor="dates" className="block text-foreground/80 mb-3 tracking-wide">
                Preferred Dates *
              </label>
              <input
                type="text"
                id="dates"
                name="dates"
                required
                value={formData.dates}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-input-background border border-input text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors duration-300"
                placeholder="e.g., March 15-17, 2026"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-foreground/80 mb-3 tracking-wide">
                Additional Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-input-background border border-input text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                placeholder="Any special requests or questions?"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-10 py-5 bg-accent text-accent-foreground text-lg tracking-wide transition-all duration-300 hover:bg-accent/90"
            >
              Submit Request
            </motion.button>

            <p className="text-center text-sm text-foreground/50 leading-relaxed">
              By submitting this form, you agree to be contacted by our team regarding your inquiry.
              We respect your privacy and will never share your information.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

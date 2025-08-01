'use client';

import React from 'react';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      <section className="py-20 lg:py-32 pb-32 bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 dark:from-red-800 dark:via-red-700 dark:to-yellow-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Ready to Get Started?
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Get your free consultation and see why over 700 clients have
              trusted us with their mortgage needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ActiveCampaign Form Integration */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl flex flex-col justify-center">
              <h3 className="text-3xl text-center font-bold mb-6 text-white">
                Get Your Free Consultation
              </h3>

              {/* ActiveCampaign iframe */}
              <div className="bg-white rounded-xl p-4 shadow-lg" style={{ marginTop: '20px' }}>
                <iframe
                  src="https://nathandelpapa.activehosted.com/f/1"
                  name="spartaMortgageForm"
                  scrolling="yes"
                  marginHeight={0}
                  marginWidth={0}
                  height="850px"
                  width="100%"
                  allowFullScreen
                  className="rounded-lg border-0"
                  style={{ minHeight: '890px' }}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-white">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Serving:</p>
                      <p className="text-white/90">
                        Kentucky, Indiana, Florida & Georgia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Phone:</p>
                      <a
                        href="tel:+15028191739"
                        className="text-white/90 hover:text-yellow-300 transition-colors"
                      >
                        (502) 819-1739
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Email:</p>
                      <a
                        href="mailto:nathan@spartamortgage.com"
                        className="text-white/90 hover:text-yellow-300 transition-colors"
                      >
                        nathan@spartamortgage.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">NMLS License</p>
                      <p className="text-white/90">1857586 & 51796</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Office Address</p>
                      <p className="text-white/90">
                        11037 Radleigh Lane
                        <br />
                        Louisville, KY 40291
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4">
                  Why Choose Sparta Over Banks?
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white/90">Licensing required</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white/90">Extensive experience</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white/90">Specialized knowledge</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white/90">
                      Creative problem solving
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white/90">Always accessible</span>
                  </li>
                </ul>
              </div>

              {/* Google Maps */}
              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4">Our Location</h4>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ32l-S42naYgRTT7AoGnFdG0&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

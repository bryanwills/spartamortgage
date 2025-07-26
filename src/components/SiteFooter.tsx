import React from "react";
import { Facebook, Linkedin, Star, MessageCircle, ThumbsUp } from "lucide-react";

const socials = [
  {
    href: "https://search.google.com/local/reviews?placeid=ChIJ32l-S42naYgRTT7AoGnFdG0",
    icon: <Star className="h-6 w-6" />,
    alt: "Google Reviews"
  },
  {
    href: "https://www.facebook.com/pg/mortgagewithnathan/reviews/",
    icon: <Facebook className="h-6 w-6" />,
    alt: "Facebook Reviews"
  },
  {
    href: "https://www.angieslist.com/companylist/us/ky/louisville/mortgage-with-nathan-reviews-9015871.htm",
    icon: <ThumbsUp className="h-6 w-6" />,
    alt: "Angie's List Reviews"
  },
  {
    href: "https://www.linkedin.com/in/nathandelpapa",
    icon: <Linkedin className="h-6 w-6" />,
    alt: "LinkedIn"
  },
  {
    href: "https://www.yelp.com/biz/nathan-delpapa-louisville?utm_campaign=Sep-06-2017&utm_medium=email&utm_source=personal_stats",
    icon: <MessageCircle className="h-6 w-6" />,
    alt: "Yelp Reviews"
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="flex gap-4 mb-4 md:mb-0">
          {socials.map((social, index) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
              aria-label={social.alt}
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="text-center text-sm">
          <a
            href="https://nathandelpapa.ac-page.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-400 mr-2 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          &copy; <span id="year">{new Date().getFullYear()}</span> Sparta Mortgage. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
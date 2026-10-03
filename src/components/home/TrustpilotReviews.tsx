import React from 'react';
import { Star, CheckCircle2, ShieldCheck, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'James Thornton',
    location: 'Richmond, TW10',
    itemRented: 'Kärcher K5 Pressure Washer',
    text: 'Unbelievable service. I needed to blast clean the patio before our summer barbecue. Delivered at 10:15am sharp, worked like a dream, and collected the next evening without freezing £300 in deposits like traditional hire shops. 10/10.',
    rating: 5,
    date: '2 days ago'
  },
  {
    name: 'Aisha Patel',
    location: 'Islington, N1',
    itemRented: 'Backyard Starlight Cinema Bundle',
    text: 'Rented the 4K projector, 120" screen and popcorn maker for my daughter’s 14th birthday party. The setup was flawless, cables all included, and zero deposit hold was a huge relief. Everyone loved the cinema popcorn!',
    rating: 5,
    date: '1 week ago'
  },
  {
    name: 'Danielle Brooks',
    location: 'Clapham, SW4',
    itemRented: 'JBL PartyBox 710 Sound Rig',
    text: 'This speaker is a beast! Filled our entire garden with rich club sound and synchronized strobe lights. Arrived in a heavy-duty padded transport tote with PAT test certificate. Collection was seamless. Will use Looply every summer.',
    rating: 5,
    date: '3 weeks ago'
  },
  {
    name: 'Marcus Sterling',
    location: 'Kensington, W8',
    itemRented: 'Festool TS 55 Plunge Cut Saw Kit',
    text: 'Saved me £600 on buying a track saw for a 2-day kitchen oak worktop installation. The blade was razor sharp and splinter-free. Cleaned and ready to go straight out of the case.',
    rating: 5,
    date: 'Last month'
  }
];

export const TrustpilotReviews: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-1 text-emerald-600 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current text-emerald-600" />
            ))}
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Rated 4.9 / 5.0 by London renters
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Read authentic experiences from over 850+ completed zero-deposit rentals across the UK.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-emerald-600">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      {rev.name}
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    </h4>
                    <span className="text-[10px] text-slate-400 block">{rev.location}</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg truncate">
                  Rented: {rev.itemRented}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

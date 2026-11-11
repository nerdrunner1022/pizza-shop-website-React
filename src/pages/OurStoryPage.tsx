import React from 'react';
import { Flame, Clock, Sparkles, Award, Layers, ShieldCheck } from 'lucide-react';
import { HERITAGE_TIMELINE } from '../data/mockData';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FBF9F5] pt-32 pb-24 px-6 sm:px-12 lg:px-16 xl:px-24 w-full">
      <div className="w-full space-y-20">
        {/* Editorial Title Header */}
        <div className="text-center space-y-5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#D9A35F]">
            <Flame className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>The Philosophy & Heritage</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FBF9F5] leading-tight">
            The Discipline of Fire & Time
          </h1>

          <p className="text-sm sm:text-base text-[#A39E93] font-light leading-relaxed">
            In an era obsessed with mechanical speed, Antonio’s Corner remains committed to slow volcanic alchemy. Here is the quiet journey behind every charred cornicione.
          </p>
        </div>

        {/* Featured Pull Quote Block */}
        <div className="glass-panel-warm rounded-3xl p-8 sm:p-12 border border-[#C85A32]/30 relative overflow-hidden text-center space-y-4">
          <p className="font-serif text-xl sm:text-3xl text-[#FBF9F5] italic leading-relaxed max-w-3xl mx-auto">
            "A Neapolitan pizza is not assembled. It is born from living yeast, volcanic earth, and eighty-five seconds of absolute surrender to nine hundred degrees of wood flame."
          </p>
          <span className="text-xs uppercase tracking-[0.2em] text-[#D9A35F] block font-medium">
            — Antonio De Luca, Founder & Master Pizzaiolo
          </span>
        </div>

        {/* Pillar 1: The Madre & Sourdough Science */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C85A32] font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Dough Science • 72-Hour Lactic Ferment</span>
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#FBF9F5]">
              Living Yeast Since 1984
            </h2>
            <p className="text-xs sm:text-sm text-[#A39E93] font-light leading-relaxed">
              Our mother starter (<em className="text-[#EFE9DC]">Lievito Madre</em>) was ignited forty years ago in Caserta, southern Italy, nurtured with wild orchard apples and mountain well water. It requires feeding twice daily at exact ambient temperatures.
            </p>
            <p className="text-xs sm:text-sm text-[#A39E93] font-light leading-relaxed">
              During our three-stage, 72-hour cold maturation, natural enzymes break down complex starches and wheat gluten into bio-available amino acids. The result is a featherlight crust that leaves you energized—never bloated.
            </p>
          </div>

          <div className="md:col-span-6 bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#D9A35F]">
              The Fermentation Phases
            </h3>
            <div className="space-y-3 text-xs text-[#A39E93]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <strong className="text-[#FBF9F5] block">Phase 1: Autolyse (Hours 0 – 4)</strong>
                Stone-ground Italian Tipo 00 and ancient spelt absorb spring water, developing gentle enzymatic hydration.
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <strong className="text-[#FBF9F5] block">Phase 2: Bulk Maturation (Hours 4 – 48)</strong>
                Cold retardation at 4°C allows lactic acid bacteria to outpace yeasts, building complex sour aromatic esters.
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <strong className="text-[#FBF9F5] block">Phase 3: Staglinatura & Bench Rest (Hours 48 – 72)</strong>
                Hand-balled dough rests in beechwood boxes, accumulating micro-gas bubbles for explosive cornicione puff.
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: The Acunto Brick Oven & Wood Cuttings */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 order-2 md:order-1 bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#D9A35F]">
              Thermal Profile & Wood Selection
            </h3>
            <div className="space-y-3 text-xs text-[#A39E93]">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span>Dome Radiant Ceiling</span>
                <span className="font-mono font-semibold text-[#C85A32]">900°F – 950°F</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span>Vesuvian Floor Stone</span>
                <span className="font-mono font-semibold text-[#D9A35F]">840°F – 870°F</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span>Flash Baking Window</span>
                <span className="font-mono font-semibold text-[#FBF9F5]">80 to 90 Seconds</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span>Fuel Profile</span>
                <span className="font-mono font-semibold text-[#EFE9DC]">Aged California Oak & Olive</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 order-1 md:order-2 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C85A32] font-semibold flex items-center gap-2">
              <Flame className="w-4 h-4" />
              <span>Volcanic Hearth • 900°F</span>
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#FBF9F5]">
              Built with Sand from Vesuvius
            </h2>
            <p className="text-xs sm:text-sm text-[#A39E93] font-light leading-relaxed">
              Our 3.5-ton Acunto oven was hand-crafted by multi-generational artisans outside Naples. Its dome is mortared with volcanic sand dredged from Mount Vesuvius, capable of withstanding thermal shock and retaining immense radiant energy.
            </p>
            <p className="text-xs sm:text-sm text-[#A39E93] font-light leading-relaxed">
              We burn exclusively dry white oak for high sustained heat, supplemented with seasoned olive orchard wood for a delicate, sweet herbal smoke perfume.
            </p>
          </div>
        </div>

        {/* Pillar 3: Sourcing & D.O.P. Purity */}
        <div className="space-y-8 pt-6">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D9A35F] font-semibold">
              Terroir & Geography
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#FBF9F5]">
              Uncompromising Ingredient Sourcing
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#C85A32]" />
              <h4 className="font-serif text-base font-bold text-[#FBF9F5]">
                Pomodoro San Marzano D.O.P.
              </h4>
              <p className="text-xs text-[#A39E93] font-light leading-relaxed">
                Grown on the mineral-rich slopes of the Sarno Valley. Crushed strictly by hand to protect seed bitterness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
              <Award className="w-6 h-6 text-[#D9A35F]" />
              <h4 className="font-serif text-base font-bold text-[#FBF9F5]">
                Mozzarella di Bufala Campana
              </h4>
              <p className="text-xs text-[#A39E93] font-light leading-relaxed">
                Flown fresh each Tuesday from water buffalo dairies in Caserta and Salerno for unctuous milky acidity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3">
              <Layers className="w-6 h-6 text-[#5B7052]" />
              <h4 className="font-serif text-base font-bold text-[#FBF9F5]">
                EVOO Colline Salernitane
              </h4>
              <p className="text-xs text-[#A39E93] font-light leading-relaxed">
                Cold-extracted from Rotondella and Carpellese olives, offering peppery notes that awaken on hot crust.
              </p>
            </div>
          </div>
        </div>

        {/* Heritage Timeline Section */}
        <div className="space-y-8 pt-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D9A35F] font-semibold">
              The Journey
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
              Four Decades in the Flame
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HERITAGE_TIMELINE.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3 relative"
              >
                <span className="text-xs font-mono font-bold text-[#C85A32] block">
                  {step.year}
                </span>
                <h4 className="font-serif text-base font-bold text-[#FBF9F5]">{step.title}</h4>
                <p className="text-[11px] text-[#D9A35F] font-mono">{step.subtitle}</p>
                <p className="text-xs text-[#A39E93] font-light leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Chef's Signature Section */}
        <div className="pt-16 pb-8 border-t border-white/10 text-center space-y-4">
          <p className="text-xs text-[#A39E93] font-light uppercase tracking-widest">
            Humbly served at the corner of 4th and Elm
          </p>
          <div className="font-serif text-3xl sm:text-4xl text-[#D9A35F] italic tracking-wide">
            Antonio De Luca
          </div>
          <p className="text-xs text-[#A39E93] tracking-widest uppercase">
            Head Pizzaiolo & Keeper of the Hearth
          </p>
        </div>
      </div>
    </div>
  );
};

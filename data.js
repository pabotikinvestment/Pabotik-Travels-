const PABOTIK_DATA = {
  platformConfig: {
    officialEmail: 'pabotikinvestment@gmail.com',
    explorerAccess: 'Free',
    publisherPlans: [
      { id: 'monthly', name: 'Monthly publisher', price: 10, interval: 'month' },
      { id: 'annual', name: 'Annual publisher', price: 99, interval: 'year' }
    ],
    commissionNote: 'Commission and special partner rates are negotiated with each property or operator before publishing.',
    paymentStatus: 'Publisher payments require a connected payment provider before launch.'
  },
  categories: [
    { id: 'fishing', name: 'Big Game Fishing', icon: '✦', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Fishing_Boats%2C_Mathiveri%2C_Maldives.jpg/960px-Fishing_Boats%2C_Mathiveri%2C_Maldives.jpg' },
    { id: 'snorkeling', name: 'Snorkeling', icon: '◌', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Snorkeling_in_the_Indian_Ocean_in_the_Maldives..JPG/960px-Snorkeling_in_the_Indian_Ocean_in_the_Maldives..JPG' },
    { id: 'diving', name: 'Scuba Diving', icon: '◒', image: 'https://visitmaldives.s3.amazonaws.com/5oB5QOqG/c/h8x1oapl-large.jpg' },
    { id: 'cruises', name: 'Dolphin Cruises', icon: '≈', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Dolphins_-_Maldives_-_panoramio.jpg/960px-Dolphins_-_Maldives_-_panoramio.jpg' },
    { id: 'sunset', name: 'Sunset Cruises', icon: '◴', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Sunset_over_boat_jetty_on_Maldivian_island_of_Kanuhura.jpg/960px-Sunset_over_boat_jetty_on_Maldivian_island_of_Kanuhura.jpg' },
    { id: 'sandbank', name: 'Sandbank Trips', icon: '⌂', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Sandbank._Eriyadu%2C_Maldives.jpg/960px-Sandbank._Eriyadu%2C_Maldives.jpg' },
    { id: 'islands', name: 'Island Hopping', icon: '⌁', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Aerial_shot%2C_Maldives.jpg/960px-Aerial_shot%2C_Maldives.jpg' },
    { id: 'private', name: 'Private Boat Trips', icon: '↗', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Lonely_old_boat_at_Thoddoo_island%2C_Maldives.jpg/960px-Lonely_old_boat_at_Thoddoo_island%2C_Maldives.jpg' }
  ],
  locations: [
    'Male City', 'Hulhumale', 'North Male Atoll (Kaafu)', 'South Male Atoll (Kaafu)', 'North Ari Atoll (Alifu Alifu)', 'South Ari Atoll (Alifu Dhaalu)',
    'Vaavu Atoll', 'Baa Atoll', 'Raa Atoll', 'Lhaviyani Atoll', 'Noonu Atoll', 'Shaviyani Atoll', 'Haa Alif Atoll', 'Haa Dhaalu Atoll',
    'Faafu Atoll', 'Dhaalu Atoll', 'Meemu Atoll', 'Thaa Atoll', 'Laamu Atoll', 'Gaafu Alif Atoll', 'Gaafu Dhaalu Atoll', 'Gnaviyani Atoll', 'Addu City (Seenu Atoll)',
    'Adaaran Club Rannalhi', 'Adaaran Prestige Vadoo', 'Adaaran Select Hudhuranfushi', 'Adaaran Select Meedhupparu', 'Alila Kothaifaru Maldives',
    'Alimatha Aquatic Resort', 'Amilla Maldives', 'Ananea Madivaru Maldives', 'Bliss Dhigurah', 'Kaani Hotels & Resorts', 'Plumeria', 'Sky Beach Maldives',
    'Fiyavalhu Maldives', 'The Barefoot Eco Hotel', 'Scubaspa Ying'
  ],
  providers: {
    'lagoon-crew': { name: 'Pabotik Lagoon Crew', syncLabel: 'Demo provider calendar', lastSynced: 'Not connected to a live provider yet' },
    'reef-life': { name: 'Pabotik Reef Guides', syncLabel: 'Demo provider calendar', lastSynced: 'Not connected to a live provider yet' },
    'ocean-charters': { name: 'Pabotik Ocean Charters', syncLabel: 'Demo provider calendar', lastSynced: 'Not connected to a live provider yet' },
    'island-hosts': { name: 'Pabotik Island Hosts', syncLabel: 'Demo provider calendar', lastSynced: 'Not connected to a live provider yet' }
  },
  activities: [
    {
      id: 'sunset-dolphin-cruise', providerId: 'lagoon-crew', category: 'cruises', name: 'Dolphins at Golden Hour', location: 'Male and Hulhumale', duration: '2 hours', price: 58, rating: 4.9, reviews: 86, private: false,
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Dolphins_-_Maldives_-_panoramio.jpg/960px-Dolphins_-_Maldives_-_panoramio.jpg',
      gallery: ['https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Dolphins_-_Maldives_-_panoramio.jpg/960px-Dolphins_-_Maldives_-_panoramio.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Sunset_over_boat_jetty_on_Maldivian_island_of_Kanuhura.jpg/960px-Sunset_over_boat_jetty_on_Maldivian_island_of_Kanuhura.jpg'],
      summary: 'Set out beyond the reef as the sky turns amber, with a local crew who knows where pods gather.',
      highlights: ['Local captain and crew', 'Small groups', 'Sunset refreshments', 'Wildlife spotting'],
      included: ['Speedboat transfer', 'Drinking water', 'Safety equipment', 'Experienced guide'],
      excluded: ['Hotel transfer outside Male area', 'Personal expenses'],
      bring: ['Sun protection', 'Light layers', 'Camera'],
      requirements: 'Suitable for all ages. Children must be accompanied by an adult.',
      cancellation: 'Free cancellation up to 24 hours before departure.'
    },
    {
      id: 'reef-snorkel', providerId: 'reef-life', category: 'snorkeling', name: 'Reef Life Explorer', location: 'Hulhumale reef', duration: '3 hours', price: 72, rating: 4.8, reviews: 124, private: false,
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Snorkeling_in_the_Indian_Ocean_in_the_Maldives..JPG/960px-Snorkeling_in_the_Indian_Ocean_in_the_Maldives..JPG',
      gallery: ['https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Snorkeling_in_the_Indian_Ocean_in_the_Maldives..JPG/960px-Snorkeling_in_the_Indian_Ocean_in_the_Maldives..JPG', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/From_the_ocean._Eriyadu%2C_Maldives.jpg/960px-From_the_ocean._Eriyadu%2C_Maldives.jpg'],
      summary: 'Glide across clear lagoon water and discover coral gardens with a patient, safety-first guide.',
      highlights: ['Two reef stops', 'Quality snorkel gear', 'Marine-life briefing', 'Beginner friendly'],
      included: ['Boat trip', 'Mask, fins and snorkel', 'Guide', 'Fresh water'],
      excluded: ['Underwater camera rental', 'Meals'],
      bring: ['Swimwear', 'Towel', 'Reef-safe sunscreen'],
      requirements: 'Basic swimming ability required. Life jackets are available.',
      cancellation: 'Free cancellation up to 24 hours before departure.'
    },
    {
      id: 'game-fishing', providerId: 'ocean-charters', category: 'fishing', name: 'Indian Ocean Game Fishing', location: 'South Male Atoll', duration: '5 hours', price: 185, rating: 4.9, reviews: 61, private: true,
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Fishing_Boats%2C_Mathiveri%2C_Maldives.jpg/960px-Fishing_Boats%2C_Mathiveri%2C_Maldives.jpg',
      gallery: ['https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Fishing_Boats%2C_Mathiveri%2C_Maldives.jpg/960px-Fishing_Boats%2C_Mathiveri%2C_Maldives.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Fishing_boats._Maldives_2005._Photo-_AusAID_%2810695262086%29.jpg/960px-Fishing_boats._Maldives_2005._Photo-_AusAID_%2810695262086%29.jpg'],
      summary: 'A private offshore charter for anglers who want an unhurried day on the blue water.',
      highlights: ['Private boat', 'Professional tackle', 'Catch-and-release guidance', 'Flexible route'],
      included: ['Boat and fuel', 'Fishing equipment', 'Captain and crew', 'Water and snacks'],
      excluded: ['Hotel transfers', 'Fishing license if required'],
      bring: ['Hat and sunglasses', 'Motion-sickness tablets', 'Comfortable clothing'],
      requirements: 'No previous experience required. Minimum age 8 for offshore trips.',
      cancellation: 'Free cancellation up to 48 hours before departure.'
    },
    {
      id: 'sandbank-escape', providerId: 'lagoon-crew', category: 'sandbank', name: 'Private Sandbank Escape', location: 'North Male Atoll', duration: '4 hours', price: 145, rating: 4.8, reviews: 47, private: true,
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Sandbank._Eriyadu%2C_Maldives.jpg/960px-Sandbank._Eriyadu%2C_Maldives.jpg',
      gallery: ['https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Sandbank._Eriyadu%2C_Maldives.jpg/960px-Sandbank._Eriyadu%2C_Maldives.jpg', 'https://visitmaldives.s3.amazonaws.com/3ql4A7qX/c/mwoujoph-large.jpg'],
      summary: 'Find your own bright edge of the Indian Ocean for a slow afternoon of swimming and island silence.',
      highlights: ['Private speedboat', 'Beach setup', 'Snorkel stop', 'Flexible departure'],
      included: ['Private boat', 'Beach umbrella and mat', 'Fruit and water', 'Snorkel gear'],
      excluded: ['Resort transfer', 'Lunch'],
      bring: ['Swimwear', 'Sunscreen', 'Towel'],
      requirements: 'Suitable for all ages. Sandbank conditions vary with tide.',
      cancellation: 'Free cancellation up to 24 hours before departure.'
    },
    {
      id: 'blue-water-dive', providerId: 'reef-life', category: 'diving', name: 'Blue Water Discovery Dive', location: 'Vaavu Atoll', duration: '6 hours', price: 210, rating: 4.9, reviews: 38, private: false,
      image: 'https://visitmaldives.s3.amazonaws.com/5oB5QOqG/c/h8x1oapl-large.jpg',
      gallery: ['https://visitmaldives.s3.amazonaws.com/5oB5QOqG/c/h8x1oapl-large.jpg', 'https://visitmaldives.s3.amazonaws.com/VYxvgroP/c/dwqtzcvl-large.jpg'],
      summary: 'Discover dramatic reef walls and calm blue-water channels with a certified dive team.',
      highlights: ['Certified instructors', 'Two guided dives', 'Small groups', 'Reef briefing'],
      included: ['Boat trip', 'Tank and weights', 'Certified dive guide', 'Refreshments'],
      excluded: ['Certification course fees', 'Personal dive insurance'],
      bring: ['Certification card', 'Swimwear', 'Dry clothes'],
      requirements: 'Open Water certification required. Medical declaration may apply.',
      cancellation: 'Free cancellation up to 48 hours before departure.'
    },
    {
      id: 'island-flavours', providerId: 'island-hosts', category: 'islands', name: 'Local Island Flavours', location: 'South Male Atoll', duration: '7 hours', price: 98, rating: 4.7, reviews: 73, private: false,
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Aerial_shot%2C_Maldives.jpg/960px-Aerial_shot%2C_Maldives.jpg',
      gallery: ['https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Aerial_shot%2C_Maldives.jpg/960px-Aerial_shot%2C_Maldives.jpg', 'https://thumb.wikimedia.org/wikipedia/commons/thumb/02/Painted_Palm_Trunk_with_Boat_Hull_-_Maafushi_Island_-_South_Male_Atoll_-_Maldives_-_02_%2814109448827%29.jpg/960px-Painted_Palm_Trunk_with_Boat_Hull_-_Maafushi_Island_-_South_Male_Atoll_-_Maldives_-_02_%2814109448827%29.jpg'],
      summary: 'Trade resort time for a day of island life, home-style flavours and warm local stories.',
      highlights: ['Local island visit', 'Cultural host', 'Traditional lunch', 'Scenic boat ride'],
      included: ['Return boat transfer', 'Island guide', 'Lunch and soft drinks', 'Village walk'],
      excluded: ['Souvenirs', 'Hotel pickup outside Male area'],
      bring: ['Modest clothing', 'Comfortable shoes', 'Cash for small purchases'],
      requirements: 'Suitable for all ages. Please dress respectfully on inhabited islands.',
      cancellation: 'Free cancellation up to 24 hours before departure.'
    }
  ],
  properties: [
    { name: 'Cheval Blanc Randheli', type: 'Resort', location: 'Noonu Atoll', bio: 'A private island Maison with 46 villas, dedicated butler service, French and international dining, a Guerlain spa, family programmes, reef excursions and lagoon activities.', provides: ['46 villas', 'Spa and wellness', 'Dining experiences', 'Water activities', 'Family experiences'], price: 'Live quote by date', source: 'Official property site', url: 'https://www.chevalblanc.com/en/maison/randheli/', bookingUrl: 'https://reservation.chevalblanc.com/?adult=2&child=0&currency=USD&hotel=1344&locale=en-US' },
    { name: 'Adaaran Club Rannalhi', type: 'Resort', location: 'South Male Atoll', bio: 'A South Male Atoll island resort with beach access, reef experiences and easy access to water activities.', provides: ['Island resort', 'Beach access', 'Reef activities', 'Water sports'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/resorts/adaaran-club-rannalhi' },
    { name: 'Adaaran Prestige Vadoo', type: 'Resort', location: 'South Male Atoll', bio: 'A private-island resort at the gateway to the South Atolls with villas, reef access and ocean activities.', provides: ['Private island', 'Villas', 'House reef', 'Ocean activities'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/resorts/adaaran-prestige-vadoo' },
    { name: 'Adaaran Select Hudhuranfushi', type: 'Resort', location: 'North Male Atoll', bio: 'A tropical surf-island resort surrounded by water and vegetation, designed for beach days and active escapes.', provides: ['Surf access', 'Beach resort', 'Water sports', 'Family stays'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/resorts/adaaran-select-hudhuranfushi' },
    { name: 'Adaaran Select Meedhupparu', type: 'Resort', location: 'Raa Atoll', bio: 'A full-island Maldives resort with beach and lagoon accommodation, dining and marine activities.', provides: ['Island resort', 'Beach villas', 'Dining', 'Marine activities'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/resorts/adaaran-select-meedhupparu' },
    { name: 'Alila Kothaifaru Maldives', type: 'Resort', location: 'Raa Atoll', bio: 'A private island retreat in scenic Raa Atoll, surrounded by a house reef and natural lagoon.', provides: ['House reef', 'Private island', 'Wellness', 'Diving and snorkelling'], price: 'Live quote by date', source: 'Visit Maldives directory', image: 'https://visitmaldives.s3.amazonaws.com/5oBzmNoG/c/eb18gmwc-gallery-carousel.jpg', url: 'https://visitmaldives.com/en/resorts/alila-kothaifaru-maldives' },
    { name: 'Alimatha Aquatic Resort', type: 'Resort', location: 'Vaavu Atoll', bio: 'An island resort known for its fine-sand beach, lagoon setting and access to Vaavu marine experiences.', provides: ['Beach resort', 'Lagoon access', 'Diving', 'Water activities'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/resorts/alimatha-resort' },
    { name: 'Amilla Maldives', type: 'Resort', location: 'Baa Atoll', bio: 'A private island retreat in the UNESCO Biosphere Reserve of Baa Atoll, with beaches, reef and resort experiences.', provides: ['Private island', 'Biosphere Reserve', 'Dining', 'Wellness'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/resorts/amilla-maldives' },
    { name: 'Ananea Madivaru Maldives', type: 'Resort', location: 'North Ari Atoll', bio: 'An island resort with multiple dining venues, pools and access to the marine life of Ari Atoll.', provides: ['Island resort', 'Dining venues', 'Pools', 'Marine excursions'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/resorts/ananea-madivaru-maldives' },
    { name: 'Bliss Dhigurah', type: 'Guesthouse', location: 'South Ari Atoll', bio: 'A local-island guesthouse base for whale-shark trips, manta encounters, diving, nature and beach time.', provides: ['Local island stay', 'Whale-shark trips', 'Manta trips', 'Diving'], price: 'Live quote by date', source: 'Visit Maldives directory', image: 'https://visitmaldives.s3.amazonaws.com/NQoQDJqv/c/ldpqcgzz-gallery-carousel.jpg', url: 'https://visitmaldives.com/en/guesthouses/bliss-dhigurah' },
    { name: 'Kaani Hotels & Resorts', type: 'Guesthouse', location: 'Maafushi, South Male Atoll', bio: 'A local-island accommodation option with access to Maafushi excursions, beaches and marine activities.', provides: ['Local island stay', 'Excursion access', 'Beach time', 'Water sports'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/guesthouses/kaani-palm-beach' },
    { name: 'Plumeria', type: 'Guesthouse', location: 'Thinadhoo, Vaavu Atoll', bio: 'Comfortable local-island accommodation for guests combining island life with Vaavu diving and water activities.', provides: ['Local island stay', 'Diving access', 'Water activities', 'Island culture'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/guesthouses/plumeria' },
    { name: 'Sky Beach Maldives', type: 'Guesthouse', location: 'Dhiffushi, North Male Atoll', bio: 'An affordable local-island stay with rooms and family suites close to the beaches and excursions of Dhiffushi.', provides: ['Local island stay', 'Family suites', 'Beach access', 'Excursions'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/guesthouses/sky-beach-maldives' },
    { name: 'Fiyavalhu Maldives', type: 'Hotel', location: 'Mandhoo, South Ari Atoll', bio: 'An all-island hotel experience on Mandhoo, surrounded by the natural landscapes of South Ari Atoll.', provides: ['Island hotel', 'Local island setting', 'Dining', 'Nature experiences'], price: 'Live quote by date', source: 'Visit Maldives directory', image: 'https://visitmaldives.s3.amazonaws.com/Z7wzavoW/c/t8nmpgbo-gallery-carousel.jpg', url: 'https://visitmaldives.com/en/hotels/fiyavalhu-maldives' },
    { name: 'The Barefoot Eco Hotel', type: 'Hotel', location: 'Hanimaadhoo, Haa Dhaalu Atoll', bio: 'An eco-focused island hotel with nature, conservation and local-island experiences in the north of the Maldives.', provides: ['Eco stay', 'Local island setting', 'Nature experiences', 'Conservation'], price: 'Live quote by date', source: 'Visit Maldives directory', url: 'https://visitmaldives.com/en/hotels/the-barefoot-eco-hotel' },
    { name: 'Scubaspa Ying', type: 'Liveaboard', location: 'Maldives atolls', bio: 'A liveaboard experience designed around moving between Maldivian dive sites and marine environments.', provides: ['Liveaboard stay', 'Multi-atoll diving', 'Dive support', 'Marine excursions'], price: 'Live quote by date', source: 'Visit Maldives directory', image: 'https://visitmaldives.s3.amazonaws.com/KYyRBkqR/c/nfexwano-gallery-carousel.jpg', url: 'https://visitmaldives.com/en/liveaboards/scubaspa-ying' }
  ],
  shopProducts: [
    { id: 'pearl-tide-necklace', name: 'Pearl Tide Necklace', category: 'Pearls', description: 'A delicate island-inspired necklace, handmade in small batches.', price: null, material: 'Pearl / recycled cord', image: '' },
    { id: 'lagoon-shell-earrings', name: 'Lagoon Shell Earrings', category: 'Earrings', description: 'Lightweight earrings inspired by reef shapes and shallow lagoon light.', price: null, material: 'Shell / sterling silver', image: '' },
    { id: 'coconut-palm-bracelet', name: 'Coconut Palm Bracelet', category: 'Bracelets', description: 'A warm, tactile bracelet made with coconut-inspired natural materials.', price: null, material: 'Coconut / natural fibre', image: '' },
    { id: 'coral-line-pendant', name: 'Coral Line Pendant', category: 'Pendants', description: 'A sculptural pendant drawing its shape from the Maldives reef line.', price: null, material: 'Hand-finished natural materials', image: '' },
    { id: 'island-weave-pouch', name: 'Island Weave Pouch', category: 'Handmade gifts', description: 'A small woven pouch for keepsakes, made for slow island days.', price: null, material: 'Natural fibre / cotton', image: '' },
    { id: 'ocean-memory-set', name: 'Ocean Memory Gift Set', category: 'Gift sets', description: 'A future curated set of handmade island pieces, packaged with care.', price: null, material: 'Seasonal handmade materials', image: '' }
  ],
  officialGuide: {
    facts: [
      { value: '1,192', label: 'islands across the archipelago' },
      { value: '26', label: 'natural atolls in a double chain' },
      { value: '200', label: 'inhabited islands' },
      { value: '5%', label: 'of the planet’s reefs found here' }
    ],
    guides: [
      { title: 'Geography', text: 'Explore the island nation, atolls, reefs, lagoons and the small islands that shape every journey.', url: 'https://visitmaldives.com/en/maldives/geography', action: 'Discover geography' },
      { title: 'People and culture', text: 'Learn about Dhivehi language, island communities, dhoni boatbuilding, cuisine, music and traditional crafts.', url: 'https://visitmaldives.com/en/maldives/culture', action: 'Explore culture' },
      { title: 'Marine environment', text: 'Travel thoughtfully around reefs, marine protected areas, wetlands and fragile island ecosystems.', url: 'https://visitmaldives.com/en/maldives/environment', action: 'Travel responsibly' },
      { title: 'Plan your arrival', text: 'Find registered travel agents and transport providers for transfers, domestic flights and seaplane connections.', url: 'https://visitmaldives.com/en/directory/travel-agents', secondaryUrl: 'https://visitmaldives.com/en/directory/transport-provider', action: 'Plan transport' }
    ],
    links: [
      { label: 'Official resort directory', url: 'https://visitmaldives.com/en/resorts' },
      { label: 'Official hotel directory', url: 'https://visitmaldives.com/en/hotels' },
      { label: 'Official guesthouse directory', url: 'https://visitmaldives.com/en/guesthouses' },
      { label: 'Official liveaboard directory', url: 'https://visitmaldives.com/en/liveaboards' },
      { label: 'Official experiences', url: 'https://visitmaldives.com/en/experience' },
      { label: 'Virtual tours', url: 'https://visitmaldives.com/en/360-tours' }
    ]
  },
  officialDirectories: [
    { title: 'Registered resorts', description: 'Browse the official Visit Maldives resort directory and property profiles.', label: 'View resorts', url: 'https://visitmaldives.com/en/resorts', icon: '⌂' },
    { title: 'Local tourism guesthouses', description: 'Find guesthouses on inhabited islands through the national tourism directory.', label: 'View guesthouses', url: 'https://visitmaldives.com/en/guesthouses', icon: '⌁' },
    { title: 'Hotels and liveaboards', description: 'Compare official listings for hotels and liveaboard operators across the atolls.', label: 'View hotels', url: 'https://visitmaldives.com/en/hotels', secondaryUrl: 'https://visitmaldives.com/en/liveaboards', icon: '◒' },
    { title: 'Registered travel agents', description: 'Connect with tourism businesses listed by Visit Maldives for local planning support.', label: 'View travel agents', url: 'https://visitmaldives.com/en/directory/travel-agents', icon: '↗' }
  ],
  payments: [
    { id: 'bml', name: 'Bank Transfer - BML', detail: 'Payment instructions will be displayed here.', enabled: true },
    { id: 'mib', name: 'Bank Transfer - MIB', detail: 'Payment instructions will be displayed here.', enabled: true },
    { id: 'paypal', name: 'PayPal', detail: 'Payment link will be added.', enabled: true },
    { id: 'google-pay', name: 'Google Pay', detail: 'Payment instructions will be added.', enabled: true },
    { id: 'redotpay', name: 'RedotPay', detail: 'Payment instructions will be added.', enabled: true },
    { id: 'international-card', name: 'International Card', detail: 'International payment instructions will be added.', enabled: true }
  ]
};
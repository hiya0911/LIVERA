/**
 * LIVERA - The Operating System for Living Culture
 * Master Cultural Dataset: West Bengal Heritage Repository
 * Contains structured editorial demo content, artisan profiles, learning pathways, 
 * passports, and regional geographic metadata.
 */

const LIVERA_DATA = {
  // Application metadata
  meta: {
    title: "LIVERA",
    tagline: "Keep Culture Alive",
    supportingStatement: "Preserving the knowledge, people, and traditions that make every community unique.",
    regionFocus: "West Bengal, India",
    version: "1.0.0-mvp",
    attributionNotice: "Prototype demonstration data. All regional associations and artisan profiles are curated for editorial simulation."
  },

  // Impact metrics for the hero impact strip
  metrics: {
    storiesPreserved: "1,240+",
    practitionersFeatured: "186",
    traditionsDocumented: "42",
    learningHours: "3,800+"
  },

  // Living Archive entries (14 comprehensive entries across diverse disciplines)
  archive: [
    {
      id: "arc-01",
      title: "Nakshi Kantha Quilt & Narrative Embroidery",
      bengaliTitle: "নকশী কাঁথা",
      category: "Craft",
      knowledgeType: "craft",
      region: "Birbhum & Murshidabad",
      district: "Birbhum",
      summary: "A centuries-old domestic art where discarded cotton saris are layered and embroidered with intricate running stitches, encoding matrilineal histories and rural folklore.",
      context: "Originally created by rural women using worn-out cotton dhotis and saris sewn together with threads pulled from their borders. The motifs include the Padma (lotus), Kalki (paisley), Tree of Life, village rituals, and mythological epics. Rather than mere textile decor, each kantha serves as a personal visual diary passed down mothers to daughters.",
      technique: "Layering 4 to 7 layers of soft repurposed cotton cloth, basted with rough stitches, followed by the signature 'Kheter Kantha' ripple stitch and dense narrative fill work using naturally dyed cotton and silk threads.",
      provenanceStatus: "Evidence documented",
      statusBadge: "Documented Tradition",
      tags: ["Textiles", "Matrilineal Heritage", "Upcycling", "Storytelling"],
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      featured: true,
      relatedIds: ["arc-07", "arc-08", "art-02"]
    },
    {
      id: "arc-02",
      title: "Bankura Panchmura Terracotta Steeds",
      bengaliTitle: "বাঁকুড়ার পোড়ামাটির ঘোড়া",
      category: "Craft",
      knowledgeType: "craft",
      region: "Panchmura, Bankura",
      district: "Bankura",
      summary: "Graceful red-clay horses with erect ears and elongated necks, originally molded as votive offerings to Dharmathakur and Manasa in the red-soil Rarh terrain.",
      context: "Recognized as an iconic symbol of Indian indigenous design. The potters (Kumbhakars) of Panchmura shape different segments—body, four legs, arching neck, ears, and decorative bands—separately on the potter's wheel and by hand, subsequently joining them before baking in closed pit kilns fueled by sal leaves and rice husks.",
      technique: "Throwing hollow tubular limbs on the wheel, hand-molding facial crests, incising geometric grooves, natural sun drying for three days, followed by traditional reduction or oxidation firing for rich ochre-red or smoked black coloration.",
      provenanceStatus: "GI Tag Certified (Regional)",
      statusBadge: "GI Tag Protected",
      tags: ["Ceramics", "Votive Art", "Rarh Culture", "Sculpture"],
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      featured: true,
      relatedIds: ["arc-06", "arc-07", "art-04"]
    },
    {
      id: "arc-03",
      title: "Baul Mystic Musical Philosophy & Song",
      bengaliTitle: "বাউল গান ও সাধন সঙ্গীত",
      category: "Music",
      knowledgeType: "music",
      region: "Nadia & Birbhum",
      district: "Birbhum",
      summary: "An itinerant mystic tradition declared Intangible Cultural Heritage by UNESCO, seeking the divine 'Moner Manush' (the inner being) through ecstatic singing, ektara, and dubki rhythms.",
      context: "Emerging from heterodox Tantric, Buddhist Sahajiya, and Sufi syncretism across medieval Bengal. Figures like Lalon Fakir, Jadubindu, and Duddu Shah composed songs dismantling caste distinctions, gender orthodoxies, and formal temple rituals in favor of love and universal humanism.",
      technique: "Vocal ornamentation with sudden octave shifts, accompanied by the Ektara (one-string drone made from gourd and split bamboo), the Khamak (plucked drum with variable tension strings), Dotara (plucked lute), and Ghungur ankle bells.",
      provenanceStatus: "UNESCO Intangible Heritage",
      statusBadge: "UNESCO Inscribed",
      tags: ["Sufism", "Sahajiya", "Acoustic Instruments", "Oral Philosophy"],
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      featured: true,
      relatedIds: ["arc-05", "arc-11", "art-03"]
    },
    {
      id: "arc-04",
      title: "Purulia Chhau Martial Mask Craft & Dance",
      bengaliTitle: "পুরুলিয়া ছৌ মুখোশ শিল্প",
      category: "Ritual & Dance",
      knowledgeType: "ritual",
      region: "Charida, Purulia",
      district: "Purulia",
      summary: "Vibrant, oversized papier-mâché and clay masks adorned with feathers and zari, sculpted in Charida village for the acrobatics of the Purulia Chhau martial dance.",
      context: "Chhau dance reenacts episodes from the Ramayana, Mahabharata, and indigenous tribal legends during the spring festival of Chaitra Parva. The artisan village of Charida houses over 300 mask-making families of the Sutradhar community who handcraft deities like Durga, Mahishasura, and forest tigers.",
      technique: "Molding a base over alluvial clay forms, layering 8–10 sheets of recycled paper soaked in flour paste, brushing with fine ash and mud slip, sun-baking, hand-painting vivid eyes and expressions, and festooning with peacock plumes, tinsel, and beads.",
      provenanceStatus: "GI Tag Certified",
      statusBadge: "GI Tag Protected",
      tags: ["Masks", "Martial Arts", "Charida", "Tribal Lore"],
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      featured: true,
      relatedIds: ["arc-02", "arc-13", "art-05"]
    },
    {
      id: "arc-05",
      title: "Patachitra Scroll Painting & Pater Gaan",
      bengaliTitle: "পটচিত্র ও পটের গান",
      category: "Oral & Visual",
      knowledgeType: "oral story",
      region: "Naya, Pingla (Paschim Medinipur)",
      district: "Paschim Medinipur",
      summary: "Audio-visual scrolls unrolled by singing artists ('Patua' or 'Chitrakar'), who serenade audiences with original verses while revealing frame-by-frame visual ballads.",
      context: "In the artisan hamlet of Naya in Pingla, whole families work as Patuas. Traditionally wandering bard-painters who communicated epics, ethical fables, and environmental news. Today, Patuas also address modern events such as climate change, pandemics, and social literacy while keeping antique mineral pigment recipes alive.",
      technique: "Preparing handmade scrolls glued with old cloth backings, grinding mineral pigments from marigold (yellow), aparajita flowers (blue), burnt lamp soot (black), and teak leaves (brown), bound with natural bael (wood apple) gum.",
      provenanceStatus: "Evidence documented",
      statusBadge: "Documented Tradition",
      tags: ["Natural Dyes", "Ballads", "Scroll Painting", "Visual Journalism"],
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      featured: true,
      relatedIds: ["arc-01", "arc-10", "art-01"]
    },
    {
      id: "arc-06",
      title: "Dokra Lost-Wax Metal Casting",
      bengaliTitle: "ডোকরা হস্তশিল্প",
      category: "Craft",
      knowledgeType: "craft",
      region: "Bikna (Bankura) & Dariyapur (Purba Bardhaman)",
      district: "Bankura",
      summary: "Non-ferrous metal casting using the 4,000-year-old cire-perdue (lost wax) process, unchanged since the Dancing Girl of Mohenjo-daro.",
      context: "The Dhokra Damar metalsmiths are nomadic craft clans settled primarily in Bikna and Dariyapur. They craft ritual lamps, deities (Lakshmi, Ganesha), sacred elephants, and stylised folk owls characterized by primitive simplicity, rustic coiled textures, and hollow cores.",
      technique: "Modeling a core of clay and organic matter, overlaying with beeswax wax cords in detailed patterns, encasing in heat-resistant river clay coats with sprues, melting the wax out in open charcoal hearths, and pouring molten brass scrap into the void.",
      provenanceStatus: "GI Tag Certified",
      statusBadge: "GI Tag Protected",
      tags: ["Bronze Age Technique", "Lost Wax", "Metallurgy", "Tribal Design"],
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      featured: false,
      relatedIds: ["arc-02", "arc-07", "art-06"]
    },
    {
      id: "arc-07",
      title: "Baluchari Silk Weaving & Narrative Borders",
      bengaliTitle: "বালুচরি শাড়ি",
      category: "Craft",
      knowledgeType: "craft",
      region: "Bishnupur, Bankura",
      district: "Bankura",
      summary: "Aristocratic silk sarees featuring elaborate mythological panels and Royal Nawabi court scenes woven directly into the pallu using non-metallic silk threads.",
      context: "Pioneered during the 18th century in Baluchar village of Murshidabad under Nawab Murshid Quli Khan, later migrated to Bishnupur under Malla royal patronage. It represents the pinnacle of complex jacquard loom engineering in Eastern India.",
      technique: "Raw silk yarn is boiled with natural soap, dyed, reeled, and woven using specialized harness setups. The iconic pallu features square miniature windows depicting courtly horse carriages, hookah gatherings, and Ramayana episodes with zero zari threads.",
      provenanceStatus: "GI Tag Certified",
      statusBadge: "GI Tag Protected",
      tags: ["Textiles", "Silk", "Malla Dynasty", "Narrative Weaving"],
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      featured: false,
      relatedIds: ["arc-01", "arc-02", "art-07"]
    },
    {
      id: "arc-08",
      title: "Shantiniketan Embossed Leather Craft",
      bengaliTitle: "শান্তিনিকেতনী চামড়ার কাজ",
      category: "Craft",
      knowledgeType: "craft",
      region: "Bolpur, Shantiniketan (Birbhum)",
      district: "Birbhum",
      summary: "Hand-embossed sheepskin and vegetable-tanned leather goods adorned with batik-dyed folk motifs, incubated by Rabindranath Tagore's Sriniketan experiment.",
      context: "Developed in the 1920s at Visva-Bharati's Silpa Sadana by Rathindranath Tagore and artistic polymaths to stimulate rural economic self-reliance. It reimagined local leather craft through Japanese batik resist, Viennese design aesthetics, and indigenous Bengali floral arabesques.",
      technique: "Tanning pliable sheepskins with vegetable extracts, hand-engraving metal plates, blind embossing designs with balanced pressure, and painstakingly painting pigment resists onto grain leather with alcohol-based dyes.",
      provenanceStatus: "GI Tag Certified",
      statusBadge: "GI Tag Protected",
      tags: ["Leather", "Sriniketan", "Tagore Legacy", "Batik Dyeing"],
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      featured: false,
      relatedIds: ["arc-01", "arc-03", "art-02"]
    },
    {
      id: "arc-09",
      title: "Sitalpati Cane Mat Weaving",
      bengaliTitle: "শীতলপাটি শিল্প",
      category: "Craft",
      knowledgeType: "craft",
      region: "Cooch Behar",
      district: "Cooch Behar",
      summary: "Literally 'Cool Mats' woven from the green slips of the Maranta arundinacea (Mutra) reed, renowned for imparting physical coolness during harsh humid summers.",
      context: "Practiced by the Kayastha and Dey communities across North Bengal. A fine Sitalpati is so smooth and lustrous that legends say a snake can glide across it without hindrance. Often given as customary wedding gifts carrying blessing motifs.",
      technique: "Stripping green outer slips of boiled Mutra reed cane, soaking in fermented rice water, splitting into ribbon threads with precision knives, and weaving intricate diagonal twill patterns without any mechanical loom.",
      provenanceStatus: "UNESCO Representative List",
      statusBadge: "UNESCO Recognized",
      tags: ["Natural Cane", "Eco-Design", "North Bengal", "Cooling Fibre"],
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
      featured: false,
      relatedIds: ["arc-01", "arc-04", "art-08"]
    },
    {
      id: "arc-10",
      title: "Kalighat Pat Painting Tradition",
      bengaliTitle: "কালীঘাট পট",
      category: "Oral & Visual",
      knowledgeType: "visual art",
      region: "Kolkata & Howrah",
      district: "Kolkata",
      summary: "The celebrated 19th-century watercolor school originating around Kalighat Temple, famous for bold sweeping brush lines and satirical depictions of colonial babu lifestyles.",
      context: "When village scroll painters migrated to Calcutta during the height of the East India Company's trade, they evolved a fast, expressive souvenir painting style for temple pilgrims. It blended classical Indian iconography with satirical social cartoons lampooning Westernized affectations.",
      technique: "Swift execution using broad camel-hair brushes on cheap mill-made paper. Shading is applied in a single wet sweep with tinted wash alongside stark, decisive lampblack contours.",
      provenanceStatus: "Documented Heritage",
      statusBadge: "Museum Catalogued",
      tags: ["Watercolor", "Satire", "Calcutta History", "Urban Folk"],
      image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=800&q=80",
      featured: false,
      relatedIds: ["arc-05", "arc-03", "art-01"]
    },
    {
      id: "arc-11",
      title: "Gambhira Folk Satirical Theatre",
      bengaliTitle: "গম্ভীরা লোকনাট্য",
      category: "Oral & Ritual",
      knowledgeType: "oral story",
      region: "Malda",
      district: "Malda",
      summary: "A powerful satirical folk drama performed before Shiva (represented as Nana / Grandfather), addressing local socio-political issues, corruption, and agrarian crises.",
      context: "Rooted in the agricultural festivities of Chaitra Sankranti in northern Bengal. Two main performers—Nana (an elder representing cosmic benevolence) and Nati (the irreverent grandson)—engage in witty dialogues, song duets, and comedic sketches that hold authorities accountable.",
      technique: "Masked dance interludes using neem-wood carved masks, rhythmic footwork to the Dhaak, and spontaneous rhyming couplets laced with North Bengal dialect and sharp political wit.",
      provenanceStatus: "State Folklore Archive",
      statusBadge: "Documented Tradition",
      tags: ["Folk Theatre", "Satire", "Agrarian Ritual", "Malda"],
      image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=800&q=80",
      featured: false,
      relatedIds: ["arc-03", "arc-04"]
    },
    {
      id: "arc-12",
      title: "Joynagarer Moa Confectionery Heritage",
      bengaliTitle: "জয়নগরের মোয়া",
      category: "Culinary",
      knowledgeType: "food",
      region: "Joynagar, South 24 Parganas",
      district: "South 24 Parganas",
      summary: "A seasonal winter delicacy prepared solely from popped aromatic Kanakchur paddy, pure wild date palm jaggery (Nolen Gur), cardamom, and rich ghee.",
      context: "Created in the 1920s in Baharu and Joynagar. The fragile confectionery can only be made during winter mornings when freshly tapped date palm sap exudes its highest aromatic esters. It is among Bengal's prized culinary Geographical Indications.",
      technique: "Paddy is gently parched in sand to yield delicate puffed grain, sieved, mixed with bubbling boiling Nolen Gur reduced in earthen cauldrons, garnished with pistachios and raisins, and hand-rolled while warm.",
      provenanceStatus: "GI Tag Certified",
      statusBadge: "GI Tag Protected",
      tags: ["Culinary Art", "Nolen Gur", "Seasonal Heritage", "Winter Harvest"],
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
      featured: false,
      relatedIds: ["arc-01", "arc-09"]
    },
    {
      id: "arc-13",
      title: "Tusu Agrarian Folk Songs & Makar Harvest",
      bengaliTitle: "টুসু গান ও পৌষ সংক্রান্তি",
      category: "Oral & Ritual",
      knowledgeType: "music",
      region: "Jangalmahal (Purulia, Bankura, Jhargram)",
      district: "Purulia",
      summary: "Female-led harvest festival songs sung throughout the month of Poush to venerate Tusu, a folk deity embodying the agricultural bounty of winter paddy.",
      context: "Exclusively preserved through oral transmission by women and young girls. The songs describe household triumphs, the labor of threshing grain, sisterhood, and gentle complaints against patriarchal or feudal injustices in the rural red-laterite belt.",
      technique: "Unaccompanied polyphonic chorus singing, often performed while carrying illuminated earthen Chaudol shrines toward local rivers at dawn on Makar Sankranti.",
      provenanceStatus: "Oral Archive Recorded",
      statusBadge: "Community Documented",
      tags: ["Oral Lore", "Agrarian Songs", "Women's Chorus", "Winter Solstice"],
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
      featured: false,
      relatedIds: ["arc-03", "arc-04"]
    },
    {
      id: "arc-14",
      title: "Bhatiyali Riverine Boatmen Songs",
      bengaliTitle: "ভাটিয়ালি গান",
      category: "Music",
      knowledgeType: "music",
      region: "Sundarbans & Lower Ganges Delta",
      district: "South 24 Parganas",
      summary: "Melancholic solo songs sung by boatmen drifting with the downstream ebb tide, characterized by prolonged notes echoing across wide deltaic rivers.",
      context: "The word 'Bhatiyali' stems from 'Bhata' (ebb tide). When boatmen set their sails and let their craft drift downriver without active rowing, they vocalize contemplative verses meditating on life's solitude, spiritual longing, and the unpredictable fury of the tides.",
      technique: "Sustained high-register breath control with gentle vibrato simulating the sway of waters; typically sung unaccompanied or with the Dotara and flute.",
      provenanceStatus: "Oral Archive Recorded",
      statusBadge: "Community Documented",
      tags: ["Folk Music", "Riverine Culture", "Sundarbans", "Acoustics"],
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      featured: false,
      relatedIds: ["arc-03", "arc-13"]
    }
  ],

  // Illustrative Master Artisans & Practitioners (8 profiles)
  practitioners: [
    {
      id: "art-01",
      name: "Gurupada Chitrakar",
      bengaliName: "গুরুপদ চিত্রকর",
      craft: "Master Patachitra Artist & Bard",
      category: "Visual & Oral Storytelling",
      region: "Naya, Pingla, Paschim Medinipur",
      experience: "38 years of practice",
      bio: "Born into the Chitrakar guild of Pingla, Gurupada learned the secret alchemy of crushed flower petals and lamp soot from his grandfather. He has sung Pat scrolls across 14 international cultural festivals and is the guardian of the antique 'Manasa Mangal' ballad cycles.",
      skills: ["Natural Pigment Extraction", "Scroll Paper Framing", "Improvised Folk Verse", "Traditional Pater Gaan"],
      culturalStory: "My father told me: If you only paint the cloth, it is dead paper. When you sing the story while unrolling the scroll, the painting breathes. We are not just artists; we are the memory keepers of the river valleys.",
      availability: "Available for Apprenticeship & Virtual Workshops",
      passportId: "LIV-PAT-3201",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      studentsMentored: 42,
      featured: true
    },
    {
      id: "art-02",
      name: "Subhadra Devi Karmakar",
      bengaliName: "সুভদ্রা দেবী কর্মকার",
      craft: "Kantha Stitch Virtuoso & Matriarch",
      category: "Textiles",
      region: "Nanoor, Birbhum",
      experience: "44 years of practice",
      bio: "Subhadra leads a cooperative of 65 rural women embroiderers near Shantiniketan. She is celebrated for reviving antique 'Sujni Kantha' and 'Lep Kantha' geometric narrative styles using unraveled silk threads without chemical treatments.",
      skills: ["Nakshi Geometry", "Double Running Stitch (Bhorat)", "Natural Indigo Dyeing", "Pattern Drafting"],
      culturalStory: "When my mother was wedded, her dowry contained one quilt stitched with the stories of three generations. Today my granddaughters stitch alongside me. In every stitch, there is a prayer that our knowledge does not turn into dust.",
      availability: "Accepting Masterclass Registrations",
      passportId: "LIV-BEN-0842",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      rating: 5.0,
      studentsMentored: 110,
      featured: true
    },
    {
      id: "art-03",
      name: "Sadhan Das Baul",
      bengaliName: "সাধন দাস বাউল",
      craft: "Baul Mystic Musician & Ektara Craftsman",
      category: "Music & Philosophy",
      region: "Kenduli, Birbhum",
      experience: "32 years on the Mystic Path",
      bio: "A wandering minstrel of the Jayadeva Kenduli lineage, Sadhan Das pairs the deep resonant philosophy of Lalon Fakir with the artisanal craft of carving hollow gourd Ektaras and tension-string Khamaks from wild timber.",
      skills: ["Ektara Construction", "Dubki Percussion", "Lalon Ballads", "Sufi-Sahajiya Discourse"],
      culturalStory: "The instrument is made from the soil: dried bottle gourd, river bamboo, goat hide. The human body is also made from the soil. When you strum the string, you are tuning your own inner spirit.",
      availability: "Open for Cultural Dialogues & Apprenticeship",
      passportId: null,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      studentsMentored: 28,
      featured: true
    },
    {
      id: "art-04",
      name: "Dilip Kumbhakar",
      bengaliName: "দিলীপ কুম্ভকার",
      craft: "Master Terracotta Sculptor",
      category: "Ceramics",
      region: "Panchmura, Bankura",
      experience: "29 years of practice",
      bio: "Dilip is a fifth-generation potter from Panchmura village. His workshop continues the precise proportions of the famous long-necked Bankura Horse, molding hollow earthenware cylinders by wheel and assembling them with hand-pinched crests.",
      skills: ["Sectional Throwing", "Pit Kiln Reduction", "Alluvial Clay Tempering", "Slip Burnishing"],
      culturalStory: "Clay has memory. If your fingers are angry, the horse's neck will crack during the three days of sun-drying. You must breathe with the red earth of Bankura before you spin the wheel.",
      availability: "Studio Visits & Intensive Craft Residency",
      passportId: "LIV-TER-1109",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      studentsMentored: 54,
      featured: true
    },
    {
      id: "art-05",
      name: "Kartik Sutradhar",
      bengaliName: "কার্তিক সূত্রধর",
      craft: "Chhau Mask Artisan",
      category: "Mask Craft & Sculpture",
      region: "Charida, Purulia",
      experience: "26 years of practice",
      bio: "Kartik leads one of the premier mask ateliers in Charida village. His hand-molded masks for the heroic demon Mahishasura and the multi-armed Goddess Durga are acclaimed by martial acrobats across Purulia and Jharkhand.",
      skills: ["Papier-mâché Molding", "Clay Slip Modeling", "Zari & Feathers Embellishment", "Folk Expression Sculpting"],
      culturalStory: "When the dancer wears the mask, he forgets his own poverty and hunger. For two hours under the spotlight, he becomes the warrior deity. Our masks must hold that divine weight.",
      availability: "Virtual Demonstration & Commissioning",
      passportId: null,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      studentsMentored: 36,
      featured: true
    },
    {
      id: "art-06",
      name: "Nimai Karmakar",
      bengaliName: "নিমাই কর্মকার",
      craft: "Dokra Lost-Wax Metalsmith",
      category: "Metallurgy",
      region: "Bikna, Bankura",
      experience: "35 years of practice",
      bio: "Nimai practices the ancient lost-wax hollow casting technique in the artisan colony of Bikna. Specializing in filigree-coiled brass peacocks, fertility deities, and ancient folk owls modeled from natural beeswax threads.",
      skills: ["Beeswax Thread Drawing", "Refractory Mold Layering", "Crucible Foundry Smelting", "Rustic Patination"],
      culturalStory: "Every piece we make is destroyed in the fire before it is born in bronze. You cannot reproduce a mold; every single creation is born only once in the universe.",
      availability: "Accepting Special Commissions & Teaching",
      passportId: "LIV-DOK-4590",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      studentsMentored: 19,
      featured: false
    },
    {
      id: "art-07",
      name: "Shampa Mondal",
      bengaliName: "শম্পা মণ্ডল",
      craft: "Baluchari Master Weaver",
      category: "Textiles",
      region: "Bishnupur, Bankura",
      experience: "21 years at the Loom",
      bio: "Shampa is one of the rare female master weavers overseeing intricate jacquard graph programming for authentic Baluchari silk borders depicting scenes from the Mahabharata.",
      skills: ["Jacquard Graph Designing", "Natural Silk Dyeing", "Tana-Bana Tensioning", "Pallu Motif Architecture"],
      culturalStory: "To weave one single pallu of seven mythological cartouches takes twenty-two days of unbroken focus. It is mathematics and poetry singing together on the wood shuttle.",
      availability: "Master Classes & Apprenticeship Inquiries",
      passportId: null,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      studentsMentored: 24,
      featured: false
    },
    {
      id: "art-08",
      name: "Manindra Nath Roy",
      bengaliName: "মণীন্দ্র নাথ রায়",
      craft: "Sitalpati Cane Mat Master",
      category: "Eco-Weaving",
      region: "Ghughumari, Cooch Behar",
      experience: "47 years of practice",
      bio: "National Awardee Manindra Nath splits Mutra cane into slips thinner than paper. His heirloom cooling mats grace ancestral palatial homes and state cultural museums across Asia.",
      skills: ["Micro-Cane Splitting", "Twill Mat Weaving", "Fermented Rice Slit Treatment", "Geometric Motif Insertion"],
      culturalStory: "In the humid summer, when no fan can soothe you, lay on a hand-woven Sitalpati. The river cane breathes the morning mist of the Himalayan foothills into your skin.",
      availability: "Available for Consultations & Archival Projects",
      passportId: null,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      rating: 5.0,
      studentsMentored: 60,
      featured: false
    }
  ],

  // Structured Learning Pathways (Apprenticeship Module)
  learningPathways: [
    {
      id: "learn-01",
      title: "Nakshi Kantha Embroidery: From Cloth to Living Narrative",
      bengaliTitle: "নকশী কাঁথা শিল্প শিক্ষা",
      category: "Textiles & Matrilineal Art",
      duration: "4 Interactive Lessons • 2h 30m Total",
      level: "Beginner to Intermediate",
      instructor: "Subhadra Devi Karmakar (Birbhum)",
      badge: "Apprentice of Kantha",
      summary: "Master the foundational geometry, recycled cloth layering, and spiritual motifs of rural Bengal's most poignant matrilineal craft.",
      objectives: [
        "Understand the ethical philosophy of textile upcycling in rural Bengal",
        "Master the 3 core running stitches: 'Kheter' (ripple), 'Dhaner Chora' (paddy field), and 'Bhorat' (fill)",
        "Draft and embroider the sacred 'Kalka' (paisley/Tree of Life) central mandala",
        "Understand how to preserve and care for heirloom heritage textiles"
      ],
      lessons: [
        {
          id: "les-01-01",
          title: "The Philosophy of the Repurposed Saree",
          duration: "25 min",
          summary: "Why Bengal's kantha is fundamentally an eco-feminist manifesto of memory rather than mere decorative sewing.",
          content: `In traditional rural Bengal, no cotton cloth was ever discarded. When a mother's dhaka saree or a grandfather's dhoti softened from years of laundering, it was respectfully washed in river water and kept in wooden chests.

Kantha begins with the intimate act of piling 4 to 8 layers of these worn cotton cloths. The women sat together in courtyards after noon chores, talking, singing, and layering. The threads used for embroidery were unraveled directly from the colored borders of the old saris—ensuring zero waste and continuous familial memory.

Key Principle: The cloth must be soft enough that the needle moves like a boat on quiet water. Never use stiff or modern synthetic fabrics.`,
          quiz: {
            question: "Where did traditional Kantha embroiderers traditionally source their colored thread?",
            options: [
              "Imported Parisian embroidery floss",
              "Unraveled threads from the borders of old worn-out sarees",
              "Synthetic rayon threads bought from city markets",
              "Dyed horsehair fibers"
            ],
            correctIndex: 1,
            explanation: "Traditional Kantha is an art of complete upcycling. Threads were delicately unraveled from the borders of discarded sarees and grouped by color into small balls."
          }
        },
        {
          id: "les-01-02",
          title: "The Trinity of Running Stitches",
          duration: "35 min",
          summary: "Learn the foundational stitch anatomy: the ripple background, paddy motif, and border stitch.",
          content: `Unlike western satin stitch or cross stitch, Kantha achieves its magical organic texture through subtle variations of the humble running stitch.

1. Kheter Kantha (The Ripple Stitch): Extremely close, fine running stitches that create a tactile puckering across the quilt, giving it thermal insulation and water-ripple texture.
2. Dhaner Chora (Paddy Ear Stitch): Alternating angled stitches resembling golden stalks of winter Aman rice.
3. Bhorat (Fill Stitch): Dense interlocking rows that fill sacred lotus petals and divine figures without visible gaps on the front.

Practice Exercise: Prepare a 10x10 cm square of soft cotton muslin. Baste the edges and practice 20 parallel rows of 2mm running stitches with even tension.`,
          quiz: {
            question: "What produces the signature puckered 'ripple' texture of an authentic Kantha quilt?",
            options: [
              "Steam ironing with starch",
              "Dense, parallel running stitches called Kheter Kantha",
              "Boiling the finished quilt in turmeric water",
              "Sewing with elastic nylon threads"
            ],
            correctIndex: 1,
            explanation: "The close, rhythmic running stitches create tiny folds and tension in the cotton layers, giving Kantha its celebrated wavy, comforting texture."
          }
        },
        {
          id: "les-01-03",
          title: "Drafting the Sacred Mandala & Kalka Motif",
          duration: "45 min",
          summary: "Constructing the cosmological center of the quilt with the eight-petaled lotus (Ashtadal Padma).",
          content: `Every traditional ceremonial Kantha is arranged in a cosmic diagram:
- The Center: The Ashtadal Padma (Eight-petaled Lotus), symbolizing the sun, fertility, and the spiritual universe.
- The Four Corners: Four Kalkas (stylized mango or Tree of Life forms) pointing inward toward the center, signifying the four cardinal directions and home protection.
- The Borders: The Par (border running stitch lines) enclosing the sacred narrative space.

Historically, women never drew these with rulers or stencils. They measured with their finger knuckles ('angul') and outlined motifs using diluted sandalwood paste or charred bamboo twig points.`,
          quiz: {
            question: "What traditional motif is almost universally placed at the exact center of a ceremonial Kantha?",
            options: [
              "A British colonial steam engine",
              "The Ashtadal Padma (Eight-petaled Lotus)",
              "A portrait of the local zamindar",
              "A royal crown crest"
            ],
            correctIndex: 1,
            explanation: "The Ashtadal Padma represents the cosmological wheel of life and divine maternal energy at the heart of Bengal folk art."
          }
        },
        {
          id: "les-01-04",
          title: "Heirloom Care, Ethics & Preservation",
          duration: "30 min",
          summary: "How to ethically document artisan provenance and care for delicate vintage textiles.",
          content: `Vintage Kantha quilts are delicate living archives. Proper conservation guidelines include:
1. Never dry clean vintage hand-dyed kantha; harsh chemicals strip the natural vegetable mordants.
2. Wash gently by hand in cold water with crushed Reetha (soapnut) extract.
3. Dry flat in open shade; direct ultraviolet sunlight fades antique indigo and madder red dyes.
4. Store in breathable unbleached cotton muslin cloth with dried neem leaves to repel silverfish—never in airtight plastic containers.`,
          quiz: {
            question: "How should an authentic heritage Kantha quilt be stored safely for generations?",
            options: [
              "Sealed tightly in plastic vacuum bags",
              "Wrapped in breathable cotton muslin with dried neem leaves",
              "Sprayed with chemical naphthalene balls directly",
              "Exposed in direct harsh midday sunlight"
            ],
            correctIndex: 1,
            explanation: "Natural textiles need to breathe. Unbleached muslin prevents moisture accumulation, while dried neem leaves provide safe, time-tested herbal pest resistance."
          }
        }
      ]
    },
    {
      id: "learn-02",
      title: "Bankura Terracotta: The Alchemy of Rarh Clay",
      bengaliTitle: "বাঁকুড়ার মৃৎশিল্প শিক্ষা",
      category: "Ceramic Sculpture",
      duration: "3 Interactive Lessons • 1h 45m Total",
      level: "Beginner to Intermediate",
      instructor: "Dilip Kumbhakar (Panchmura)",
      badge: "Apprentice of Clay",
      summary: "Understand the red alluvial soils of Bankura, wheel-thrown sectional assembly, and low-fire reduction kilns.",
      objectives: [
        "Identify the mineral composition and tempering of Bankura alluvial clay",
        "Master the sectional assembly of the iconic Panchmura horse",
        "Learn traditional pit kiln firing and soot-reduction methods"
      ],
      lessons: [
        {
          id: "les-02-01",
          title: "The Alluvial Clays of the Rarh Plain",
          duration: "30 min",
          summary: "Harvesting, sifting, and kneading the iron-rich clays of the Damodar and Gandheswari river beds.",
          content: `Bankura's terracotta is born from the geological character of the Rarh tract—the ancient undulating land of laterite red soil.
Potters mix two distinct types of earth:
1. Entel Mati: Sticky, dense alluvial clay gathered from dry lake bottoms after the summer monsoon.
2. Bele Mati: Gritty, sandy loam that provides structural rigidity and prevents shrinkage fissures during baking.

The clay is kneaded with bare feet for hours until all air bubbles are expelled, a meditative process called 'Chhana'.`,
          quiz: {
            question: "Why do Bankura potters combine sticky clay (Entel) with sandy loam (Bele)?",
            options: [
              "To make the clay taste sweet",
              "To balance structural strength and prevent shrinking or cracking during firing",
              "To turn the color blue immediately",
              "To make it float on water"
            ],
            correctIndex: 1,
            explanation: "Blending sticky alluvial clay with sandy loam gives the exact plasticity needed for tall hollow shapes without collapsing or cracking."
          }
        },
        {
          id: "les-02-02",
          title: "Sectional Throwing & Assembling the Steed",
          duration: "40 min",
          summary: "How a 3-foot horse is crafted not from a single clay block, but as 7 independently thrown geometric hollow cylinders.",
          content: `The Bankura horse's elegance stems from modular geometry. The master potter throws 7 hollow parts on the wheel:
- Four tubular hollow legs
- One cylindrical barrel for the torso
- One long tapering neck and head
- Two pointed hollow ears

When the sections reach 'leather-hard' dryness, they are joined with thick clay slip ('Ghol'). The artisan then sculpts the expressive arched crest, the incised saddle rings, and the alert pointed ears by hand.`,
          quiz: {
            question: "How is a traditional tall Bankura terracotta horse constructed?",
            options: [
              "Carved out of a single solid boulder of dried clay",
              "Assembled from separately wheel-thrown hollow cylinders while leather-hard",
              "Poured into industrial plastic molds",
              "Formed on an iron wire armature"
            ],
            correctIndex: 1,
            explanation: "The modular assembly of wheel-thrown hollow tubes allows the sculpture to remain lightweight, thermally resilient, and structurally monumental."
          }
        },
        {
          id: "les-02-03",
          title: "Indigenous Firing in Rice-Husk Pit Kilns",
          duration: "35 min",
          summary: "The magic of oxidation vs. reduction firing to achieve glowing terracotta orange or deep smoked graphite black.",
          content: `The firing takes place in a semi-underground pit kiln ('Bhati'). The pots are carefully stacked with layers of dried sal leaves, cow dung cakes, and rice husks.
- Terracotta Red/Ochre: Achieved when vents remain open, allowing oxygen to oxidize iron in the clay into rich iron oxide.
- Smoked Black: Achieved by sealing every chimney vent with wet mud during peak temperature (around 800°C), trapping carbon smoke so it penetrates the porous clay matrix.`,
          quiz: {
            question: "How is the prized smoked-black finish of Bankura pottery achieved without any artificial paint?",
            options: [
              "Coated in synthetic black lacquer",
              "Sealing the kiln vents to starve oxygen and trap carbon smoke (reduction firing)",
              "Dipping the finished pots in squid ink",
              "Painting with bitumen road tar"
            ],
            correctIndex: 1,
            explanation: "Reduction firing deprives the kiln of oxygen, causing carbon particles from rice husks to bond permanently with the clay body, turning it deep lustrous black."
          }
        }
      ]
    },
    {
      id: "learn-03",
      title: "Voice of the Mystic: Fundamentals of Baul Music",
      bengaliTitle: "বাউল সঙ্গীত ও দর্শন শিক্ষা",
      category: "Vocal & Folk Philosophy",
      duration: "3 Interactive Lessons • 2h Total",
      level: "All Enthusiasts",
      instructor: "Sadhan Das Baul (Kenduli)",
      badge: "Apprentice of the Mystic",
      summary: "Explore the humanistic philosophy of Lalon Fakir, rhythmic accompaniment on the Ektara, and vocal breath control.",
      objectives: [
        "Understand the non-sectarian philosophy of 'Moner Manush'",
        "Learn the mechanics and tuning of the Ektara and Khamak",
        "Master the breath dynamics of open-throat riverine singing"
      ],
      lessons: [
        {
          id: "les-03-01",
          title: "The Philosophy of Moner Manush (The Man of the Heart)",
          duration: "35 min",
          summary: "Deconstructing religious orthodoxy and discovering universal humanity through Lalon's verses.",
          content: `In the 18th century, Fakir Lalon Shah composed thousands of songs along the river Sirajganj that challenged caste oppression, dogmatic orthodoxy, and ritual bigotry.

Lalon sang:
'Shob loke koy Lalon ki jaat shongshare,
Lalon koy jaater ki roop dekhlam na ei nojore...'
(Everyone asks what caste or religion Lalon belongs to; Lalon says, I have never seen the physical shape or face of caste with these eyes.)

To sing Baul music is not just vocal performance; it is committing to radical egalitarianism and revering every human being as a living temple.`,
          quiz: {
            question: "What core teaching forms the spiritual foundation of Fakir Lalon Shah's Baul songs?",
            options: [
              "Strict adherence to caste hierarchies",
              "The search for the divine within the human soul ('Moner Manush') beyond sectarian dogma",
              "Renouncing music in favor of silence",
              "Accumulating material wealth"
            ],
            correctIndex: 1,
            explanation: "Baul philosophy teaches that the divine resides not in distant heavens or rigid temples, but within every human being as the 'Inner Person' (Moner Manush)."
          }
        },
        {
          id: "les-03-02",
          title: "Tuning the Gourd Ektara & Dubki Rhythm",
          duration: "45 min",
          summary: "Anatomy of the one-stringed acoustic drone and synchronized foot ankle-bell rhythms.",
          content: `The Ektara consists of a dried round gourd resonator, split bamboo neck, and a single steel or bronze string anchored to an ancient peg.

By gently pressing the two bamboo fork arms together while strumming with the right index finger, the singer bends pitch continuously, matching emotional microtones in vocal delivery.

Alongside the Ektara, the left hand plays the Dubki (small hand tambourine) or the singer ties Ghungur (brass bells) around their ankles, stamping in a rolling 6/8 Dadra or 4/4 Khemta folk meter.`,
          quiz: {
            question: "How does an Ektara player produce subtle pitch shifts and vocal glides on a single string?",
            options: [
              "By turning digital tuning dials",
              "By gently squeezing the split bamboo fork arms together while strumming",
              "By sliding a glass bottle along the neck",
              "By changing batteries"
            ],
            correctIndex: 1,
            explanation: "Squeezing the two flexible arms of the bamboo fork alters the tension on the single string, allowing effortless continuous pitch bends."
          }
        },
        {
          id: "les-03-03",
          title: "Open Throat Breath & Folk Resonance",
          duration: "40 min",
          summary: "Vocal mechanics for unamplified singing across open fields and mela courtyards.",
          content: `Bauls sing outdoors without microphones during nightlong Melas (gatherings). The vocal tone is not pinched or nasal, but deeply rooted in diaphragmatic support.

Key Vocal Principles:
1. Purna Shwaas: Draw breath deep into the lower belly, relaxing the throat.
2. Open Vowels: Sustain vowels ('Aa', 'Ee', 'Oo') with an open palate, projecting toward the horizon.
3. Emotional Murki: Rapid micro-ornaments in the upper register that express spiritual longing ('Biraha').`,
          quiz: {
            question: "Why do Baul singers emphasize deep diaphragmatic projection?",
            options: [
              "Because electric microphones were traditionally unavailable in open night-long rural melas",
              "To scare away wild river animals",
              "To sing only in low whispers",
              "It is an arbitrary requirement"
            ],
            correctIndex: 0,
            explanation: "Baul songs were born in open courtyards and riverbanks; deep open-throat projection allows the acoustic voice to carry across hundreds of listeners under the stars."
          }
        }
      ]
    }
  ],

  // Interactive Cultural Map Locations (6 primary regional heritage hubs)
  mapLocations: [
    {
      id: "loc-kolkata",
      name: "Kolkata & Howrah",
      bengaliName: "কলকাতা ও হাওড়া",
      coords: { x: 62, y: 72 }, // percentage coordinates on our stylized Bengal SVG map
      tagline: "The Metropole of Urban Folk Revival & Cultural Archives",
      description: "From the rapid satire of 19th-century Kalighat watercolors to modern preservation archives and museum conservation studios.",
      featuredPractices: ["Kalighat Pat Painting", "Kumortuli Clay Idol Sculpting", "Urban Baul Ensembles"],
      keyPractitionerIds: ["art-01"],
      featuredStories: ["The Colonial Babu Satire in Kalighat Watercolors", "Kumortuli: Shaping Gods from Hooghly Silt"],
      attractions: ["Victoria Memorial Cultural Wing", "Indian Museum Folklore Galleries", "Kumortuli Potters' Colony", "Kalighat Temple Square"]
    },
    {
      id: "loc-bankura",
      name: "Bankura & Bikna",
      bengaliName: "বাঁকুড়া ও বিকনা",
      coords: { x: 38, y: 56 },
      tagline: "Heartland of Red Clay & Lost-Wax Bronze",
      description: "The rugged laterite Rarh terrain where Dokra metalsmiths and Panchmura potters transform earth and fire into celebrated sculptural emblems.",
      featuredPractices: ["Bankura Terracotta Horses", "Bikna Dokra Lost-Wax Casting", "Mansar Bhaat Votive Songs"],
      keyPractitionerIds: ["art-04", "art-06"],
      featuredStories: ["The Coiled Bronze Owls of Bikna", "Why the Bankura Horse Has Erect Ears"],
      attractions: ["Panchmura Potter Village", "Bikna Dokra Craft Hub", "Susunia Hill Archaeological Site"]
    },
    {
      id: "loc-bishnupur",
      name: "Bishnupur",
      bengaliName: "বিষ্ণুপুর",
      coords: { x: 44, y: 60 },
      tagline: "Royal Malla Capital of Silk & Terracotta Temples",
      description: "Home of 17th-century terracotta temples covered in intricate epic friezes, classical Bishnupur music Gharana, and the complex jacquard Baluchari silk looms.",
      featuredPractices: ["Baluchari Silk Weaving", "Bishnupur Dhrupad Gharana", "Dashavatar Ganjifa Playing Cards"],
      keyPractitionerIds: ["art-04", "art-07"],
      featuredStories: ["Weaving the Mahabharata: The Secret of Baluchari Pallu", "The Clay Epics of Shyamrai Temple"],
      attractions: ["Rasmancha", "Jor Bangla Terracotta Temple", "Malla Heritage Silk Weaving Centers"]
    },
    {
      id: "loc-purulia",
      name: "Purulia & Charida",
      bengaliName: "পুরুলিয়া ও চড়িদা",
      coords: { x: 26, y: 58 },
      tagline: "Land of Chhau Martial Masks & Red Soil Rhythms",
      description: "Nestled beneath the Ayodhya Hills, where martial acrobatic dance dramas reenact mythic battles and entire villages handcraft giant papier-mâché masks.",
      featuredPractices: ["Purulia Chhau Mask Craft", "Tusu Harvest Songs", "Bhadu Ritual Folklore"],
      keyPractitionerIds: ["art-05"],
      featuredStories: ["The Hundred Mask Makers of Charida Village", "Dancing Like the Tiger: The Martial Acrobatics of Chhau"],
      attractions: ["Charida Mask Village", "Ayodhya Hills Scenic Passes", "Chau Dance Training Academies"]
    },
    {
      id: "loc-shantiniketan",
      name: "Shantiniketan & Bolpur",
      bengaliName: "শান্তিনিকেতন ও বোলপুর",
      coords: { x: 48, y: 44 },
      tagline: "Tagore's Open-Air Sanctuary of Art & Matrilineal Stitch",
      description: "The red dust tracks of Birbhum where Rabindranath Tagore built an open-air university under the Chhatim trees, nurturing Kantha collectives and Baul Melas.",
      featuredPractices: ["Nakshi Kantha Embroidery", "Shantiniketan Embossed Leather", "Baul Sangeet & Pous Mela"],
      keyPractitionerIds: ["art-02", "art-03"],
      featuredStories: ["Sriniketan: How Tagore Rebuilt Rural Crafts", "The Song of the Kalka: Matrilineal Memory in Kantha"],
      attractions: ["Visva-Bharati Silpa Sadana", "Sonajhuri Saturday Haat", "Kenduli Jayadeva Baul Sanctuary", "Kopai River Banks"]
    },
    {
      id: "loc-murshidabad",
      name: "Murshidabad & Malda",
      bengaliName: "মুর্শিদাবাদ ও মালদা",
      coords: { x: 55, y: 32 },
      tagline: "Historic Nawabi Capital & Satirical Gambhira Theater",
      description: "The historical throne of Bengal's Nawabs along the Bhagirathi River, famous for raw silk sericulture, royal ivory inlay, and Malda's sharp satirical Gambhira.",
      featuredPractices: ["Murshidabad Pure Silk Reeling", "Gambhira Folk Satirical Theater", "Brass Utensil Chasing"],
      keyPractitionerIds: ["art-07"],
      featuredStories: ["When Murshidabad Silk Clothed Global Courts", "The Grandfather's Mask: Political Satire in Gambhira"],
      attractions: ["Hazarduari Palace Museum", "Kathgola Palace Gardens", "Malda Folk Theatre Arenas"]
    }
  ],

  // Digital Cultural Passports (Demonstrating provenance tracking & authentication status)
  culturalPassports: [
    {
      passportId: "LIV-BEN-0842",
      title: "Vintage Nakshi Kantha Quilt: 'The Tree of Life & River of Memory'",
      category: "Textile Heritage",
      craft: "Hand-Embroidered Nakshi Kantha",
      originRegion: "Nanoor, Birbhum, West Bengal",
      practitioner: "Subhadra Devi Karmakar & Nanoor Women's Collective",
      technique: "Triple-layer cotton basting, Kheter ripple stitch, natural indigo and madder silk threads",
      materials: "100% Repurposed vintage cotton saris, unraveled hand-dyed mulberry silk threads",
      dimensions: "180 cm × 120 cm (Ceremonial Quilt)",
      provenanceEvidence: [
        "Photographic archive of raw cloth basting (Nanoor Studio, 2024)",
        "Recorded oral narrative by lead artisan Subhadra Devi",
        "Material testing confirmed absence of synthetic polymer fibers",
        "Registered with LIVERA Regional Artisan Ledger ID #9921"
      ],
      verificationStatus: "Evidence Documented",
      statusNote: "Full process documented by field researcher; community consensus validated. Not independently lab-certified.",
      qrPayload: "https://livera.culture/passport/LIV-BEN-0842",
      issuedDate: "2025-08-14"
    },
    {
      passportId: "LIV-TER-1109",
      title: "24-Inch Ceremonial Bankura Terracotta Steed",
      category: "Ceramic Sculpture",
      craft: "Sectional Wheel-Thrown Terracotta",
      originRegion: "Panchmura, Bankura, West Bengal",
      practitioner: "Dilip Kumbhakar (Master Studio)",
      technique: "7-piece wheel throwing, hand-grooved ornaments, natural sal leaf reduction pit-kiln firing",
      materials: "Alluvial clay from Damodar riverbed, tempered with Bele sand; no chemical glaze",
      dimensions: "62 cm height × 38 cm length",
      provenanceEvidence: [
        "Panchmura Kumbhakar Guild stamp on inner hollow torso",
        "Geographical Indication (GI) Bengal Terracotta territorial batch match",
        "Natural wood-ash pit firing temperature logs (820°C recorded)"
      ],
      verificationStatus: "GI Tag Certified",
      statusNote: "Compliant with GI certification standards for Bankura Panchmura Pottery.",
      qrPayload: "https://livera.culture/passport/LIV-TER-1109",
      issuedDate: "2025-11-02"
    },
    {
      passportId: "LIV-PAT-3201",
      title: "Manasa Mangal Narrative Scroll (12-Frame Patachitra)",
      category: "Visual Folk Ballad",
      craft: "Mineral Pigment Scroll on Recycled Cotton Backing",
      originRegion: "Naya Village, Pingla, Paschim Medinipur",
      practitioner: "Gurupada Chitrakar",
      technique: "Hand-ground natural pigments bound with Bael fruit gum, sewn onto vintage cotton lining",
      materials: "Marigold yellow, soot black, teak brown, bael gum, handmade paper on cloth",
      dimensions: "340 cm length × 45 cm width",
      provenanceEvidence: [
        "Audio recording of original 14-verse Pater Gaan sung during unrolling",
        "Pigment spectrograph sample confirmed zero synthetic acrylic binder",
        "Field documentation by LIVERA Cultural Stewardship Fellowship"
      ],
      verificationStatus: "Evidence Documented",
      statusNote: "Artisan oral signature and video proof archived in LIVERA repository.",
      qrPayload: "https://livera.culture/passport/LIV-PAT-3201",
      issuedDate: "2026-01-19"
    },
    {
      passportId: "LIV-DOK-4590",
      title: "Dokra Lost-Wax Coiled Bronze Sovereign Owl",
      category: "Indigenous Metallurgy",
      craft: "Cire-Perdue (Lost-Wax) Non-Ferrous Casting",
      originRegion: "Bikna, Bankura, West Bengal",
      practitioner: "Nimai Karmakar",
      technique: "Clay core, natural beeswax wire filigree, single-cast charcoal hearth smelting",
      materials: "Upcycled brass and bronze scrap metal, wild beeswax, alluvial river clay mold",
      dimensions: "18 cm height × 12 cm width (1.4 kg)",
      provenanceEvidence: [
        "Single-use core destruction verified during mold breakout",
        "Bikna Artisan Cooperative Registry #BK-045",
        "Photographic timeline of wax armature modeling"
      ],
      verificationStatus: "Community Contributed",
      statusNote: "Submitted directly by the artisan guild. Awaiting third-party field review.",
      qrPayload: "https://livera.culture/passport/LIV-DOK-4590",
      issuedDate: "2026-03-04"
    }
  ],

  // Initial Seed Community Submissions (to show how community stories populate the archive)
  seedSubmissions: [
    {
      id: "SUB-LIV-001",
      title: "My Grandmother's Lullaby of the Moon and the River Churni",
      contributorName: "Debolina Mukherjee",
      community: "Ranaghat, Nadia",
      category: "Oral Story",
      tradition: "Riverine Lullabies & Folk Rhymes",
      region: "Nadia",
      timePeriod: "1940s Partition Era",
      storyText: "Every evening when the river wind rose, my grandmother would sing about a boatman who crossed the Churni with an urn of milk for the wedding of the moonlight. She never read a book, but she remembered forty verses that described the names of trees that no longer grow on the riverbank.",
      passedDownBy: "Grandmother (Snehalata Devi, born 1928)",
      consentAgreed: true,
      status: "Community contributed — awaiting review",
      submittedDate: "2026-09-12"
    },
    {
      id: "SUB-LIV-002",
      title: "The Recipe of Sundarbans Wild Mangrove Honey Tea",
      contributorName: "Prabir Mondal",
      community: "Gosaba, Sundarbans",
      category: "Culinary & Herbal",
      tradition: "Mawali Honey Collectors' Forest Customs",
      region: "South 24 Parganas",
      timePeriod: "Late 19th Century tradition",
      storyText: "Before entering the Sundarbans forest, the Mawalis pray to Bonbibi. They boil a tea made from tender wild bay leaves, ginger, and raw Khalisa blossom honey. It prevents forest chills and honors the tiger goddess.",
      passedDownBy: "Father, a licensed forest Mawali",
      consentAgreed: true,
      status: "Community contributed — awaiting review",
      submittedDate: "2026-10-01"
    }
  ]
};

// Freeze initial data template so it cannot be accidentally mutated
window.LIVERA_DATA = LIVERA_DATA;

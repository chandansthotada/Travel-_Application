import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Droplets,
  Heart,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  Sun,
  Thermometer,
  Wind,
  X,
} from 'lucide-react';

/* ---------- Types ---------- */

type Destination = {
  name: string;
  state: string;
  tag: string;
  temp: string;
  image: string;
  description: string;
  places: string[];
  bestTime: string;
};

type ChatMessage = { id: number; from: 'ai' | 'user'; text: string };

type PlanDay = { day: string; title: string; items: string[] };

/* ---------- Data ---------- */

const destinations: Destination[] = [
  {
    name: 'Taj Mahal', state: 'Uttar Pradesh', tag: 'Mughal heritage', temp: '22°',
    image: 'https://images.pexels.com/photos/6753755/pexels-photo-6753755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A monument to love, built in white marble that shifts colour with the light of day.',
    places: ['Taj Mahal at sunrise', 'Agra Fort', 'Mehtab Bagh', 'Fatehpur Sikri'], bestTime: 'Oct – Mar',
  },
  {
    name: 'Jaipur', state: 'Rajasthan', tag: 'Pink City', temp: '20°',
    image: 'https://images.pexels.com/photos/32261804/pexels-photo-32261804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Amber forts, rooftop dinners, and bazaars spilling with block-print textiles and gemstones.',
    places: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Johari Bazaar'], bestTime: 'Nov – Feb',
  },
  {
    name: 'Kerala', state: 'Kerala', tag: 'Backwaters', temp: '28°',
    image: 'https://images.pexels.com/photos/34588372/pexels-photo-34588372.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Drift through palm-fringed canals on a houseboat, eating fish curry under the stars.',
    places: ['Alleppey houseboat', 'Munnar tea hills', 'Fort Kochi', 'Kathakali show'], bestTime: 'Sep – Mar',
  },
  {
    name: 'Varanasi', state: 'Uttar Pradesh', tag: 'Sacred ghats', temp: '18°',
    image: 'https://images.pexels.com/photos/38857186/pexels-photo-38857186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Dawn boat rides past ancient ghats and the evening aarti, where fire meets prayer.',
    places: ['Dawn boat ride', 'Ganga aarti', 'Sarnath', 'Silk weaving lanes'], bestTime: 'Oct – Mar',
  },
  {
    name: 'Ladakh', state: 'Ladakh', tag: 'High Himalaya', temp: '8°',
    image: 'https://images.pexels.com/photos/32909865/pexels-photo-32909865.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Turquoise lakes at 14,000 feet, Buddhist monasteries, and roads at the edge of the world.',
    places: ['Pangong Lake', 'Thiksey Monastery', 'Nubra Valley', 'Khardung La pass'], bestTime: 'May – Sep',
  },
  {
    name: 'Goa', state: 'Goa', tag: 'Coast & churches', temp: '30°',
    image: 'https://images.pexels.com/photos/28520254/pexels-photo-28520254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Portuguese churches, rice-plate lunches, and sunsets that turn the Arabian Sea molten.',
    places: ['Chapora Fort sunset', 'Basilica of Bom Jesus', 'Anjuna flea market', 'Palolem beach'], bestTime: 'Nov – Feb',
  },
  {
    name: 'Mysore', state: 'Karnataka', tag: 'Royal city', temp: '24°',
    image: 'https://images.pexels.com/photos/29604731/pexels-photo-29604731.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A palace that blazes with 97,000 lights on Sundays, silk markets, and sandalwood air.',
    places: ['Mysore Palace', 'Chamundi Hill', 'Devaraja Market', 'Brindavan Gardens'], bestTime: 'Oct – Mar',
  },
  {
    name: 'Rishikesh', state: 'Uttarakhand', tag: 'Yoga capital', temp: '16°',
    image: 'https://images.pexels.com/photos/20035462/pexels-photo-20035462.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Where the Ganges leaves the mountains — ashrams, white-water rapids, and yoga by the river.',
    places: ['Beatles Ashram', 'Lakshman Jhula', 'River rafting', 'Evening Ganga aarti'], bestTime: 'Sep – Apr',
  },
  {
    name: 'Darjeeling', state: 'West Bengal', tag: 'Tea hills', temp: '14°',
    image: 'https://images.pexels.com/photos/103875/pexels-photo-103875.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Toy trains through tea gardens, Kanchenjunga at dawn, and momos in the mountain mist.',
    places: ['Tiger Hill sunrise', 'Himalayan Railway', 'Happy Valley Tea Estate', 'Peace Pagoda'], bestTime: 'Mar – May, Oct – Nov',
  },
  {
    name: 'Hampi', state: 'Karnataka', tag: 'Lost kingdom', temp: '27°',
    image: 'https://images.pexels.com/photos/37626185/pexels-photo-37626185.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Boulder-strewn ruins of a vanished empire — temples, elephant stables, and sunset over Virupaksha.',
    places: ['Virupaksha Temple', 'Vittala Temple', 'Matanga Hill sunset', 'Elephant Stables'], bestTime: 'Oct – Feb',
  },
];

const states = [
  'All India', 'Uttar Pradesh', 'Rajasthan', 'Kerala',
  'Ladakh', 'Goa', 'Karnataka', 'Uttarakhand', 'West Bengal',
];

const initialPlan: PlanDay[] = [
  { day: '01', title: 'Arrival & golden hour', items: ['Sunrise at the Taj Mahal', 'Walk through Agra Fort', 'Sunset at Mehtab Bagh'] },
  { day: '02', title: 'Mughal heritage', items: ['Day trip to Fatehpur Sikri', 'Marble inlay workshop', 'Mughlai dinner'] },
  { day: '03', title: 'Slow Agra', items: ['Explore Kinari Bazaar', 'Taj from the river', 'Train to next stop'] },
];

const PAGE_SIZE = 6;

let messageId = 0;
const nextId = () => ++messageId;

/* ---------- Hooks ---------- */

function useImageLoaded(src: string) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  useEffect(() => {
    setStatus('loading');
    const img = new Image();
    img.src = src;
    const handleLoad = () => setStatus('loaded');
    const handleError = () => setStatus('error');
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);
  return status;
}

function useScrollReveal(dep: unknown) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="visible"])');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => el.setAttribute('data-reveal', 'visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [dep]);
}

/* ---------- Components ---------- */

function SmartImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const status = useImageLoaded(src);
  return (
    <div className={`smart-image ${status === 'loaded' ? 'is-loaded' : ''} ${className ?? ''}`}>
      {status === 'loading' && <div className="image-skeleton" aria-hidden="true" />}
      {status === 'error' ? (
        <div className="image-error" role="img" aria-label={`Image of ${alt} unavailable`}>
          <Compass size={28} strokeWidth={1.2} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => {}}
          style={{ opacity: status === 'loaded' ? 1 : 0 }}
        />
      )}
    </div>
  );
}

function App() {
  const [activeDestination, setActiveDestination] = useState<Destination>(destinations[0]);
  const [saved, setSaved] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [activeState, setActiveState] = useState('All India');
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatThinking, setChatThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), from: 'ai', text: "Namaste! Tell me what kind of trip you're dreaming of — mountains, temples, beaches, or food — and I'll shape a route through India for you." },
  ]);
  const [plan] = useState<PlanDay[]>(initialPlan);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const chatPanelRef = useRef<HTMLElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useScrollReveal(visibleCount);

  /* Filter + search */
  const filteredDestinations = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return destinations.filter((item) => {
      const matchesQuery = !normalized || `${item.name} ${item.state} ${item.tag}`.toLowerCase().includes(normalized);
      const matchesState = activeState === 'All India' || item.state === activeState;
      return matchesQuery && matchesState;
    });
  }, [query, activeState]);

  const visibleDestinations = filteredDestinations.slice(0, visibleCount);
  const heroIndex = destinations.indexOf(activeDestination);

  /* Actions */
  const toggleSaved = (name: string) => {
    setSaved((current) => (current.includes(name) ? current.filter((item) => item !== name) : [...current, name]));
  };

  const selectDestination = (destination: Destination) => {
    setActiveDestination(destination);
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitChat = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed || chatThinking) return;
    const userMsg = { id: nextId(), from: 'user' as const, text: trimmed };
    setMessages((current) => [...current, userMsg]);
    setChatInput('');
    setChatThinking(true);
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: nextId(),
          from: 'ai',
          text: `For ${activeDestination.name}, I'd start slow — one iconic sight at golden hour, one local meal you can't get anywhere else, and a morning walk before the crowds. I've shaped a three-day plan around ${activeDestination.state} for you.`,
        },
      ]);
      setChatThinking(false);
    }, 900);
  };

  /* Chat: focus management + auto-scroll + Escape */
  useEffect(() => {
    if (showChat && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [showChat]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, chatThinking]);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && showChat) setShowChat(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showChat]);

  /* Body scroll lock when chat or mobile menu open */
  useEffect(() => {
    const shouldLock = showChat || mobileMenuOpen;
    document.body.style.overflow = shouldLock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showChat, mobileMenuOpen]);

  const handleChatKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') setShowChat(false);
  };

  return (
    <div className="app-shell">
      <a href="#explore" className="skip-link">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bharat Yatra home">
          <span className="brand-mark"><Compass size={18} /></span>
          <span>BHARAT&nbsp;YATRA</span>
        </a>
        <nav className="top-nav" aria-label="Primary navigation">
          <a className="active" href="#explore">Explore</a>
          <a href="#journal">Field notes</a>
          <a href="#plan">Your plan <span className="nav-count">{plan.length}</span></a>
        </nav>
        <button
          className="menu-button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <button className="location-pill" aria-label={`Currently viewing ${activeDestination.name}, ${activeDestination.state}`}>
          <MapPin size={15} />
          <span>{activeDestination.name}, {activeDestination.state}</span>
          <ChevronDown size={15} />
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile navigation" onClick={() => setMobileMenuOpen(false)}>
          <nav aria-label="Mobile primary navigation">
            <a href="#explore" onClick={() => setMobileMenuOpen(false)}>Explore</a>
            <a href="#journal" onClick={() => setMobileMenuOpen(false)}>Field notes</a>
            <a href="#plan" onClick={() => setMobileMenuOpen(false)}>Your plan ({plan.length})</a>
          </nav>
        </div>
      )}

      <main id="top">
        {/* Hero */}
        <section className="hero-section" aria-label="Hero">
          <div className="hero-copy">
            <div className="eyebrow" data-reveal><span className="eyebrow-line" />Incredible India</div>
            <h1 data-reveal>Discover the<br /><em>wonder of India.</em></h1>
            <p className="hero-lede" data-reveal>From the marble of the Taj to the backwaters of Kerala — curated destinations, honest weather, and a guide to help you travel India like you mean it.</p>
            <div className="hero-actions" data-reveal>
              <a className="primary-button" href="#explore">Find your next place <ArrowRight size={16} /></a>
              <button className="text-button" onClick={() => setShowChat(true)}><Sparkles size={16} /> Ask the guide</button>
            </div>
          </div>
          <div className="hero-image-wrap">
            <SmartImage src={activeDestination.image} alt={`${activeDestination.name} landscape`} className="hero-image-container" />
            <div className="hero-image-overlay" />
            <div className="hero-caption">
              <span>{String(heroIndex + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}</span>
              <span>{activeDestination.name} · {activeDestination.state}</span>
            </div>
            <div className="hero-arrows">
              <button
                aria-label={`Previous destination: ${destinations[(heroIndex + destinations.length - 1) % destinations.length].name}`}
                onClick={() => setActiveDestination(destinations[(heroIndex + destinations.length - 1) % destinations.length])}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                aria-label={`Next destination: ${destinations[(heroIndex + 1) % destinations.length].name}`}
                onClick={() => setActiveDestination(destinations[(heroIndex + 1) % destinations.length])}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="scroll-note" aria-hidden="true"><span className="scroll-line" />Scroll to explore</div>
        </section>

        {/* Weather strip */}
        <section className="weather-strip" aria-label={`Weather for ${activeDestination.name}`}>
          <div className="weather-location">
            <span className="live-dot" aria-hidden="true" />
            <span>Live conditions</span>
            <strong>{activeDestination.name}, {activeDestination.state}</strong>
          </div>
          <div className="weather-main">
            <Sun size={22} strokeWidth={1.5} />
            <strong>{activeDestination.temp}</strong>
            <span>Clear skies</span>
          </div>
          <div className="weather-stat"><Thermometer size={16} /><span>Feels like</span><strong>{parseInt(activeDestination.temp) + 1}°</strong></div>
          <div className="weather-stat"><Wind size={16} /><span>Wind</span><strong>10 km/h</strong></div>
          <div className="weather-stat"><Droplets size={16} /><span>Humidity</span><strong>58%</strong></div>
          <div className="weather-stat best-time"><CalendarDays size={16} /><span>Best time</span><strong>{activeDestination.bestTime}</strong></div>
          <div className="updated">Updated just now</div>
        </section>

        {/* Explore */}
        <section className="explore-section" id="explore" aria-label="Explore destinations">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow"><span className="eyebrow-line" />The shortlist</div>
              <h2>India's finest<br /><em>tourist places.</em></h2>
            </div>
            <p>Not just monuments to tick off.<br />Places that stay with you.</p>
          </div>

          <div className="explore-toolbar" data-reveal>
            <div className="search-field">
              <Search size={17} />
              <label htmlFor="search-input" className="sr-only">Search destinations</label>
              <input
                id="search-input"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }}
                placeholder="Search a place, mood, or state"
                type="search"
              />
            </div>
            <span className="result-count" aria-live="polite">
              {filteredDestinations.length} {filteredDestinations.length === 1 ? 'place' : 'places'}
            </span>
          </div>

          <div className="filter-group" data-reveal role="group" aria-label="Filter by state">
            {states.map((stateName) => (
              <button
                key={stateName}
                className={`filter ${activeState === stateName ? 'active' : ''}`}
                onClick={() => { setActiveState(stateName); setVisibleCount(PAGE_SIZE); }}
                aria-pressed={activeState === stateName}
              >
                {stateName}
              </button>
            ))}
          </div>

          {visibleDestinations.length === 0 ? (
            <div className="empty-state" role="status">
              <Search size={25} />
              <h3>No places found</h3>
              <p>Try a different state or search for a feeling like "beach" or "temple".</p>
              <button className="outline-button small" onClick={() => { setQuery(''); setActiveState('All India'); }}>
                Clear filters <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="destination-grid">
              {visibleDestinations.map((destination, index) => (
                <article
                  className={`destination-card ${index === 0 && visibleCount >= PAGE_SIZE && activeState === 'All India' && !query ? 'featured' : ''}`}
                  key={destination.name}
                  onClick={() => selectDestination(destination)}
                  data-reveal
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${destination.name}, ${destination.state}`}
                  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectDestination(destination); } }}
                >
                  <div className="card-image-wrap">
                    <SmartImage src={destination.image} alt={destination.name} />
                    <button
                      className={`save-button ${saved.includes(destination.name) ? 'saved' : ''}`}
                      aria-label={saved.includes(destination.name) ? `Remove ${destination.name} from saved` : `Save ${destination.name}`}
                      aria-pressed={saved.includes(destination.name)}
                      onClick={(event) => { event.stopPropagation(); toggleSaved(destination.name); }}
                    >
                      <Heart size={17} fill={saved.includes(destination.name) ? 'currentColor' : 'none'} />
                    </button>
                    <span className="card-tag">{destination.tag}</span>
                  </div>
                  <div className="card-content">
                    <div>
                      <span className="card-country">{destination.state}</span>
                      <h3>{destination.name}</h3>
                    </div>
                    <span className="card-temp"><Sun size={14} />{destination.temp}</span>
                    <p>{destination.description}</p>
                    <div className="card-places">
                      {destination.places.slice(0, 3).map((place) => (
                        <span key={place} className="place-chip"><MapPin size={11} />{place}</span>
                      ))}
                    </div>
                    <span className="discover-link" aria-hidden="true">Discover the feeling <ArrowRight size={14} /></span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredDestinations.length > visibleCount && (
            <div className="center-action">
              <button className="outline-button" onClick={() => setVisibleCount(visibleCount + 4)}>
                View more destinations <ArrowRight size={15} />
              </button>
            </div>
          )}
        </section>

        {/* Feature / journal */}
        <section className="feature-section" id="journal" aria-label="Field notes">
          <div className="feature-image" data-reveal>
            <SmartImage src={destinations[3].image} alt="Varanasi ghats at sunset" />
            <div className="feature-number">04</div>
          </div>
          <div className="feature-copy" data-reveal>
            <div className="eyebrow"><span className="eyebrow-line" />A little context</div>
            <h2>Go beyond<br /><em>the monument.</em></h2>
            <p>Good travel in India is less about ticking off sights and more about noticing how a place moves — the chai wallah at dawn, the sound of temple bells, the way light falls on old stone. We pair every destination with the small rituals and honest details that help you arrive with a little more curiosity.</p>
            <a className="text-button dark" href="#plan">Read the field notes <ArrowRight size={15} /></a>
          </div>
        </section>

        {/* Plan */}
        <section className="plan-section" id="plan" aria-label="Your trip plan">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow"><span className="eyebrow-line" />Your next chapter</div>
              <h2>A plan, but with room<br /><em>to be surprised.</em></h2>
            </div>
            <div className="plan-heading-actions">
              <span><CalendarDays size={16} />3 days · {activeDestination.name}</span>
              <button className="outline-button small" onClick={() => setShowChat(true)}><Sparkles size={15} /> Build with guide</button>
            </div>
          </div>

          <div className="plan-layout">
            <div className="plan-days">
              {plan.map((day) => (
                <div className="plan-day" key={day.day} data-reveal>
                  <div className="day-number">{day.day}</div>
                  <div className="day-content">
                    <span className="day-kicker">Day {day.day}</span>
                    <h3>{day.title}</h3>
                    <ul>
                      {day.items.map((item) => (
                        <li key={item}><span className="check-dot" />{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <aside className="plan-aside" data-reveal>
              <div className="aside-label"><Sparkles size={15} /> Your guide says</div>
              <blockquote>"Leave a little white space in the itinerary. In India, that's usually where the best stories begin."</blockquote>
              <div className="guide-signature">
                <div className="avatar">A</div>
                <div><strong>Aria</strong><span>Your India travel guide</span></div>
              </div>
              <button className="primary-button full" onClick={() => setShowChat(true)}>Talk to Aria <MessageCircle size={16} /></button>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top"><span className="brand-mark"><Compass size={18} /></span><span>BHARAT&nbsp;YATRA</span></a>
        <p>Atithi Devo Bhava.</p>
        <div className="footer-links">
          <a href="#explore">Explore</a>
          <a href="#journal">Field notes</a>
          <a href="#plan">Your plan</a>
        </div>
      </footer>

      {showChat && (
        <div className="chat-backdrop" onClick={() => setShowChat(false)} role="presentation">
          <aside
            className="chat-panel"
            ref={chatPanelRef}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={handleChatKeyDown}
            role="dialog"
            aria-label="Travel guide chat"
            aria-modal="true"
          >
            <div className="chat-header">
              <div>
                <div className="aside-label"><Sparkles size={15} /> Your India travel guide</div>
                <h3>Where will you wander?</h3>
              </div>
              <button className="close-button" onClick={() => setShowChat(false)} aria-label="Close guide">
                <X size={18} />
              </button>
            </div>

            <div className="chat-messages" ref={chatMessagesRef} aria-live="polite">
              {messages.map((message) => (
                <div className={`chat-message ${message.from}`} key={message.id}>
                  {message.from === 'ai' && <div className="chat-avatar" aria-hidden="true">A</div>}
                  <p>{message.text}</p>
                </div>
              ))}
              {chatThinking && (
                <div className="chat-message ai thinking" aria-label="Guide is typing">
                  <div className="chat-avatar" aria-hidden="true">A</div>
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              )}
            </div>

            <div className="prompt-chips">
              <button onClick={() => setChatInput('Plan a golden triangle trip')}>Golden Triangle trip</button>
              <button onClick={() => setChatInput('Best beaches in India?')}>Best beaches?</button>
              <button onClick={() => setChatInput('Himalaya itinerary')}>Himalaya itinerary</button>
            </div>

            <form className="chat-form" onSubmit={submitChat}>
              <label htmlFor="chat-input" className="sr-only">Ask your travel guide</label>
              <input
                id="chat-input"
                ref={chatInputRef}
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask anything about India..."
                autoComplete="off"
              />
              <button type="submit" aria-label="Send message" disabled={chatThinking || !chatInput.trim()}>
                {chatThinking ? <Loader2 size={17} className="spin" /> : <Send size={17} />}
              </button>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  Home, 
  Building, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Star,
  TrendingUp,
  Shield,
  Award,
  Zap
} from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import PropertySearch from '../ui/PropertySearch';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSearch = () => {
    // Build search parameters for the Properties page
    const searchParams = new URLSearchParams();
    
    if (searchQuery) {
      searchParams.set('query', searchQuery);
    }
    
    if (selectedLocation) {
      searchParams.set('location', selectedLocation.toLowerCase());
    }
    
    if (selectedType) {
      searchParams.set('type', selectedType.toLowerCase());
    }
    
    if (selectedBudget) {
      // Convert budget range to price range
      const budgetRanges = {
        'Under 50 Lac': { min: 0, max: 5000000 },
        '50 Lac - 1 Cr': { min: 5000000, max: 10000000 },
        '1 Cr - 2 Cr': { min: 10000000, max: 20000000 },
        '2 Cr - 5 Cr': { min: 20000000, max: 50000000 },
        '5 Cr+': { min: 50000000, max: undefined }
      };
      
      const range = budgetRanges[selectedBudget as keyof typeof budgetRanges];
      if (range) {
        if (range.min !== undefined) {
          searchParams.set('minPrice', range.min.toString());
        }
        if (range.max !== undefined) {
          searchParams.set('maxPrice', range.max.toString());
        }
      }
    }
    
    // Navigate to Properties page with search parameters
    const propertiesUrl = `/properties?${searchParams.toString()}`;
    navigate(propertiesUrl);
  };

  const handleSelectLocation = (city: string) => {
    setSelectedLocation(city);
    toggleDropdown('location');
  };

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    toggleDropdown('type');
  };

  const handleSelectBudget = (budget: string) => {
    setSelectedBudget(budget);
    toggleDropdown('budget');
  };

  // Helper to split text into words and animate each word
  const AnimatedHeading = () => {
    const heading = "Find Your Dream Property in India's Finest Locations";
    const words = heading.split(' ');
    return (
      <motion.h1
        className="font-display text-4xl md:text-5xl lg:text-6xl text-white dark:text-white font-semibold leading-tight mb-6 flex flex-wrap gap-x-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className={word === 'Property' ? 'text-gold-400' : ''}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
    );
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 dark:from-royal-900 dark:to-transparent"></div>
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=3000" 
          alt="Luxury home" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto relative z-10 px-6 md:px-12 lg:px-24 py-16 mt-8">
        <div className="max-w-3xl animate-fade-up" style={{ animationDelay: '200ms' }}>
          <AnimatedHeading />
          <p className="text-white/90 dark:text-royal-100 text-lg md:text-xl mb-8 max-w-2xl">
            Discover premium properties across major Indian cities with Royal Group of Real Estate, your trusted partner in real estate excellence.
          </p>
        </div>

        {/* Enhanced Search Box */}
        <motion.div 
          className="bg-white/95 dark:bg-royal-900/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 max-w-6xl animate-fade-up border border-white/20 dark:border-royal-700/50"
          style={{ animationDelay: '400ms' }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Enhanced Tabs */}
          <div className="flex mb-6 px-2">
            {[
              { key: 'buy', label: 'Buy', icon: <Home size={18} />, color: 'from-green-500 to-emerald-600' },
              { key: 'rent', label: 'Rent', icon: <Bed size={18} />, color: 'from-blue-500 to-cyan-600' },
              { key: 'sell', label: 'Sell', icon: <TrendingUp size={18} />, color: 'from-purple-500 to-violet-600' }
            ].map((tab) => (
              <button 
                key={tab.key}
                className={cn(
                  "flex items-center px-6 py-3 rounded-xl text-sm font-semibold mr-3 transition-all duration-300 transform hover:scale-105",
                  activeTab === tab.key 
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` 
                    : "bg-gray-100 dark:bg-royal-800 text-royal-700 dark:text-royal-100 hover:bg-gray-200 dark:hover:bg-royal-700"
                )}
                onClick={() => setActiveTab(tab.key as 'buy' | 'rent' | 'sell')}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Enhanced Search fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Location Field */}
            <div className="relative group">
              <div 
                className="border-2 border-gray-200 dark:border-royal-700 rounded-xl px-4 py-4 flex items-center cursor-pointer hover:border-gold-400 dark:hover:border-gold-500 transition-all duration-300 bg-white dark:bg-royal-800 group-hover:shadow-lg"
                onClick={() => toggleDropdown('location')}
              >
                <div className="p-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg mr-3">
                  <MapPin size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-royal-500 dark:text-royal-300 font-medium">Location</div>
                  <div className="text-royal-800 dark:text-royal-100 font-semibold">
                    {selectedLocation || "Select City"}
                  </div>
                </div>
                <ChevronDown size={18} className="text-royal-400 dark:text-royal-200 group-hover:text-gold-500 transition-colors" />
              </div>
              
              {/* Enhanced Location Dropdown */}
              <div className={cn(
                "absolute left-0 right-0 mt-2 bg-white dark:bg-royal-800 rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-royal-700 transition-all duration-300 transform origin-top backdrop-blur-xl",
                activeDropdown === 'location' ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              )}>
                <div className="p-3">
                  <div className="text-xs font-semibold text-royal-500 dark:text-royal-300 mb-2 px-2">Popular Cities</div>
                  {['Srinagar', 'Jammu', 'Chandigarh', 'Delhi', 'Gurgaon', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Mumbai'].map((city) => (
                    <div 
                      key={city} 
                      className="px-3 py-3 hover:bg-gradient-to-r hover:from-gold-50 hover:to-gold-100 dark:hover:from-gold-900/20 dark:hover:to-gold-800/20 rounded-lg cursor-pointer transition-all duration-200 flex items-center text-royal-800 dark:text-royal-100 hover:scale-105"
                      onClick={() => handleSelectLocation(city)}
                    >
                      <div className="p-1.5 bg-gold-100 dark:bg-gold-900/30 rounded-md mr-3">
                        <MapPin size={14} className="text-gold-600 dark:text-gold-400" />
                      </div>
                      <span className="font-medium">{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Property Type Field */}
            <div className="relative group">
              <div 
                className="border-2 border-gray-200 dark:border-royal-700 rounded-xl px-4 py-4 flex items-center cursor-pointer hover:border-gold-400 dark:hover:border-gold-500 transition-all duration-300 bg-white dark:bg-royal-800 group-hover:shadow-lg"
                onClick={() => toggleDropdown('type')}
              >
                <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg mr-3">
                  <Building size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-royal-500 dark:text-royal-300 font-medium">Property Type</div>
                  <div className="text-royal-800 dark:text-royal-100 font-semibold">
                    {selectedType || "Select Type"}
                  </div>
                </div>
                <ChevronDown size={18} className="text-royal-400 dark:text-royal-200 group-hover:text-gold-500 transition-colors" />
              </div>
              
              {/* Enhanced Property Type Dropdown */}
              <div className={cn(
                "absolute left-0 right-0 mt-2 bg-white dark:bg-royal-800 rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-royal-700 transition-all duration-300 transform origin-top backdrop-blur-xl",
                activeDropdown === 'type' ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              )}>
                <div className="p-3">
                  <div className="text-xs font-semibold text-royal-500 dark:text-royal-300 mb-2 px-2">Property Types</div>
                  {[
                    { name: 'Residential', icon: <Home size={16} />, color: 'from-green-400 to-green-600' },
                    { name: 'Commercial', icon: <Building size={16} />, color: 'from-blue-400 to-blue-600' },
                    { name: 'Apartment', icon: <Building size={16} />, color: 'from-purple-400 to-purple-600' },
                    { name: 'Villa', icon: <Home size={16} />, color: 'from-orange-400 to-orange-600' },
                    { name: 'Land', icon: <Square size={16} />, color: 'from-emerald-400 to-emerald-600' },
                  ].map((type) => (
                    <div 
                      key={type.name} 
                      className="px-3 py-3 hover:bg-gradient-to-r hover:from-gold-50 hover:to-gold-100 dark:hover:from-gold-900/20 dark:hover:to-gold-800/20 rounded-lg cursor-pointer transition-all duration-200 flex items-center text-royal-800 dark:text-royal-100 hover:scale-105"
                      onClick={() => handleSelectType(type.name.toLowerCase())}
                    >
                      <div className={`p-1.5 bg-gradient-to-r ${type.color} rounded-md mr-3`}>
                        {type.icon}
                      </div>
                      <span className="font-medium">{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Field */}
            <div className="relative group">
              <div 
                className="border-2 border-gray-200 dark:border-royal-700 rounded-xl px-4 py-4 flex items-center cursor-pointer hover:border-gold-400 dark:hover:border-gold-500 transition-all duration-300 bg-white dark:bg-royal-800 group-hover:shadow-lg"
                onClick={() => toggleDropdown('budget')}
              >
                <div className="p-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg mr-3">
                  <DollarSign size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-royal-500 dark:text-royal-300 font-medium">Budget Range</div>
                  <div className="text-royal-800 dark:text-royal-100 font-semibold">
                    {selectedBudget || "Select Budget"}
                  </div>
                </div>
                <ChevronDown size={18} className="text-royal-400 dark:text-royal-200 group-hover:text-gold-500 transition-colors" />
              </div>
              
              {/* Budget Dropdown */}
              <div className={cn(
                "absolute left-0 right-0 mt-2 bg-white dark:bg-royal-800 rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-royal-700 transition-all duration-300 transform origin-top backdrop-blur-xl",
                activeDropdown === 'budget' ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              )}>
                <div className="p-3">
                  <div className="text-xs font-semibold text-royal-500 dark:text-royal-300 mb-2 px-2">Budget Range</div>
                  {[
                    { range: 'Under 50 Lac', icon: <DollarSign size={16} /> },
                    { range: '50 Lac - 1 Cr', icon: <DollarSign size={16} /> },
                    { range: '1 Cr - 2 Cr', icon: <DollarSign size={16} /> },
                    { range: '2 Cr - 5 Cr', icon: <DollarSign size={16} /> },
                    { range: '5 Cr+', icon: <DollarSign size={16} /> },
                  ].map((budget) => (
                    <div 
                      key={budget.range} 
                      className="px-3 py-3 hover:bg-gradient-to-r hover:from-gold-50 hover:to-gold-100 dark:hover:from-gold-900/20 dark:hover:to-gold-800/20 rounded-lg cursor-pointer transition-all duration-200 flex items-center text-royal-800 dark:text-royal-100 hover:scale-105"
                      onClick={() => handleSelectBudget(budget.range)}
                    >
                      <div className="p-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-md mr-3">
                        {budget.icon}
                      </div>
                      <span className="font-medium">{budget.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Search Input */}
            <div className="relative group">
              <div className="border-2 border-gray-200 dark:border-royal-700 rounded-xl px-4 py-4 flex items-center bg-white dark:bg-royal-800 group-hover:border-gold-400 dark:group-hover:border-gold-500 transition-all duration-300 group-hover:shadow-lg">
                <div className="p-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg mr-3">
                  <Search size={20} className="text-white" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search keywords..."
                  className="flex-1 bg-transparent border-none outline-none text-royal-800 dark:text-royal-100 font-medium placeholder-royal-400 dark:placeholder-royal-500"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Search Button */}
          <div className="flex justify-center">
            <motion.button
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group transform hover:scale-105"
              onClick={handleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Search Properties
              <Zap size={20} className="ml-2 group-hover:animate-pulse" />
            </motion.button>
          </div>

          {/* Quick Features */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-royal-700">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center text-royal-600 dark:text-royal-300">
                <Shield size={16} className="mr-1 text-gold-500" />
                Verified Properties
              </div>
              <div className="flex items-center text-royal-600 dark:text-royal-300">
                <Award size={16} className="mr-1 text-gold-500" />
                Best Deals
              </div>
              <div className="flex items-center text-royal-600 dark:text-royal-300">
                <Star size={16} className="mr-1 text-gold-500" />
                Premium Quality
              </div>
              <div className="flex items-center text-royal-600 dark:text-royal-300">
                <Zap size={16} className="mr-1 text-gold-500" />
                Instant Search
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Statistics */}
      <div className="bg-white/90 dark:bg-royal-900/90 backdrop-blur-md border-t border-gray-100 dark:border-royal-800 py-6 relative z-0 mt-auto">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center animate-fade-up" style={{ animationDelay: '600ms' }}>
              <div className="text-gold-500 font-display text-3xl md:text-4xl font-bold">8+</div>
              <div className="text-royal-700 dark:text-royal-100 text-sm md:text-base">Major Cities</div>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: '700ms' }}>
              <div className="text-gold-500 font-display text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-royal-700 dark:text-royal-100 text-sm md:text-base">Properties</div>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: '800ms' }}>
              <div className="text-gold-500 font-display text-3xl md:text-4xl font-bold">1.2K+</div>
              <div className="text-royal-700 dark:text-royal-100 text-sm md:text-base">Happy Clients</div>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: '900ms' }}>
              <div className="text-gold-500 font-display text-3xl md:text-4xl font-bold">15+</div>
              <div className="text-royal-700 dark:text-royal-100 text-sm md:text-base">Years of Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

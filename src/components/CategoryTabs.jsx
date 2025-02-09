import React from 'react';

const CategoryTabs = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    'All Events', 
    'Music', 
    'Sports', 
    'Arts', 
    'Food & Wine',
    'Comedy',
    'Theatre'
  ];

  return (
    <div className="flex overflow-x-scroll gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${
            activeCategory === category
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs; 
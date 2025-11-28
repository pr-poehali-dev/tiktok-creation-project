import { X } from 'lucide-react';

interface FilterPanelProps {
  onClose: () => void;
  selectedFilter: string | null;
  onFilterSelect: (filter: string | null) => void;
}

const filters = [
  { id: 'none', name: 'Без фильтра', gradient: 'from-gray-500 to-gray-700' },
  { id: 'vintage', name: 'Винтаж', gradient: 'from-amber-600 to-orange-800' },
  { id: 'cool', name: 'Холодный', gradient: 'from-blue-600 to-cyan-800' },
  { id: 'warm', name: 'Тёплый', gradient: 'from-red-500 to-pink-700' },
  { id: 'neon', name: 'Неон', gradient: 'from-purple-600 to-pink-600' },
  { id: 'grayscale', name: 'Ч/Б', gradient: 'from-gray-800 to-gray-400' },
  { id: 'dreamy', name: 'Мечта', gradient: 'from-purple-400 to-blue-400' },
  { id: 'sunset', name: 'Закат', gradient: 'from-orange-500 to-red-600' }
];

const FilterPanel = ({ onClose, selectedFilter, onFilterSelect }: FilterPanelProps) => {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 animate-fade-in">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-heading font-bold">Фильтры и эффекты</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  onFilterSelect(filter.id === 'none' ? null : filter.id);
                  onClose();
                }}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                  selectedFilter === filter.id || (selectedFilter === null && filter.id === 'none')
                    ? 'ring-4 ring-primary scale-95'
                    : 'hover:scale-95'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${filter.gradient}`} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="text-xs font-bold text-white text-center px-2">
                    {filter.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-card rounded-xl">
            <h3 className="font-heading font-semibold mb-3">Дополнительные эффекты</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Размытие фона</span>
                <div className="w-12 h-6 bg-muted rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Автоулучшение</span>
                <div className="w-12 h-6 bg-muted rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Яркость</span>
                <div className="flex-1 ml-4 h-2 bg-muted rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

import React, { useState } from 'react';
import { DashboardWidget } from './DashboardWidget';
import { useDashboardStore } from '../../store/useDashboardStore';
import { Plus } from 'lucide-react';
import { WidgetPicker } from './WidgetPicker';
import { Modal } from '../ui/Modal';

export function DashboardGrid() {
  const { widgets, updateWidgetPosition } = useDashboardStore();
  const [isWidgetPickerOpen, setWidgetPickerOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    e.dataTransfer.setData('widgetId', widgetId);
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const widgetId = e.dataTransfer.getData('widgetId');
    updateWidgetPosition(widgetId, position);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Tableau de bord personnalisé
        </h2>
        <button
          onClick={() => setWidgetPickerOpen(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un widget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.sort((a, b) => a.position - b.position).map((widget) => (
          <div
            key={widget.id}
            draggable
            onDragStart={(e) => handleDragStart(e, widget.id)}
            onDrop={(e) => handleDrop(e, widget.position)}
            onDragOver={handleDragOver}
            className="transition-transform duration-200 hover:scale-[1.02]"
          >
            <DashboardWidget widget={widget} />
          </div>
        ))}
      </div>

      <Modal isOpen={isWidgetPickerOpen} onClose={() => setWidgetPickerOpen(false)}>
        <WidgetPicker onClose={() => setWidgetPickerOpen(false)} />
      </Modal>
    </div>
  );
}
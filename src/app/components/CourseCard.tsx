import { X } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface CourseCardProps {
  title: string;
  semester: string;
  progress: number;
  color: string;
  status: 'active' | 'completed' | 'upcoming';
  onContinue?: () => void;
  onRemove?: () => void;
}

export function CourseCard({
  title,
  semester,
  progress,
  color,
  status,
  onContinue,
  onRemove,
}: CourseCardProps) {
  const statusLabels = {
    active: 'פעיל',
    completed: 'הושלם',
    upcoming: 'קרוב',
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    completed: 'bg-teal-100 text-teal-700',
    upcoming: 'bg-orange-100 text-orange-700',
  };

  return (
    <Card className="p-6 hover:shadow-xl transition-all border-gray-100 group h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mr-2`}>
          <span className="text-xl text-white font-bold">{title.charAt(0)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
          {onRemove && (
            <button
              onClick={e => { e.stopPropagation(); onRemove(); }}
              className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="הסר מהקורסים שלי"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="text-right mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{semester}</p>
      </div>

      <div className="mb-4 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">התקדמות</span>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-100" />
      </div>

      <Button
        className="w-full bg-teal-600 hover:bg-teal-700 mt-auto"
        onClick={onContinue}
      >
        {progress > 0 ? 'המשך תרגול' : 'התחל תרגול'}
      </Button>
    </Card>
  );
}
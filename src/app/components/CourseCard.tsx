import { Clock, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface CourseCardProps {
  title: string;
  semester: string;
  progress: number;
  nextLesson: string;
  dueDate: string;
  color: string;
  status: 'active' | 'completed' | 'upcoming';
  onContinue?: () => void;
}

export function CourseCard({
  title,
  semester,
  progress,
  nextLesson,
  dueDate,
  color,
  status,
  onContinue,
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
        <Badge className={statusColors[status]}>
          {statusLabels[status]}
        </Badge>
      </div>

      <div className="text-right mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{semester}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">התקדמות</span>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-100" />
      </div>

      <div className="space-y-2 mb-4 flex-grow">
        <div className="flex items-center gap-2 justify-end text-sm text-gray-600">
          <span>{nextLesson}</span>
          <Clock className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2 justify-end text-sm text-gray-600">
          <span>{dueDate}</span>
          <Calendar className="w-4 h-4" />
        </div>
      </div>

      <Button
        className="w-full bg-teal-600 hover:bg-teal-700 mt-auto"
        onClick={onContinue}
      >
        המשך לימוד
      </Button>
    </Card>
  );
}
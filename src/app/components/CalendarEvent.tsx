import { GraduationCap, Code, BookOpen, Sparkles, AlertCircle } from 'lucide-react';

interface CalendarEventProps {
  type: 'lecture' | 'tutorial' | 'self-study' | 'ai-recommended' | 'deadline';
  title: string;
  location?: string;
  time: string;
  duration: number; // in hours
  top: number; // position in pixels
}

const eventStyles = {
  lecture: {
    bg: 'bg-blue-100',
    border: 'border-l-4 border-blue-600',
    text: 'text-blue-900',
    icon: GraduationCap,
    iconColor: 'text-blue-600',
  },
  tutorial: {
    bg: 'bg-purple-100',
    border: 'border-l-4 border-purple-600',
    text: 'text-purple-900',
    icon: Code,
    iconColor: 'text-purple-600',
  },
  'self-study': {
    bg: 'bg-green-100',
    border: 'border-l-4 border-green-600',
    text: 'text-green-900',
    icon: BookOpen,
    iconColor: 'text-green-600',
  },
  'ai-recommended': {
    bg: 'bg-indigo-100',
    border: 'border-l-4 border-indigo-600',
    text: 'text-indigo-900',
    icon: Sparkles,
    iconColor: 'text-indigo-600',
  },
  deadline: {
    bg: 'bg-red-100',
    border: 'border-l-4 border-red-600',
    text: 'text-red-900',
    icon: AlertCircle,
    iconColor: 'text-red-600',
  },
};

export function CalendarEvent({ type, title, location, time, duration, top }: CalendarEventProps) {
  const style = eventStyles[type];
  const Icon = style.icon;
  const height = duration * 60; // 60px per hour

  return (
    <div
      className={`absolute right-0 left-0 mx-1 rounded-lg ${style.bg} ${style.border} p-2 hover:shadow-md transition-all cursor-pointer group`}
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      <div className="flex items-start gap-2 justify-end">
        <div className="flex-1 text-right overflow-hidden">
          <div className={`font-semibold text-xs leading-tight ${style.text} break-words overflow-hidden`}>
            {title}
          </div>
          {location && (
            <div className="text-xs text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">{location}</div>
          )}
          <div className="text-xs text-gray-500 inline">{time}</div>
        </div>
        <Icon className={`w-4 h-4 ${style.iconColor} flex-shrink-0`} />
      </div>

      {/* Hover indicator */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}
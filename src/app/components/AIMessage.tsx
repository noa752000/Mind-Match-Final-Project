import { Brain, BookOpen, Code, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface AIMessageProps {
  content: string;
  hasCode?: boolean;
  codeExample?: string;
  codeLanguage?: string;
  hasExpandable?: boolean;
  expandableTitle?: string;
  expandableContent?: string;
  dir?: string;
}

// פונקציה לעיצוב טקסט עם נוסחאות מתמטיות
function formatMathContent(text: string) {
  // מחפש דפוסים של נוסחאות מתמטיות ומעטף אותם ב-span עם dir="ltr"
  const mathPatterns = [
    /f\([^)]+\)/g, // f(x), f(g(x)) וכו'
    /lim\([^)]+\)/g, // lim(x→a)
    /\[[^\]]+\]'/g, // [f(g(x))]'
    /[a-zA-Z]'?\([^)]+\)/g, // כל פונקציה עם סוגריים
    /\b[a-zA-Z]\s*=\s*[^,\n]+/g, // משוואות כמו y = ...
    /\d+[a-zA-Z]²/g, // ביטויים כמו 3x²
    /[a-zA-Z]²/g, // x², y² וכו'
    /[a-zA-Z]³/g, // x³, y³ וכו'
    /[a-zA-Z]⁴/g, // x⁴, y⁴ וכו'
    /[a-zA-Z]⁵/g, // x⁵, y⁵ וכו'
  ];

  let formattedText = text;
  
  // עבור כל דפוס, מחליף אותו עם span של LTR
  mathPatterns.forEach(pattern => {
    formattedText = formattedText.replace(pattern, (match) => {
      return `<span dir="ltr">${match}</span>`;
    });
  });

  return formattedText;
}

// קומפוננט להצגת טקסט עם נוסחאות מתמטיות
function MathText({ text, dir = 'rtl' }: { text: string; dir?: string }) {
  const lines = text.split('\n');
  
  return (
    <>
      {lines.map((line, index) => {
        // בודק אם השורה מכילה נוסחאות מתמטיות
        const hasMath = /[f(]|lim|[=]|[²³⁴⁵]|[a-zA-Z]\(/.test(line);
        
        if (hasMath) {
          return (
            <div key={index} className="mb-2">
              <span dir="ltr" className="inline-block text-left">{line}</span>
            </div>
          );
        }
        
        return (
          <div key={index} className="mb-2" dir={dir}>
            {line || '\u00A0'}
          </div>
        );
      })}
    </>
  );
}

export function AIMessage({ 
  content, 
  hasCode, 
  codeExample, 
  codeLanguage = 'sql',
  hasExpandable,
  expandableTitle,
  expandableContent,
  dir = 'rtl'
}: AIMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-start gap-4 mb-6 justify-end">
      {/* Message Content */}
      <div className="flex-1 max-w-3xl">
        <div className="flex items-center gap-2 mb-2 justify-end">
          <Badge className="bg-blue-100 text-blue-700 text-xs">מורה AI</Badge>
        </div>

        <Card className="p-6 bg-gradient-to-l from-blue-50/50 to-indigo-50/50 border-blue-200">
          <div className="text-right">
            <div className="text-gray-800 leading-relaxed text-right">
              <MathText text={content} dir={dir} />
            </div>

            {/* Code Example */}
            {hasCode && codeExample && (
              <div className="mt-4" dir="ltr">
                <div className="flex items-center gap-2 mb-2 justify-start">
                  <Code className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">:דוגמת קוד</span>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                  <code className="text-sm text-gray-100 font-mono block text-left">
                    {codeExample}
                  </code>
                </div>
                <div className="mt-2 text-xs text-gray-600 text-left">
                  Language: {codeLanguage.toUpperCase()}
                </div>
              </div>
            )}

            {/* Expandable Section */}
            {hasExpandable && expandableTitle && expandableContent && (
              <div className="mt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full p-4 bg-white border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2" dir={dir}>
                      <Lightbulb className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-gray-900" style={{ unicodeBidi: 'plaintext' }}>{expandableTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="mt-2 p-4 bg-white rounded-xl border border-blue-200">
                    <div className="text-gray-700 leading-relaxed text-right">
                      <MathText text={expandableContent} dir={dir} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-3">
          <Button variant="outline" size="sm" className="text-xs">
            <BookOpen className="w-3 h-3 ml-1" />
            דוגמה מהחיים האמיתיים
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Lightbulb className="w-3 h-3 ml-1" />
            הסבר פשוט יותר
          </Button>
        </div>
      </div>

      {/* AI Avatar */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
        <Brain className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}
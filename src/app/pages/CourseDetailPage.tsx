import { ArrowRight, BookOpen, Clock, Users, Award, CheckCircle, TrendingUp, Calculator, BarChart, Activity, Sparkles, MessageCircle, Brain, Database, Shield, Code, FileText, DollarSign, Grid3x3, Plus, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { useEffect, useState } from 'react';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { coursesData } from '../data/coursesData';
import { useAuth } from '../contexts/AuthContext';

// ׳ ׳•׳©׳׳™ ׳×׳¨׳’׳•׳ ׳׳₪׳™ ׳§׳•׳¨׳¡
const courseTopics: Record<string, Array<{
  title: string;
  description: string;
  icon: typeof TrendingUp;
  iconColor: string;
  bgColor: string;
  totalQuestions: number;
}>> = {
  'calculus1': [
    {
      title: '׳’׳‘׳•׳׳•׳×',
      description: '׳’׳‘׳•׳ ׳©׳ ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳×׳׳¨ ׳׳× ׳”׳”׳×׳ ׳”׳’׳•׳× ׳©׳ ׳”׳₪׳•׳ ׳§׳¦׳™׳” ׳›׳׳©׳¨ ׳”׳׳©׳×׳ ׳” ׳׳×׳§׳¨׳‘ ׳׳¢׳¨׳ ׳׳¡׳•׳™׳. ׳ ׳•׳©׳ ׳–׳” ׳”׳•׳ ׳”׳‘׳¡׳™׳¡ ׳׳”׳‘׳ ׳× ׳¨׳¦׳™׳₪׳•׳×, ׳ ׳’׳–׳¨׳•׳× ׳•׳׳™׳ ׳˜׳’׳¨׳׳™׳.',
      icon: TrendingUp,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      totalQuestions: 15,
    },
    {
      title: '׳ ׳’׳–׳¨׳•׳×',
      description: '׳”׳ ׳’׳–׳¨׳× ׳׳•׳“׳“׳× ׳׳× ׳©׳™׳¢׳•׳¨ ׳”׳©׳™׳ ׳•׳™ ׳”׳׳™׳™׳“׳™ ׳©׳ ׳₪׳•׳ ׳§׳¦׳™׳”. ׳ ׳×׳¨׳’׳ ׳›׳׳׳™ ׳’׳–׳™׳¨׳”, ׳›׳׳ ׳”׳©׳¨׳©׳¨׳× ׳•׳™׳™׳©׳•׳׳™׳ ׳›׳׳• ׳׳¦׳™׳׳× ׳ ׳§׳•׳“׳•׳× ׳§׳™׳¦׳•׳.',
      icon: Calculator,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      totalQuestions: 22,
    },
    {
      title: '׳—׳§׳™׳¨׳× ׳₪׳•׳ ׳§׳¦׳™׳•׳×',
      description: '׳ ׳™׳×׳•׳— ׳׳׳ ׳©׳ ׳₪׳•׳ ׳§׳¦׳™׳”: ׳×׳—׳•׳ ׳”׳’׳“׳¨׳”, ׳ ׳§׳•׳“׳•׳× ׳§׳™׳¦׳•׳, ׳ ׳§׳•׳“׳•׳× ׳₪׳™׳×׳•׳, ׳×׳—׳•׳׳™ ׳¢׳׳™׳™׳” ׳•׳™׳¨׳™׳“׳” ׳•׳©׳¨׳˜׳•׳˜ ׳”׳’׳¨׳£.',
      icon: BarChart,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      totalQuestions: 18,
    },
    {
      title: '׳׳™׳ ׳˜׳’׳¨׳׳™׳',
      description: '׳”׳׳™׳ ׳˜׳’׳¨׳ ׳”׳•׳ ׳”׳₪׳¢׳•׳׳” ׳”׳”׳•׳₪׳›׳™׳× ׳׳ ׳’׳–׳¨׳× ׳•׳׳©׳׳© ׳׳—׳™׳©׳•׳‘ ׳©׳˜׳—׳™׳ ׳•׳ ׳₪׳—׳™׳. ׳ ׳×׳¨׳’׳ ׳©׳™׳˜׳•׳× ׳׳™׳ ׳˜׳’׳¨׳¦׳™׳” ׳›׳׳• ׳”׳¦׳‘׳” ׳•׳׳™׳ ׳˜׳’׳¨׳¦׳™׳” ׳‘׳—׳׳§׳™׳.',
      icon: Activity,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      totalQuestions: 20,
    },
  ],
  'sql': [
    { title: 'SELECT ׳•-WHERE', description: '׳₪׳§׳•׳“׳•׳× ׳”׳‘׳¡׳™׳¡ ׳׳©׳׳™׳₪׳× ׳ ׳×׳•׳ ׳™׳ ׳׳׳¡׳“ ׳ ׳×׳•׳ ׳™׳. ׳ ׳×׳¨׳’׳ ׳¡׳™׳ ׳•׳ ׳©׳•׳¨׳•׳×, ׳׳™׳•׳ ׳×׳•׳¦׳׳•׳× ׳•׳©׳™׳׳•׳© ׳‘׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳׳’׳¨׳’׳¦׳™׳” ׳›׳׳• COUNT, SUM ׳•-AVG.', icon: Database, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 18 },
    { title: 'JOINs', description: '׳—׳™׳‘׳•׳¨ ׳˜׳‘׳׳׳•׳× ׳׳׳₪׳©׳¨ ׳׳©׳׳•׳£ ׳ ׳×׳•׳ ׳™׳ ׳׳׳¡׳₪׳¨ ׳˜׳‘׳׳׳•׳× ׳‘׳•-׳–׳׳ ׳™׳×. ׳ ׳×׳¨׳’׳ INNER JOIN, LEFT JOIN, RIGHT JOIN ׳•׳׳× ׳”׳”׳‘׳“׳׳™׳ ׳‘׳™׳ ׳™׳”׳.', icon: Grid3x3, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 24 },
    { title: '׳ ׳•׳¨׳׳׳™׳–׳¦׳™׳”', description: '׳×׳”׳׳™׳ ׳׳¨׳’׳•׳ ׳”׳ ׳×׳•׳ ׳™׳ ׳׳׳ ׳™׳¢׳× ׳›׳₪׳™׳׳•׳™׳•׳× ׳•׳©׳׳™׳¨׳” ׳¢׳ ׳©׳׳׳•׳× ׳”׳ ׳×׳•׳ ׳™׳. ׳ ׳׳׳“ ׳׳× ׳”׳¦׳•׳¨׳•׳× ׳”׳ ׳•׳¨׳׳׳™׳•׳× 1NF, 2NF ׳•-3NF ׳¢׳ ׳“׳•׳’׳׳׳•׳× ׳׳¢׳©׳™׳•׳×.', icon: BarChart, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 16 },
    { title: '׳׳•׳₪׳˜׳™׳׳™׳–׳¦׳™׳”', description: '׳©׳™׳₪׳•׳¨ ׳‘׳™׳¦׳•׳¢׳™ ׳©׳׳™׳׳×׳•׳× SQL ׳‘׳׳׳¦׳¢׳•׳× ׳׳™׳ ׳“׳§׳¡׳™׳, ׳ ׳™׳×׳•׳— ׳×׳•׳›׳ ׳™׳•׳× ׳‘׳™׳¦׳•׳¢ ׳•׳׳¡׳˜׳¨׳˜׳’׳™׳•׳× ׳©׳׳™׳׳×׳” ׳™׳¢׳™׳׳•׳×.', icon: TrendingUp, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 20 },
  ],
  'cyber_security': [
    { title: '׳”׳¦׳₪׳ ׳” ׳¡׳™׳׳˜׳¨׳™׳×', description: '׳©׳™׳˜׳× ׳”׳¦׳₪׳ ׳” ׳‘׳” ׳׳•׳×׳• ׳׳₪׳×׳— ׳׳©׳׳© ׳׳”׳¦׳₪׳ ׳” ׳•׳׳₪׳¢׳ ׳•׳—. ׳ ׳×׳¨׳’׳ ׳׳׳’׳•׳¨׳™׳×׳׳™׳ ׳›׳׳• AES ׳•-DES, ׳™׳×׳¨׳•׳ ׳•׳× ׳•׳—׳¡׳¨׳•׳ ׳•׳× ׳•׳׳§׳¨׳™ ׳©׳™׳׳•׳©.', icon: Shield, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 17 },
    { title: '׳”׳¦׳₪׳ ׳” ׳׳¡׳™׳׳˜׳¨׳™׳×', description: '׳©׳™׳˜׳× ׳”׳¦׳₪׳ ׳” ׳¢׳ ׳–׳•׳’ ׳׳₪׳×׳—׳•׳× ג€” ׳¦׳™׳‘׳•׳¨׳™ ׳•׳₪׳¨׳˜׳™. ׳ ׳×׳¨׳’׳ RSA, ׳™׳™׳©׳•׳׳™׳ ׳‘׳—׳×׳™׳׳•׳× ׳“׳™׳’׳™׳˜׳׳™׳•׳× ׳•׳׳™׳׳•׳× ׳–׳”׳•׳×.', icon: Shield, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 21 },
    { title: 'Hash Functions', description: '׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳—׳“-׳›׳™׳•׳•׳ ׳™׳•׳× ׳©׳׳׳™׳¨׳•׳× ׳ ׳×׳•׳ ׳™׳ ׳׳×׳׳¦׳™׳× ׳‘׳’׳•׳“׳ ׳§׳‘׳•׳¢. ׳ ׳×׳¨׳’׳ MD5, SHA-256 ׳•׳™׳™׳©׳•׳׳™׳ ׳‘׳׳™׳׳•׳× ׳¡׳™׳¡׳׳׳•׳× ׳•׳©׳׳׳•׳× ׳§׳‘׳¦׳™׳.', icon: Code, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 15 },
    { title: '׳׳‘׳˜׳—׳× ׳¨׳©׳×׳•׳×', description: '׳”׳’׳ ׳” ׳¢׳ ׳×׳©׳×׳™׳•׳× ׳×׳§׳©׳•׳¨׳× ׳׳₪׳ ׳™ ׳׳™׳•׳׳™׳. ׳ ׳×׳¨׳’׳ Firewalls, IDS/IPS, VPN ׳•׳₪׳¨׳•׳˜׳•׳§׳•׳׳™ ׳׳‘׳˜׳—׳” ׳›׳׳• TLS ׳•-IPSec.', icon: Activity, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 19 },
  ],
  'oop': [
    { title: '׳׳—׳׳§׳•׳× ׳•׳׳•׳‘׳™׳™׳§׳˜׳™׳', description: '׳¢׳§׳¨׳•׳ ׳”׳‘׳¡׳™׳¡ ׳©׳ OOP ג€” ׳׳—׳׳§׳” ׳›׳×׳‘׳ ׳™׳× ׳•׳׳•׳‘׳™׳™׳§׳˜ ׳›׳׳™׳׳•׳©. ׳ ׳×׳¨׳’׳ ׳™׳¦׳™׳¨׳× ׳׳—׳׳§׳•׳×, ׳©׳“׳•׳×, ׳׳×׳•׳“׳•׳×, ׳§׳•׳ ׳¡׳˜׳¨׳§׳˜׳•׳¨׳™׳ ׳•׳¢׳™׳˜׳•׳£.', icon: Code, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 16 },
    { title: '׳”׳•׳¨׳©׳”', description: '׳׳ ׳’׳ ׳•׳ ׳©׳׳׳₪׳©׳¨ ׳׳׳—׳׳§׳” ׳׳¨׳©׳× ׳×׳›׳•׳ ׳•׳× ׳׳׳—׳׳§׳” ׳׳—׳¨׳×. ׳ ׳×׳¨׳’׳ super, override, ׳׳—׳׳§׳•׳× ׳׳•׳₪׳©׳˜׳•׳× ׳•׳™׳—׳¡׳™ is-a.', icon: BarChart, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 20 },
    { title: '׳₪׳•׳׳™׳׳•׳¨׳₪׳™׳–׳', description: '׳™׳›׳•׳׳× ׳׳•׳‘׳™׳™׳§׳˜׳™׳ ׳©׳•׳ ׳™׳ ׳׳”׳’׳™׳‘ ׳©׳•׳ ׳” ׳׳׳•׳×׳” ׳”׳•׳“׳¢׳”. ׳ ׳×׳¨׳’׳ method overriding, ׳׳׳©׳§׳™׳ (interface) ׳•-casting.', icon: Grid3x3, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 18 },
    { title: '׳“׳₪׳•׳¡׳™ ׳¢׳™׳¦׳•׳‘', description: '׳₪׳×׳¨׳•׳ ׳•׳× ׳׳•׳›׳—׳™׳ ׳׳‘׳¢׳™׳•׳× ׳¢׳™׳¦׳•׳‘ ׳ ׳₪׳•׳¦׳•׳× ׳‘׳×׳›׳ ׳•׳× ׳׳•׳ ׳—׳” ׳¢׳¦׳׳™׳. ׳ ׳×׳¨׳’׳ Singleton, Factory, Observer ׳•-Strategy.', icon: Sparkles, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 22 },
  ],
  'html': [
    { title: '׳¡׳׳ ׳˜׳™׳§׳”', description: '׳©׳™׳׳•׳© ׳‘׳×׳’׳™׳•׳× HTML5 ׳‘׳¢׳׳•׳× ׳׳©׳׳¢׳•׳× ׳›׳׳• header, nav, main, section ׳•-article ׳׳×׳™׳׳•׳¨ ׳׳‘׳ ׳” ׳”׳“׳£ ׳‘׳¦׳•׳¨׳” ׳‘׳¨׳•׳¨׳” ׳•׳ ׳’׳™׳©׳”.', icon: FileText, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 14 },
    { title: '׳˜׳₪׳¡׳™׳', description: '׳™׳¦׳™׳¨׳× ׳˜׳₪׳¡׳™׳ ׳׳™׳ ׳˜׳¨׳׳§׳˜׳™׳‘׳™׳™׳ ׳¢׳ input types ׳©׳•׳ ׳™׳, validation, labels ׳•׳¢׳§׳¨׳•׳ ׳•׳× ׳ ׳’׳™׳©׳•׳× ׳‘׳˜׳₪׳¡׳™׳.', icon: Code, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 19 },
    { title: '׳ ׳’׳™׳©׳•׳×', description: '׳”׳ ׳’׳©׳× ׳׳×׳¨׳™׳ ׳׳׳ ׳©׳™׳ ׳¢׳ ׳׳•׳’׳‘׳׳•׳™׳•׳× ׳‘׳׳׳¦׳¢׳•׳× ARIA attributes, ׳ ׳™׳’׳•׳“׳™׳•׳× ׳¦׳‘׳¢׳™׳ ׳•׳ ׳™׳•׳•׳˜ ׳׳§׳׳“׳× ׳×׳§׳ ׳™.', icon: Users, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 16 },
    { title: 'HTML5 APIs', description: '׳׳׳©׳§׳™ ׳×׳›׳ ׳•׳× ׳׳×׳§׳“׳׳™׳ ׳©׳ HTML5 ׳›׳׳• Local Storage, Geolocation, Canvas ׳•-Web Workers ׳׳׳₪׳׳™׳§׳¦׳™׳•׳× ׳¢׳©׳™׳¨׳•׳×.', icon: Activity, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 17 },
  ],
  'linear-algebra': [
    { title: '׳•׳§׳˜׳•׳¨׳™׳', description: '׳’׳“׳׳™׳ ׳‘׳¢׳׳™ ׳›׳™׳•׳•׳ ׳•׳¢׳•׳¦׳׳”. ׳ ׳×׳¨׳’׳ ׳—׳™׳‘׳•׳¨ ׳•׳§׳˜׳•׳¨׳™׳, ׳›׳₪׳ ׳‘׳¡׳§׳׳¨, ׳׳›׳₪׳׳” ׳¡׳§׳׳¨׳™׳×, ׳׳›׳₪׳׳” ׳•׳§׳˜׳•׳¨׳™׳× ׳•׳×׳›׳•׳ ׳•׳× ׳’׳™׳׳•׳׳˜׳¨׳™׳•׳×.', icon: TrendingUp, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 15 },
    { title: '׳׳˜׳¨׳™׳¦׳•׳×', description: '׳׳¢׳¨׳›׳™׳ ׳“׳•-׳׳׳“׳™׳™׳ ׳©׳ ׳׳¡׳₪׳¨׳™׳. ׳ ׳×׳¨׳’׳ ׳₪׳¢׳•׳׳•׳× ׳׳˜׳¨׳™׳¦׳•׳×, ׳›׳₪׳ ׳׳˜׳¨׳™׳¦׳•׳×, ׳׳¦׳™׳׳× ׳׳˜׳¨׳™׳¦׳” ׳”׳•׳₪׳›׳™׳× ׳•׳—׳™׳©׳•׳‘ ׳“׳˜׳¨׳׳™׳ ׳ ׳˜׳”.', icon: Grid3x3, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 21 },
    { title: '׳˜׳¨׳ ׳¡׳₪׳•׳¨׳׳¦׳™׳•׳×', description: '׳”׳¢׳‘׳¨׳× ׳•׳§׳˜׳•׳¨׳™׳ ׳׳׳¨׳—׳‘ ׳׳—׳“ ׳׳׳—׳¨. ׳ ׳×׳¨׳’׳ ׳˜׳¨׳ ׳¡׳₪׳•׳¨׳׳¦׳™׳•׳× ׳׳™׳ ׳׳¨׳™׳•׳×, ׳’׳¨׳¢׳™׳ ׳•׳×׳׳•׳ ׳” ׳•׳׳˜׳¨׳™׳¦׳× ׳™׳™׳¦׳•׳’.', icon: Activity, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 18 },
    { title: '׳¢׳¨׳›׳™׳ ׳¢׳¦׳׳™׳™׳', description: '׳¡׳§׳׳¨׳™׳ ׳׳™׳•׳—׳“׳™׳ ׳”׳׳§׳™׳™׳׳™׳ Av=־»v. ׳ ׳×׳¨׳’׳ ׳׳¦׳™׳׳× ׳¢׳¨׳›׳™׳ ׳•׳§׳˜׳•׳¨׳™׳ ׳¢׳¦׳׳™׳™׳, ׳₪׳•׳׳™׳ ׳•׳ ׳׳•׳₪׳™׳™׳ ׳™ ׳•׳׳׳›׳¡׳•׳ ׳׳˜׳¨׳™׳¦׳”.', icon: Calculator, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 19 },
  ],
  'systems_analysis': [
    { title: '׳ ׳™׳×׳•׳— ׳“׳¨׳™׳©׳•׳×', description: '׳×׳”׳׳™׳ ׳–׳™׳”׳•׳™, ׳ ׳™׳×׳•׳— ׳•׳×׳™׳¢׳•׳“ ׳“׳¨׳™׳©׳•׳× ׳׳¢׳¨׳›׳× ׳׳”׳׳§׳•׳—. ׳ ׳×׳¨׳’׳ Use Cases, ׳“׳¨׳™׳©׳•׳× ׳₪׳•׳ ׳§׳¦׳™׳•׳ ׳׳™׳•׳× ׳•׳׳-׳₪׳•׳ ׳§׳¦׳™׳•׳ ׳׳™׳•׳×.', icon: FileText, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 16 },
    { title: 'UML Diagrams', description: '׳©׳₪׳× ׳׳™׳“׳•׳ ׳’׳¨׳₪׳™׳× ׳׳×׳™׳׳•׳¨ ׳׳¢׳¨׳›׳•׳× ׳×׳•׳›׳ ׳”. ׳ ׳×׳¨׳’׳ Class Diagrams, Sequence Diagrams, Activity Diagrams ׳•-Use Case Diagrams.', icon: BarChart, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 22 },
    { title: '׳׳¨׳›׳™׳˜׳§׳˜׳•׳¨׳”', description: '׳×׳›׳ ׳•׳ ׳”׳׳‘׳ ׳” ׳”׳›׳׳׳™ ׳©׳ ׳׳¢׳¨׳›׳× ׳×׳•׳›׳ ׳”. ׳ ׳×׳¨׳’׳ ׳“׳₪׳•׳¡׳™ ׳׳¨׳›׳™׳˜׳§׳˜׳•׳¨׳” ׳›׳׳• MVC, Layer Architecture ׳•-Microservices.', icon: Grid3x3, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 18 },
    { title: '׳׳×׳•׳“׳•׳׳•׳’׳™׳•׳×', description: '׳©׳™׳˜׳•׳× ׳₪׳™׳×׳•׳— ׳×׳•׳›׳ ׳” ׳©׳•׳ ׳•׳×. ׳ ׳×׳¨׳’׳ Waterfall, Agile, Scrum ׳•-Kanban ג€” ׳™׳×׳¨׳•׳ ׳•׳×, ׳—׳¡׳¨׳•׳ ׳•׳× ׳•׳׳×׳™ ׳׳”׳©׳×׳׳© ׳‘׳›׳ ׳׳—׳“.', icon: Users, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 20 },
  ],
  'mis-economics': [
    { title: 'ROI ׳•׳ ׳™׳×׳•׳— ׳”׳©׳§׳¢׳•׳×', description: '׳׳“׳™׳“׳× ׳›׳“׳׳™׳•׳× ׳›׳׳›׳׳™׳× ׳©׳ ׳”׳©׳§׳¢׳•׳× ׳‘-IT. ׳ ׳×׳¨׳’׳ ׳—׳™׳©׳•׳‘ ROI, NPV, IRR ׳•׳×׳§׳•׳₪׳× ׳”׳—׳–׳¨ ׳¢׳ ׳“׳•׳’׳׳׳•׳× ׳׳”׳¢׳•׳׳ ׳”׳׳׳™׳×׳™.', icon: DollarSign, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', totalQuestions: 17 },
    { title: '׳ ׳™׳”׳•׳ ׳₪׳¨׳•׳™׳§׳˜׳™׳', description: '׳×׳›׳ ׳•׳ ׳•׳‘׳§׳¨׳× ׳₪׳¨׳•׳™׳§׳˜׳™ IT. ׳ ׳×׳¨׳’׳ Gantt charts, WBS, ׳ ׳™׳”׳•׳ ׳¡׳™׳›׳•׳ ׳™׳, ׳ ׳™׳”׳•׳ ׳׳©׳׳‘׳™׳ ׳•׳¢׳׳™׳“׳” ׳‘׳׳•׳—׳•׳× ׳–׳׳ ׳™׳.', icon: Users, iconColor: 'text-green-600', bgColor: 'bg-green-100', totalQuestions: 20 },
    { title: '׳ ׳™׳”׳•׳ ׳¡׳™׳›׳•׳ ׳™׳', description: '׳–׳™׳”׳•׳™, ׳”׳¢׳¨׳›׳” ׳•׳˜׳™׳₪׳•׳ ׳‘׳¡׳™׳›׳•׳ ׳™׳ ׳‘׳₪׳¨׳•׳™׳§׳˜׳™ IT. ׳ ׳×׳¨׳’׳ ׳׳˜׳¨׳™׳¦׳× ׳¡׳™׳›׳•׳ ׳™׳, ׳”׳¡׳×׳‘׳¨׳•׳× ׳•׳¢׳•׳¦׳׳” ׳•׳׳¡׳˜׳¨׳˜׳’׳™׳•׳× ׳×׳’׳•׳‘׳”.', icon: Shield, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', totalQuestions: 16 },
    { title: '׳׳¡׳˜׳¨׳˜׳’׳™׳” ׳“׳™׳’׳™׳˜׳׳™׳×', description: '׳×׳›׳ ׳•׳ ׳׳¡׳˜׳¨׳˜׳’׳™ ׳©׳ ׳˜׳¨׳ ׳¡׳₪׳•׳¨׳׳¦׳™׳” ׳“׳™׳’׳™׳˜׳׳™׳×. ׳ ׳×׳¨׳’׳ ׳ ׳™׳×׳•׳— SWOT, ׳™׳×׳¨׳•׳ ׳×׳—׳¨׳•׳×׳™, ׳—׳“׳©׳ ׳•׳× ׳•׳׳“׳“׳™ ׳”׳¦׳׳—׳” ׳“׳™׳’׳™׳˜׳׳™׳™׳.', icon: TrendingUp, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', totalQuestions: 18 },
  ],
};

// ׳©׳׳׳•׳× ׳׳—׳¨׳•׳ ׳•׳× ׳׳₪׳™ ׳§׳•׳¨׳¡
const recentQuestions: Record<string, Array<{
  title: string;
  topic: string;
  daysAgo: string;
}>> = {
  'calculus1': [
    { title: '׳—׳™׳©׳•׳‘ ׳’׳‘׳•׳ ׳©׳ ׳₪׳•׳ ׳§׳¦׳™׳” ׳¨׳¦׳™׳•׳ ׳׳™׳×', topic: '׳’׳‘׳•׳׳•׳×', daysAgo: '׳׳₪׳ ׳™ 2 ׳™׳׳™׳' },
    { title: '׳ ׳’׳–׳¨׳× ׳©׳ ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳•׳¨׳›׳‘׳×', topic: '׳ ׳’׳–׳¨׳•׳×', daysAgo: '׳׳₪׳ ׳™ 3 ׳™׳׳™׳' },
    { title: '׳׳¦׳™׳׳× ׳ ׳§׳•׳“׳•׳× ׳§׳™׳¦׳•׳', topic: '׳—׳§׳™׳¨׳× ׳₪׳•׳ ׳§׳¦׳™׳•׳×', daysAgo: '׳׳₪׳ ׳™ ׳©׳‘׳•׳¢' },
  ],
  'sql': [
    { title: '׳©׳׳™׳׳×׳” ׳¢׳ INNER JOIN', topic: 'JOINs', daysAgo: '׳׳₪׳ ׳™ ׳™׳•׳' },
    { title: '׳ ׳•׳¨׳׳׳™׳–׳¦׳™׳” ׳׳¦׳•׳¨׳” ׳©׳׳™׳©׳™׳×', topic: '׳ ׳•׳¨׳׳׳™׳–׳¦׳™׳”', daysAgo: '׳׳₪׳ ׳™ 3 ׳™׳׳™׳' },
    { title: '׳׳•׳₪׳˜׳™׳׳™׳–׳¦׳™׳” ׳‘׳׳׳¦׳¢׳•׳× ׳׳™׳ ׳“׳§׳¡׳™׳', topic: '׳׳•׳₪׳˜׳™׳׳™׳–׳¦׳™׳”', daysAgo: '׳׳₪׳ ׳™ 5 ׳™׳׳™׳' },
  ],
  'cyber_security': [
    { title: '׳”׳©׳•׳•׳׳” ׳‘׳™׳ AES ׳-DES', topic: '׳”׳¦׳₪׳ ׳” ׳¡׳™׳׳˜׳¨׳™׳×', daysAgo: '׳׳₪׳ ׳™ 2 ׳™׳׳™׳' },
    { title: '׳™׳™׳©׳•׳ RSA', topic: '׳”׳¦׳₪׳ ׳” ׳׳¡׳™׳׳˜׳¨׳™׳×', daysAgo: '׳׳₪׳ ׳™ 4 ׳™׳׳™׳' },
    { title: '׳₪׳•׳ ׳§׳¦׳™׳•׳× Hash', topic: 'Hash Functions', daysAgo: '׳׳₪׳ ׳™ ׳©׳‘׳•׳¢' },
  ],
  'oop': [
    { title: '׳™׳™׳©׳•׳ ׳™׳¨׳•׳©׳” ׳‘-Java', topic: '׳”׳•׳¨׳©׳”', daysAgo: '׳׳₪׳ ׳™ ׳™׳•׳' },
    { title: '׳“׳•׳’׳׳” ׳׳₪׳•׳׳™׳׳•׳¨׳₪׳™׳–׳', topic: '׳₪׳•׳׳™׳׳•׳¨׳₪׳™׳–׳', daysAgo: '׳׳₪׳ ׳™ 3 ׳™׳׳™׳' },
    { title: 'Singleton Pattern', topic: '׳“׳₪׳•׳¡׳™ ׳¢׳™׳¦׳•׳‘', daysAgo: '׳׳₪׳ ׳™ 6 ׳™׳׳™׳' },
  ],
  'html': [
    { title: '׳©׳™׳׳•׳© ׳ ׳›׳•׳ ׳‘-section ׳•-article', topic: '׳¡׳׳ ׳˜׳™׳§׳”', daysAgo: '׳׳₪׳ ׳™ ׳™׳•׳' },
    { title: '׳‘׳ ׳™׳™׳× ׳˜׳•׳₪׳¡ ׳¢׳ validation', topic: '׳˜׳₪׳¡׳™׳', daysAgo: '׳׳₪׳ ׳™ 4 ׳™׳׳™׳' },
    { title: 'ARIA attributes', topic: '׳ ׳’׳™׳©׳•׳×', daysAgo: '׳׳₪׳ ׳™ 5 ׳™׳׳™׳' },
  ],
  'linear-algebra': [
    { title: '׳›׳₪׳ ׳׳˜׳¨׳™׳¦׳•׳× 3x3', topic: '׳׳˜׳¨׳™׳¦׳•׳×', daysAgo: '׳׳₪׳ ׳™ 2 ׳™׳׳™׳' },
    { title: '׳׳¦׳™׳׳× ׳“׳˜׳¨׳׳™׳ ׳ ׳˜׳”', topic: '׳׳˜׳¨׳™׳¦׳•׳×', daysAgo: '׳׳₪׳ ׳™ 4 ׳™׳׳™׳' },
    { title: '׳—׳™׳©׳•׳‘ ׳¢׳¨׳›׳™׳ ׳¢׳¦׳׳™׳™׳', topic: '׳¢׳¨׳›׳™׳ ׳¢׳¦׳׳™׳™׳', daysAgo: '׳׳₪׳ ׳™ ׳©׳‘׳•׳¢' },
  ],
  'systems_analysis': [
    { title: '׳™׳¦׳™׳¨׳× Use Case Diagram', topic: 'UML Diagrams', daysAgo: '׳׳₪׳ ׳™ ׳™׳•׳' },
    { title: '׳ ׳™׳×׳•׳— ׳“׳¨׳™׳©׳•׳× ׳׳-׳₪׳•׳ ׳§׳¦׳™׳•׳ ׳׳™׳•׳×', topic: '׳ ׳™׳×׳•׳— ׳“׳¨׳™׳©׳•׳×', daysAgo: '׳׳₪׳ ׳™ 3 ׳™׳׳™׳' },
    { title: '׳”׳©׳•׳•׳׳” ׳‘׳™׳ Agile ׳-Waterfall', topic: '׳׳×׳•׳“׳•׳׳•׳’׳™׳•׳×', daysAgo: '׳׳₪׳ ׳™ 6 ׳™׳׳™׳' },
  ],
  'mis-economics': [
    { title: '׳—׳™׳©׳•׳‘ ROI ׳׳׳¢׳¨׳›׳× CRM', topic: 'ROI ׳•׳ ׳™׳×׳•׳— ׳”׳©׳§׳¢׳•׳×', daysAgo: '׳׳₪׳ ׳™ 2 ׳™׳׳™׳' },
    { title: '׳×׳›׳ ׳•׳ ׳×׳§׳¦׳™׳‘ ׳₪׳¨׳•׳™׳§׳˜', topic: '׳ ׳™׳”׳•׳ ׳₪׳¨׳•׳™׳§׳˜׳™׳', daysAgo: '׳׳₪׳ ׳™ 4 ׳™׳׳™׳' },
    { title: '׳ ׳™׳×׳•׳— ׳¡׳™׳›׳•׳ ׳™ ׳׳‘׳˜׳—׳”', topic: '׳ ׳™׳”׳•׳ ׳¡׳™׳›׳•׳ ׳™׳', daysAgo: '׳׳₪׳ ׳™ ׳©׳‘׳•׳¢' },
  ],
};

// ׳©׳׳׳•׳× ׳׳“׳•׳’׳׳”
const quizQuestions = {
  multipleChoice: [
    {
      question: '׳׳”׳• ׳”׳₪׳׳˜ ׳©׳ ׳”׳©׳׳™׳׳×׳” ׳”׳‘׳׳”?\nSELECT COUNT(*) FROM students WHERE grade > 80;',
      options: ['׳׳¡׳₪׳¨ ׳”׳¡׳˜׳•׳“׳ ׳˜׳™׳ ׳¢׳ ׳¦׳™׳•׳ ׳׳¢׳ 80', '׳¡׳›׳•׳ ׳”׳¦׳™׳•׳ ׳™׳', '׳׳׳•׳¦׳¢ ׳”׳¦׳™׳•׳ ׳™׳', '׳¨׳©׳™׳׳× ׳©׳׳•׳× ׳”׳¡׳˜׳•׳“׳ ׳˜׳™׳'],
      correct: 0,
    },
    {
      question: '׳׳™׳–׳” ׳¡׳•׳’ JOIN ׳׳—׳–׳™׳¨ ׳¨׳§ ׳©׳•׳¨׳•׳× ׳©׳™׳© ׳׳”׳ ׳”׳×׳׳׳” ׳‘׳©׳ ׳™ ׳”׳˜׳‘׳׳׳•׳×?',
      options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN'],
      correct: 2,
    },
    {
      question: '׳׳”׳™ ׳”׳׳˜׳¨׳” ׳©׳ ׳ ׳•׳¨׳׳׳™׳–׳¦׳™׳” ׳‘׳׳¡׳“׳™ ׳ ׳×׳•׳ ׳™׳?',
      options: ['׳׳”׳׳™׳¥ ׳©׳׳™׳׳×׳•׳×', '׳׳”׳₪׳—׳™׳× ׳›׳₪׳™׳׳•׳× ׳ ׳×׳•׳ ׳™׳', '׳׳”׳’׳“׳™׳ ׳׳× ׳’׳•׳“׳ ׳”׳˜׳‘׳׳׳•׳×', '׳׳׳—׳•׳§ ׳ ׳×׳•׳ ׳™׳'],
      correct: 1,
    },
  ],
  trueFalse: [
    { question: '׳ ׳™׳×׳ ׳׳”׳©׳×׳׳© ׳‘-WHERE ׳¢׳ ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳׳’׳¨׳’׳¦׳™׳”', answer: false },
    { question: 'PRIMARY KEY ׳™׳›׳•׳ ׳׳”׳›׳™׳ ׳¢׳¨׳›׳™ NULL', answer: false },
    { question: '׳׳™׳ ׳“׳§׳¡ ׳׳©׳₪׳¨ ׳׳× ׳‘׳™׳¦׳•׳¢׳™ SELECT ׳׳‘׳ ׳׳׳˜ INSERT', answer: true },
  ],
  openEnded: [
    { question: '׳”׳¡׳‘׳¨ ׳׳”׳• FOREIGN KEY ׳•׳׳” ׳”׳×׳₪׳§׳™׳“ ׳©׳׳• ׳‘׳׳¡׳“ ׳ ׳×׳•׳ ׳™׳ ׳™׳—׳¡׳™' },
    { question: '׳›׳×׳•׳‘ ׳©׳׳™׳׳×׳” SQL ׳©׳׳—׳–׳™׳¨׳” ׳׳× 5 ׳”׳¡׳˜׳•׳“׳ ׳˜׳™׳ ׳¢׳ ׳”׳¦׳™׳•׳ ׳”׳’׳‘׳•׳” ׳‘׳™׳•׳×׳¨' },
    { question: '׳׳”׳ ׳”׳™׳×׳¨׳•׳ ׳•׳× ׳•׳”׳—׳¡׳¨׳•׳ ׳•׳× ׳©׳ ׳©׳™׳׳•׳© ׳‘׳׳™׳ ׳“׳§׳¡׳™׳ ׳‘׳׳¡׳“ ׳ ׳×׳•׳ ׳™׳?' },
  ],
};

const questionTypeDescriptions: Record<string, { knowledge: string; analysis: string; visuals: string }> = {
  'calculus1': {
    knowledge: '׳”׳’׳“׳¨׳•׳× ׳׳×׳׳˜׳™׳•׳× ׳©׳ ׳’׳‘׳•׳׳•׳×, ׳¨׳¦׳™׳₪׳•׳×, ׳ ׳’׳–׳¨׳•׳× ׳•׳׳™׳ ׳˜׳’׳¨׳׳™׳. ׳‘׳•׳—׳ ׳•׳× ׳”׳‘׳ ׳× ׳׳•׳©׳’׳™ ׳™׳¡׳•׳“ ׳›׳׳• ׳›׳׳ ׳׳•׳₪׳™׳˜׳, ׳׳©׳₪׳˜ ׳”׳¢׳¨׳ ׳”׳׳׳•׳¦׳¢ ׳•׳©׳™׳˜׳•׳× ׳׳™׳ ׳˜׳’׳¨׳¦׳™׳”.',
    analysis: '׳₪׳×׳¨׳•׳ ׳×׳¨׳’׳™׳׳™ ׳—׳™׳©׳•׳‘ ׳׳•׳¨׳›׳‘׳™׳ ג€” ׳—׳™׳©׳•׳‘ ׳’׳‘׳•׳׳•׳×, ׳ ׳’׳–׳¨׳•׳× ׳©׳ ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳׳•׳¨׳›׳‘׳•׳×, ׳‘׳¢׳™׳•׳× ׳׳•׳₪׳˜׳™׳׳™׳–׳¦׳™׳” ׳•׳׳¦׳™׳׳× ׳©׳˜׳—׳™׳ ׳‘׳׳׳¦׳¢׳•׳× ׳׳™׳ ׳˜׳’׳¨׳׳™׳.',
    visuals: '׳§׳¨׳™׳׳” ׳•׳ ׳™׳×׳•׳— ׳©׳ ׳’׳¨׳₪׳™ ׳₪׳•׳ ׳§׳¦׳™׳•׳×, ׳–׳™׳”׳•׳™ ׳ ׳§׳•׳“׳•׳× ׳§׳™׳¦׳•׳ ׳•׳₪׳™׳×׳•׳ ׳׳×׳¨׳©׳™׳, ׳•׳”׳‘׳ ׳× ׳”׳×׳ ׳”׳’׳•׳× ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳₪׳™ ׳¦׳•׳¨׳× ׳”׳’׳¨׳£.',
  },
  'linear-algebra': {
    knowledge: '׳”׳’׳“׳¨׳•׳× ׳©׳ ׳׳¨׳—׳‘׳™׳ ׳•׳§׳˜׳•׳¨׳™׳™׳, ׳×׳׳•׳× ׳•׳׳™-׳×׳׳•׳× ׳׳™׳ ׳׳¨׳™׳×, ׳׳˜׳¨׳™׳¦׳•׳×, ׳˜׳¨׳ ׳¡׳₪׳•׳¨׳׳¦׳™׳•׳× ׳׳™׳ ׳׳¨׳™׳•׳× ׳•׳¢׳¨׳›׳™׳ ׳¢׳¦׳׳™׳™׳.',
    analysis: '׳—׳™׳©׳•׳‘ ׳“׳˜׳¨׳׳™׳ ׳ ׳˜׳”, ׳׳¦׳™׳׳× ׳׳˜׳¨׳™׳¦׳” ׳”׳•׳₪׳›׳™׳×, ׳₪׳×׳¨׳•׳ ׳׳¢׳¨׳›׳•׳× ׳׳©׳•׳•׳׳•׳× ׳׳™׳ ׳׳¨׳™׳•׳× ׳•׳׳¦׳™׳׳× ׳¢׳¨׳›׳™׳ ׳•׳§׳˜׳•׳¨׳™׳ ׳¢׳¦׳׳™׳™׳.',
    visuals: '׳§׳¨׳™׳׳× ׳׳˜׳¨׳™׳¦׳•׳× ׳•׳‘׳™׳¦׳•׳¢ ׳₪׳¢׳•׳׳•׳× ׳¢׳׳™׳”׳, ׳™׳™׳¦׳•׳’ ׳’׳™׳׳•׳׳˜׳¨׳™ ׳©׳ ׳•׳§׳˜׳•׳¨׳™׳ ׳•׳×׳¨׳©׳™׳׳™ ׳˜׳¨׳ ׳¡׳₪׳•׳¨׳׳¦׳™׳•׳× ׳‘׳׳™׳©׳•׳¨.',
  },
  'oop': {
    knowledge: '׳׳•׳©׳’׳™ ׳™׳¡׳•׳“ ׳‘׳×׳›׳ ׳•׳× ׳׳•׳ ׳—׳” ׳¢׳¦׳׳™׳ ג€” ׳׳—׳׳§׳•׳×, ׳׳•׳‘׳™׳™׳§׳˜׳™׳, ׳¢׳™׳˜׳•׳£, ׳”׳•׳¨׳©׳”, ׳₪׳•׳׳™׳׳•׳¨׳₪׳™׳–׳ ׳•׳׳׳©׳§׳™׳.',
    analysis: '׳ ׳™׳×׳•׳— ׳×׳¨׳—׳™׳©׳™ ׳×׳›׳ ׳•׳×, ׳‘׳—׳™׳¨׳× ׳“׳₪׳•׳¡ ׳¢׳™׳¦׳•׳‘ ׳׳×׳׳™׳ (Singleton, Factory, Observer) ׳•׳₪׳×׳¨׳•׳ ׳‘׳¢׳™׳•׳× ׳׳¨׳›׳™׳˜׳§׳˜׳•׳¨׳× ׳§׳•׳“.',
    visuals: '׳§׳¨׳™׳׳× ׳§׳•׳“ Java ׳•-Python, ׳ ׳™׳×׳•׳— class diagrams ׳•׳–׳™׳”׳•׳™ ׳™׳—׳¡׳™ ׳™׳¨׳•׳©׳” ׳•׳§׳•׳׳₪׳•׳–׳™׳¦׳™׳” ׳‘׳™׳ ׳׳—׳׳§׳•׳×.',
  },
  'html': {
    knowledge: '׳×׳’׳™׳•׳× HTML5 ׳•׳׳©׳׳¢׳•׳×׳ ׳”׳¡׳׳ ׳˜׳™׳×, ׳׳•׳©׳’׳™ ׳ ׳’׳™׳©׳•׳×, ARIA attributes ׳•׳×׳§׳ ׳™ Web ׳׳•׳“׳¨׳ ׳™׳™׳.',
    analysis: '׳ ׳™׳×׳•׳— ׳׳‘׳ ׳” ׳“׳₪׳™ ׳׳™׳ ׳˜׳¨׳ ׳˜, ׳‘׳—׳™׳¨׳× ׳×׳’׳™׳× ׳¡׳׳ ׳˜׳™׳× ׳׳×׳׳™׳׳” ׳•׳₪׳×׳¨׳•׳ ׳‘׳¢׳™׳•׳× ׳ ׳’׳™׳©׳•׳× ׳•׳•׳׳™׳“׳¦׳™׳” ׳©׳ ׳˜׳₪׳¡׳™׳.',
    visuals: '׳§׳¨׳™׳׳× ׳§׳•׳“ HTML ׳•-CSS, ׳–׳™׳”׳•׳™ ׳©׳’׳™׳׳•׳× ׳‘׳׳‘׳ ׳” ׳”׳“׳£ ׳•׳₪׳™׳¨׳•׳© ׳×׳¨׳©׳™׳׳™ ׳₪׳¨׳™׳¡׳” ׳•-DOM.',
  },
  'sql': {
    knowledge: '׳׳•׳©׳’׳™ ׳™׳¡׳•׳“ ׳©׳ ׳׳¡׳“׳™ ׳ ׳×׳•׳ ׳™׳ ׳™׳—׳¡׳™׳™׳ ג€” ׳׳₪׳×׳—׳•׳× ׳¨׳׳©׳™׳™׳ ׳•׳–׳¨׳™׳, ׳ ׳•׳¨׳׳׳™׳–׳¦׳™׳”, ׳₪׳§׳•׳“׳•׳× DDL ׳•-DML.',
    analysis: '׳ ׳™׳×׳•׳— ׳©׳׳™׳׳×׳•׳× SQL ׳׳•׳¨׳›׳‘׳•׳×, ׳₪׳×׳¨׳•׳ ׳‘׳¢׳™׳•׳× ׳ ׳•׳¨׳׳׳™׳–׳¦׳™׳” ׳•׳–׳™׳”׳•׳™ ׳¦׳•׳•׳׳¨׳™ ׳‘׳§׳‘׳•׳§ ׳‘׳‘׳™׳¦׳•׳¢׳™ ׳©׳׳™׳׳×׳•׳×.',
    visuals: '׳§׳¨׳™׳׳× ׳©׳׳™׳׳×׳•׳× SQL ׳•׳ ׳™׳—׳•׳© ׳”׳×׳•׳¦׳׳”, ׳ ׳™׳×׳•׳— ׳×׳¨׳©׳™׳׳™ ERD ׳•׳§׳¨׳™׳׳× ׳×׳•׳¦׳׳•׳× JOIN ׳‘׳™׳ ׳˜׳‘׳׳׳•׳×.',
  },
  'systems_analysis': {
    knowledge: '׳׳•׳©׳’׳™ UML, ׳¡׳•׳’׳™ ׳“׳¨׳™׳©׳•׳× ׳׳¢׳¨׳›׳× (׳₪׳•׳ ׳§׳¦׳™׳•׳ ׳׳™׳•׳× ׳•׳׳-׳₪׳•׳ ׳§׳¦׳™׳•׳ ׳׳™׳•׳×) ׳•׳׳×׳•׳“׳•׳׳•׳’׳™׳•׳× ׳₪׳™׳×׳•׳— ׳›׳׳• Agile ׳•-Waterfall.',
    analysis: '׳ ׳™׳×׳•׳— ׳×׳¨׳—׳™׳©׳™ ׳׳¢׳¨׳›׳×, ׳–׳™׳”׳•׳™ ׳“׳¨׳™׳©׳•׳× ׳׳×׳•׳ ׳×׳™׳׳•׳¨ ׳׳§׳•׳— ׳•׳‘׳—׳™׳¨׳× ׳׳¨׳›׳™׳˜׳§׳˜׳•׳¨׳” ׳•׳׳×׳•׳“׳•׳׳•׳’׳™׳” ׳׳×׳׳™׳׳”.',
    visuals: '׳§׳¨׳™׳׳× ׳“׳™׳׳’׳¨׳׳•׳× UML ג€” Use Case, Class, Sequence ׳•-Activity Diagrams ׳•׳–׳™׳”׳•׳™ ׳™׳—׳¡׳™׳ ׳‘׳™׳ ׳¨׳›׳™׳‘׳™ ׳”׳׳¢׳¨׳›׳×.',
  },
  'cyber_security': {
    knowledge: '׳׳•׳©׳’׳™ ׳”׳¦׳₪׳ ׳” ׳¡׳™׳׳˜׳¨׳™׳× ׳•׳׳¡׳™׳׳˜׳¨׳™׳×, ׳₪׳¨׳•׳˜׳•׳§׳•׳׳™ ׳׳‘׳˜׳—׳” (TLS, IPSec), Hash Functions ׳•׳¢׳§׳¨׳•׳ ׳•׳× ׳”-CIA Triad.',
    analysis: '׳ ׳™׳×׳•׳— ׳×׳¨׳—׳™׳©׳™ ׳׳‘׳˜׳—׳”, ׳–׳™׳”׳•׳™ ׳₪׳’׳™׳¢׳•׳™׳•׳× (OWASP Top 10, SQL Injection, XSS) ׳•׳‘׳—׳™׳¨׳× ׳׳ ׳’׳ ׳•׳ ׳”׳’׳ ׳” ׳׳×׳׳™׳.',
    visuals: '׳§׳¨׳™׳׳× ׳×׳¨׳©׳™׳׳™ ׳¨׳©׳× ׳•׳₪׳¨׳•׳˜׳•׳§׳•׳׳™׳, ׳ ׳™׳×׳•׳— ׳§׳•׳“ ׳”׳¦׳₪׳ ׳” ׳•׳₪׳™׳¨׳•׳© ׳×׳¨׳©׳™׳׳™ ׳×׳§׳©׳•׳¨׳× ׳׳׳•׳‘׳˜׳—׳×.',
  },
  'mis-economics': {
    knowledge: '׳׳•׳©׳’׳™ ROI, NPV, TCO, ׳ ׳™׳”׳•׳ ׳₪׳¨׳•׳™׳§׳˜׳™ IT ׳•׳›׳׳™ ׳×׳›׳ ׳•׳ ׳›׳׳• WBS ׳•׳×׳¨׳©׳™׳ Gantt.',
    analysis: '׳—׳™׳©׳•׳‘ ROI ׳•׳×׳§׳•׳₪׳× ׳”׳—׳–׳¨, ׳ ׳™׳×׳•׳— ׳¢׳׳•׳×-׳×׳•׳¢׳׳× ׳©׳ ׳”׳©׳§׳¢׳•׳× IT ׳•׳–׳™׳”׳•׳™ ׳¡׳™׳›׳•׳ ׳™׳ ׳‘׳₪׳¨׳•׳™׳§׳˜׳™׳.',
    visuals: '׳§׳¨׳™׳׳× ׳×׳¨׳©׳™׳׳™ Gantt, ׳’׳¨׳₪׳™ ׳¢׳׳•׳×-׳–׳׳, ׳׳˜׳¨׳™׳¦׳•׳× ׳¡׳™׳›׳•׳ ׳™׳ ׳•׳×׳¨׳©׳™׳׳™ ׳׳‘׳ ׳” ׳׳¨׳’׳•׳ ׳™ ׳©׳ ׳₪׳¨׳•׳™׳§׳˜׳™׳.',
  },
};

const defaultQuestionTypes = {
  knowledge: '׳”׳’׳“׳¨׳•׳× ׳•׳׳•׳©׳’׳™ ׳™׳¡׳•׳“ ׳©׳ ׳”׳§׳•׳¨׳¡. ׳‘׳•׳—׳ ׳•׳× ׳”׳‘׳ ׳× ׳¢׳§׳¨׳•׳ ׳•׳× ׳‘׳¡׳™׳¡׳™׳™׳ ׳•׳¢׳•׳‘׳“׳•׳× ׳׳¨׳›׳–׳™׳•׳×.',
  analysis: '׳ ׳™׳×׳•׳— ׳×׳¨׳—׳™׳©׳™׳, ׳₪׳×׳¨׳•׳ ׳‘׳¢׳™׳•׳× ׳•׳”׳©׳•׳•׳׳” ׳‘׳™׳ ׳׳•׳©׳’׳™׳. ׳“׳•׳¨׳©׳•׳× ׳—׳©׳™׳‘׳” ׳‘׳™׳§׳•׳¨׳×׳™׳× ׳•׳™׳™׳©׳•׳.',
  visuals: '׳§׳¨׳™׳׳” ׳•׳ ׳™׳×׳•׳— ׳©׳ ׳—׳•׳׳¨ ׳•׳™׳–׳•׳׳׳™ ג€” ׳×׳¨׳©׳™׳׳™׳, ׳’׳¨׳₪׳™׳ ׳•׳“׳•׳’׳׳׳•׳× ׳”׳¨׳׳•׳•׳ ׳˜׳™׳•׳× ׳׳§׳•׳¨׳¡.',
};

interface CourseDetailPageProps {
  courseId: string;
  onBack?: () => void;
  onOpenTutor?: (courseId: string) => void;
  onOpenPractice?: (courseId: string) => void;
}

export function CourseDetailPage({ courseId, onBack, onOpenTutor, onOpenPractice }: CourseDetailPageProps) {
  const course = coursesData[courseId] || coursesData['sql'];
  const { user, addUserCourse, removeUserCourse } = useAuth();

  const isInMyCourses = user?.selectedCourses?.includes(courseId) ?? false;
  const [toggling, setToggling] = useState(false);
  const [enrolledCount, setEnrolledCount] = useState(0);

  useEffect(() => {
    const fetchEnrolledCount = async () => {
      try {
        const countSnap = await getCountFromServer(
          query(collection(db, 'users'), where('selectedCourses', 'array-contains', courseId))
        );
        setEnrolledCount(countSnap.data().count);
      } catch (error) {
        console.error('Failed to fetch enrolled count:', error);
      }
    };

    fetchEnrolledCount();
  }, [courseId]);

  const handleToggleCourse = async () => {
    setToggling(true);
    if (isInMyCourses) {
      await removeUserCourse(courseId);
    } else {
      await addUserCourse(courseId);
    }
    setToggling(false);
  };

  const handleOpenChat = () => {
    if (onOpenTutor) {
      onOpenTutor(courseId);
    }
  };

  const qTypes = questionTypeDescriptions[courseId] || defaultQuestionTypes;

  return (
    <div className="min-h-screen bg-gray-50 mr-64 pt-24" dir="rtl">
      {/* Header */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-[1440px] mx-auto px-16 py-8">
          <Button
            variant="ghost"
            className="text-gray-600 hover:bg-blue-100 mb-4"
            onClick={onBack}
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            ׳—׳–׳¨׳” ׳׳§׳˜׳׳•׳’ ׳”׳§׳•׳¨׳¡׳™׳
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
            </div>
            <Button
              onClick={handleToggleCourse}
              disabled={toggling}
              size="lg"
              className={isInMyCourses
                ? 'bg-green-100 text-green-700 hover:bg-red-50 hover:text-red-600 border-2 border-green-300 hover:border-red-300 transition-all gap-2 px-6'
                : 'bg-gradient-to-l from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white gap-2 px-6 shadow-lg shadow-teal-200 hover:shadow-teal-300 transition-all scale-100 hover:scale-105 font-bold text-base'
              }
            >
              {isInMyCourses
                ? <><CheckCircle className="w-5 h-5" />׳‘׳§׳•׳¨׳¡׳™׳ ׳©׳׳™</>
                : <><Plus className="w-5 h-5" />׳”׳•׳¡׳£ ׳׳§׳•׳¨׳¡׳™׳ ׳©׳׳™</>
              }
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-16 py-12">
        <div className="space-y-8">
          {/* ׳”׳¡׳‘׳¨ ׳›׳׳׳™ ׳¢׳ ׳”׳§׳•׳¨׳¡ */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-right">
              ׳׳•׳“׳•׳× ׳”׳§׳•׳¨׳¡
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed text-right mb-4">
              {course.longDescription}
            </p>
            <div className="flex items-center gap-6 text-gray-600 text-right">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{enrolledCount.toLocaleString()} ׳¡׳˜׳•׳“׳ ׳˜׳™׳</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{course.syllabus.length} ׳ ׳•׳©׳׳™׳ ׳¢׳™׳§׳¨׳™׳™׳</span>
              </div>
            </div>
          </Card>

          {/* ׳¡׳•׳’׳™ ׳©׳׳׳•׳× */}
          <Card className="p-8">
            <div className="flex items-center justify-start gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">׳׳‘׳ ׳” ׳”׳©׳׳׳•׳× ׳‘׳§׳•׳¨׳¡</h2>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>

            <p className="text-gray-600 text-right mb-6 leading-relaxed">
              ׳›׳ ׳§׳•׳¨׳¡ ׳׳›׳™׳ <span className="font-bold text-gray-900">36 ׳©׳׳׳•׳× ׳×׳¨׳’׳•׳</span> ׳”׳׳—׳•׳׳§׳•׳× ׳׳©׳׳•׳©׳” ׳¡׳•׳’׳™׳, ׳”׳׳™׳•׳¢׳“׳™׳ ׳׳—׳–׳§ ׳”׳™׳‘׳˜׳™׳ ׳©׳•׳ ׳™׳ ׳©׳ ׳”׳”׳‘׳ ׳”:
            </p>

            <div className="grid grid-cols-3 gap-6">
              {/* Knowledge */}
              <div className="bg-blue-50 rounded-2xl p-6 text-right border border-blue-100">
                <div className="flex items-center justify-end gap-3 mb-3">
                  <h3 className="text-lg font-bold text-blue-900">Knowledge</h3>
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">K</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">12 ׳©׳׳׳•׳×</div>
                <p className="text-sm text-blue-700 leading-relaxed">{qTypes.knowledge}</p>
              </div>

              {/* Analysis */}
              <div className="bg-purple-50 rounded-2xl p-6 text-right border border-purple-100">
                <div className="flex items-center justify-end gap-3 mb-3">
                  <h3 className="text-lg font-bold text-purple-900">Analysis</h3>
                  <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">12 ׳©׳׳׳•׳×</div>
                <p className="text-sm text-purple-700 leading-relaxed">{qTypes.analysis}</p>
              </div>

              {/* Visuals */}
              <div className="bg-green-50 rounded-2xl p-6 text-right border border-green-100">
                <div className="flex items-center justify-end gap-3 mb-3">
                  <h3 className="text-lg font-bold text-green-900">Visuals</h3>
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">12 ׳©׳׳׳•׳×</div>
                <p className="text-sm text-green-700 leading-relaxed">{qTypes.visuals}</p>
              </div>
            </div>

          </Card>

          {/* ׳§׳˜׳’׳•׳¨׳™׳•׳× ׳×׳¨׳’׳•׳ ׳׳₪׳™ ׳ ׳•׳©׳׳™׳ */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-right">
              ׳×׳¨׳’׳•׳ ׳׳₪׳™ ׳ ׳•׳©׳׳™׳
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {courseTopics[courseId]?.map((topic) => (
                <Card key={topic.title} className="p-8 hover:shadow-lg transition-shadow flex flex-col">
                  <div className="flex items-center justify-start gap-4 mb-4">
                    <h3 className="text-xl font-bold text-gray-900 text-left flex-1">{topic.title}</h3>
                    <div className={`w-14 h-14 rounded-xl ${topic.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <topic.icon className={`w-7 h-7 ${topic.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-gray-600 text-right leading-relaxed mb-6 flex-1">
                    {topic.description}
                  </p>
                </Card>
              ))}

              {/* ׳׳‘׳—׳ ׳™׳ ׳׳“׳•׳’׳׳” */}
              <Card className="p-8 hover:shadow-lg transition-shadow col-span-2">
                <div className="text-right">
                  <div className="flex items-center justify-start gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">׳׳‘׳—׳ ׳™׳ ׳׳“׳•׳’׳׳”</h3>
                    <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center">
                      <Award className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, BookOpen, Code, Database, Globe, Shield, Monitor, Cpu, Network, FileText } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'ND' | 'HND';
  semester: string;
  topics: string[];
  icon: any;
  color: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming using languages like C, Java, and Python.',
    level: 'ND',
    semester: 'ND1 First Semester',
    topics: ['Variables and Data Types', 'Control Structures', 'Functions', 'Arrays', 'Object-Oriented Programming'],
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: '2',
    title: 'Database Management Systems',
    description: 'Understanding database design, SQL, and database administration.',
    level: 'ND',
    semester: 'ND1 Second Semester',
    topics: ['Database Design', 'SQL Queries', 'Normalization', 'Entity-Relationship Modeling', 'Database Security'],
    icon: Database,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: '3',
    title: 'Web Development',
    description: 'Building modern web applications with HTML, CSS, JavaScript, and frameworks.',
    level: 'ND',
    semester: 'ND2 First Semester',
    topics: ['HTML5 & CSS3', 'JavaScript Fundamentals', 'DOM Manipulation', 'Responsive Design', 'Web Frameworks'],
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: '4',
    title: 'Computer Networks',
    description: 'Network protocols, architecture, and network administration.',
    level: 'HND',
    semester: 'HND1 First Semester',
    topics: ['Network Protocols', 'TCP/IP', 'Network Security', 'Routing & Switching', 'Network Troubleshooting'],
    icon: Network,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: '5',
    title: 'Cybersecurity',
    description: 'Information security, threat analysis, and security implementation.',
    level: 'HND',
    semester: 'HND1 Second Semester',
    topics: ['Security Fundamentals', 'Cryptography', 'Ethical Hacking', 'Risk Assessment', 'Incident Response'],
    icon: Shield,
    color: 'from-red-500 to-orange-500',
  },
  {
    id: '6',
    title: 'Computer Architecture',
    description: 'Understanding computer hardware, processors, and system design.',
    level: 'ND',
    semester: 'ND1 First Semester',
    topics: ['CPU Architecture', 'Memory Systems', 'Input/Output Systems', 'Assembly Language', 'Performance Optimization'],
    icon: Cpu,
    color: 'from-gray-500 to-slate-500',
  },
];

const learningMaterials = {
  'Introduction to Programming': [
    'C Programming Language Fundamentals',
    'Java Object-Oriented Programming Guide',
    'Python for Beginners',
    'Data Structures and Algorithms',
    'Programming Best Practices',
  ],
  'Database Management Systems': [
    'SQL Complete Reference',
    'Database Design Principles',
    'MySQL Administration Guide',
    'Data Modeling Techniques',
    'Database Security Handbook',
  ],
  'Web Development': [
    'HTML5 & CSS3 Complete Guide',
    'JavaScript Modern Features',
    'React.js Fundamentals',
    'Node.js Backend Development',
    'Web Security Best Practices',
  ],
};

export const KnowledgeBase = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLevel, setActiveLevel] = useState<'all' | 'ND' | 'HND'>('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = activeLevel === 'all' || course.level === activeLevel;
    return matchesSearch && matchesLevel;
  });

  if (selectedCourse) {
    const materials = learningMaterials[selectedCourse.title as keyof typeof learningMaterials] || [];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedCourse(null)}
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            ← Back to Knowledge Base
          </Button>

          <Card className="p-8 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${selectedCourse.color} rounded-2xl flex items-center justify-center`}>
                  <selectedCourse.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h1>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-2">
                  {selectedCourse.level}
                </Badge>
                <p className="text-sm text-gray-600">{selectedCourse.semester}</p>
              </div>
            </div>

            <Tabs defaultValue="topics" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="topics">Course Topics</TabsTrigger>
                <TabsTrigger value="materials">Learning Materials</TabsTrigger>
                <TabsTrigger value="resources">Additional Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="topics" className="mt-6">
                <div className="grid gap-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Topics</h3>
                  {selectedCourse.topics.map((topic, index) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{topic}</h4>
                          <p className="text-sm text-gray-600">Interactive lessons and exercises available</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="materials" className="mt-6">
                <div className="grid gap-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Materials</h3>
                  {materials.map((material, index) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer hover:bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{material}</h4>
                            <p className="text-sm text-gray-600">Comprehensive study guide with examples</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <div className="grid gap-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h3>
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Video Lectures</h4>
                    <p className="text-sm text-gray-600">Access recorded lectures and tutorials</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Practice Exercises</h4>
                    <p className="text-sm text-gray-600">Hands-on coding exercises and projects</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Reference Books</h4>
                    <p className="text-sm text-gray-600">Recommended textbooks and references</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Online Communities</h4>
                    <p className="text-sm text-gray-600">Connect with fellow students and instructors</p>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Knowledge Base
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive learning materials for Computer Science ND & HND programs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search courses, topics, or materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeLevel === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveLevel('all')}
              size="sm"
            >
              All Courses
            </Button>
            <Button
              variant={activeLevel === 'ND' ? 'default' : 'outline'}
              onClick={() => setActiveLevel('ND')}
              size="sm"
            >
              ND Courses
            </Button>
            <Button
              variant={activeLevel === 'HND' ? 'default' : 'outline'}
              onClick={() => setActiveLevel('HND')}
              size="sm"
            >
              HND Courses
            </Button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            return (
              <Card
                key={course.id}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white/80 backdrop-blur-lg border-0 group"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary">
                    {course.level}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {course.description}
                </p>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-500">{course.semester}</p>
                  <p className="text-sm text-gray-500">{course.topics.length} topics covered</p>
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-center group-hover:bg-blue-50 transition-all duration-300"
                >
                  Explore Course
                  <BookOpen className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Card>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

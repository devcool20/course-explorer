import { useState } from 'react'

function Sidebar({
    courses,
    selectedCourse,
    selectedTopic,
    selectedSubtopic,
    setSelectedCourse,
    setSelectedTopic,
    setSelectedSubtopic,
    isOpen,
    getCompletionPercentage
}) {
    const [expandedCourses, setExpandedCourses] = useState({})
    const [expandedTopics, setExpandedTopics] = useState({})

    const toggleCourse = (courseId) => {
        setExpandedCourses(prev => ({
            ...prev,
            [courseId]: !prev[courseId]
        }))
    }

    const toggleTopic = (courseId, topicIndex) => {
        setExpandedTopics(prev => ({
            ...prev,
            [`${courseId}-${topicIndex}`]: !prev[`${courseId}-${topicIndex}`]
        }))
    }

    const handleCourseClick = (course) => {
        toggleCourse(course.id)
        setSelectedCourse(course)
        setSelectedTopic(null)
        setSelectedSubtopic(null)
    }

    const handleTopicClick = (course, topic, topicIndex) => {
        toggleTopic(course.id, topicIndex)
        setSelectedCourse(course)
        setSelectedTopic({ ...topic, index: topicIndex })
        setSelectedSubtopic(null)
    }

    const handleSubtopicClick = (course, topic, topicIndex, subtopic, subtopicIndex) => {
        setSelectedCourse(course)
        setSelectedTopic({ ...topic, index: topicIndex })
        setSelectedSubtopic({ ...subtopic, index: subtopicIndex })
    }

    const getDifficultyColor = (difficulty) => {
        const colors = {
            'BEGINNER': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'INTERMEDIATE': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'ADVANCED': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }
        return colors[difficulty] || 'bg-gray-100 text-gray-800'
    }

    if (!isOpen) {
        return null
    }

    return (
        <aside
            className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
            role="navigation"
            aria-label="Course navigation"
        >
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Courses
                </h2>

                {courses.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p>No courses found</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {courses.map((course) => (
                            <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                                <button
                                    onClick={() => handleCourseClick(course)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedCourse?.id === course.id
                                            ? 'bg-blue-50 dark:bg-blue-900/20'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    aria-expanded={expandedCourses[course.id]}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 break-words">
                                                {course.title}
                                            </h3>
                                            {course.difficulty && (
                                                <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getDifficultyColor(course.difficulty)}`}>
                                                    {course.difficulty}
                                                </span>
                                            )}
                                            {getCompletionPercentage && (
                                                <div className="mt-2">
                                                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                        <span>Progress</span>
                                                        <span>{getCompletionPercentage(course.id)}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                                        <div
                                                            className="bg-blue-600 h-1.5 rounded-full transition-all"
                                                            style={{ width: `${getCompletionPercentage(course.id)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <svg
                                            className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${expandedCourses[course.id] ? 'transform rotate-90' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </button>

                                {expandedCourses[course.id] && course.topics && (
                                    <div className="px-3 pb-2 space-y-1">
                                        {course.topics.map((topic, topicIndex) => (
                                            <div key={topicIndex}>
                                                <button
                                                    onClick={() => handleTopicClick(course, topic, topicIndex)}
                                                    className={`w-full text-left p-2 rounded text-sm transition-colors ${selectedTopic?.index === topicIndex && selectedCourse?.id === course.id
                                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                    aria-expanded={expandedTopics[`${course.id}-${topicIndex}`]}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex-1">{topic.title}</span>
                                                        <div className="flex items-center gap-2">
                                                            {getCompletionPercentage && (
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {getCompletionPercentage(course.id, topicIndex)}%
                                                                </span>
                                                            )}
                                                            <svg
                                                                className={`w-4 h-4 transition-transform flex-shrink-0 ${expandedTopics[`${course.id}-${topicIndex}`] ? 'transform rotate-90' : ''
                                                                    }`}
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 5l7 7-7 7"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </button>

                                                {expandedTopics[`${course.id}-${topicIndex}`] && topic.subtopics && (
                                                    <div className="ml-4 mt-1 space-y-1">
                                                        {topic.subtopics.map((subtopic, subtopicIndex) => (
                                                            <button
                                                                key={subtopicIndex}
                                                                onClick={() => handleSubtopicClick(course, topic, topicIndex, subtopic, subtopicIndex)}
                                                                className={`w-full text-left p-2 rounded text-sm transition-colors ${selectedSubtopic?.index === subtopicIndex &&
                                                                        selectedTopic?.index === topicIndex &&
                                                                        selectedCourse?.id === course.id
                                                                        ? 'bg-blue-200 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 font-medium'
                                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                                    }`}
                                                            >
                                                                {subtopic.title}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar
